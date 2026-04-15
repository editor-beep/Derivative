import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { PlayablePuzzle, Step } from "./playablePuzzleBuilder";

type PuzzleScreenProps = {
  puzzle: PlayablePuzzle;
};

export default function PuzzleScreen({ puzzle }: PuzzleScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);
  const [feedbackState, setFeedbackState] = useState<"correct" | "incorrect" | null>(null);
  const [correctAnswerHint, setCorrectAnswerHint] = useState<string | null>(null);

  useEffect(() => {
    setCurrentStepIndex(0);
    setEvaluations([]);
    setStreak(0);
    setFeedbackState(null);
    setCorrectAnswerHint(null);
  }, [puzzle]);

  const currentStep = useMemo<Step | undefined>(() => puzzle.steps[currentStepIndex], [puzzle.steps, currentStepIndex]);

  const advanceStep = () => {
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleOptionSelect = (selected: string) => {
    if (!currentStep || currentStep.type === "INFO" || feedbackState) return;

    const isCorrect = selected === currentStep.correct;
    setEvaluations((prev) => [...prev, isCorrect]);
    setStreak((prev) => (isCorrect ? prev + 1 : 0));
    setFeedbackState(isCorrect ? "correct" : "incorrect");
    setCorrectAnswerHint(isCorrect ? null : currentStep.correct);

    setTimeout(() => {
      setFeedbackState(null);
      setCorrectAnswerHint(null);
      advanceStep();
    }, 420);
  };

  if (!currentStep) {
    return (
      <View style={styles.container}>
        <Text style={styles.doneText}>Step sequence complete.</Text>
        <Text style={styles.metaText}>Answered: {evaluations.length}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.streakText, feedbackState === "correct" && styles.streakTextHot]}>🔥 {streak}</Text>

      {currentStep.type === "CLASSIFY" && (
        <View style={styles.stepContent}>
          <Text style={styles.word}>{currentStep.word}</Text>
          <View style={styles.options}>
            {currentStep.options.map((option) => (
              <Pressable
                key={option}
                style={[
                  styles.optionButton,
                  feedbackState === "correct" && styles.optionButtonCorrect,
                  feedbackState === "incorrect" && styles.optionButtonIncorrect,
                ]}
                disabled={feedbackState !== null}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
          {correctAnswerHint && <Text style={styles.correctHint}>Correct answer: {correctAnswerHint}</Text>}
        </View>
      )}

      {currentStep.type === "GUESS_SYSTEM" && (
        <View style={styles.stepContent}>
          <Text style={styles.prompt}>What system are you detecting?</Text>
          <View style={styles.options}>
            {currentStep.options.map((option) => (
              <Pressable
                key={option}
                style={[
                  styles.optionButton,
                  feedbackState === "correct" && styles.optionButtonCorrect,
                  feedbackState === "incorrect" && styles.optionButtonIncorrect,
                ]}
                disabled={feedbackState !== null}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
          {correctAnswerHint && <Text style={styles.correctHint}>Correct answer: {correctAnswerHint}</Text>}
        </View>
      )}

      {currentStep.type === "INFO" && (
        <View style={styles.stepContent}>
          <Text style={styles.infoText}>{currentStep.text}</Text>
          <Pressable style={styles.continueButton} onPress={advanceStep}>
            <Text style={styles.continueText}>Continue</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.metaText}>
        Step {currentStepIndex + 1} / {puzzle.steps.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 16,
  },
  stepContent: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  word: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
  },
  prompt: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  options: {
    width: "100%",
    gap: 10,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999",
  },
  optionButtonCorrect: {
    backgroundColor: "#D1FAE5",
    borderColor: "#16A34A",
  },
  optionButtonIncorrect: {
    backgroundColor: "#FEE2E2",
    borderColor: "#DC2626",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  correctHint: {
    fontSize: 14,
    color: "#B91C1C",
    fontWeight: "600",
  },
  infoText: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#666",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "600",
  },
  doneText: {
    fontSize: 24,
    fontWeight: "700",
  },
  streakText: {
    fontSize: 20,
    fontWeight: "700",
  },
  streakTextHot: {
    color: "#EA580C",
  },
  metaText: {
    fontSize: 14,
    opacity: 0.9,
  },
});
