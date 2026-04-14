import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { PlayablePuzzle, Step } from "./playablePuzzleBuilder";

type PuzzleScreenProps = {
  puzzle: PlayablePuzzle;
};

export default function PuzzleScreen({ puzzle }: PuzzleScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<boolean[]>([]);

  useEffect(() => {
    setCurrentStepIndex(0);
    setEvaluations([]);
  }, [puzzle]);

  const currentStep = useMemo<Step | undefined>(() => puzzle.steps[currentStepIndex], [puzzle.steps, currentStepIndex]);

  const advanceStep = () => {
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleOptionSelect = (selected: string) => {
    if (!currentStep || currentStep.type === "INFO") return;

    const isCorrect = selected === currentStep.correct;
    setEvaluations((prev) => [...prev, isCorrect]);
    advanceStep();
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
      {currentStep.type === "CLASSIFY" && (
        <View style={styles.stepContent}>
          <Text style={styles.word}>{currentStep.word}</Text>
          <View style={styles.options}>
            {currentStep.options.map((option) => (
              <Pressable key={option} style={styles.optionButton} onPress={() => handleOptionSelect(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {currentStep.type === "GUESS_SYSTEM" && (
        <View style={styles.stepContent}>
          <Text style={styles.prompt}>What system are you detecting?</Text>
          <View style={styles.options}>
            {currentStep.options.map((option) => (
              <Pressable key={option} style={styles.optionButton} onPress={() => handleOptionSelect(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
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
  optionText: {
    fontSize: 16,
    textAlign: "center",
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
  metaText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
