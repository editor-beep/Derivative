"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PuzzleScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
function PuzzleScreen({ puzzle }) {
    const [currentStepIndex, setCurrentStepIndex] = (0, react_1.useState)(0);
    const [evaluations, setEvaluations] = (0, react_1.useState)([]);
    const [streak, setStreak] = (0, react_1.useState)(0);
    const [feedbackState, setFeedbackState] = (0, react_1.useState)(null);
    const [correctAnswerHint, setCorrectAnswerHint] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        setCurrentStepIndex(0);
        setEvaluations([]);
        setStreak(0);
        setFeedbackState(null);
        setCorrectAnswerHint(null);
    }, [puzzle]);
    const currentStep = (0, react_1.useMemo)(() => puzzle.steps[currentStepIndex], [puzzle.steps, currentStepIndex]);
    const advanceStep = () => {
        setCurrentStepIndex((prev) => prev + 1);
    };
    const handleOptionSelect = (selected) => {
        if (!currentStep || currentStep.type === "INFO" || feedbackState)
            return;
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
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.doneText, children: "Step sequence complete." }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: styles.metaText, children: ["Answered: ", evaluations.length] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: [styles.streakText, feedbackState === "correct" && styles.streakTextHot], children: ["\uD83D\uDD25 ", streak] }), currentStep.type === "CLASSIFY" && ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.stepContent, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.word, children: currentStep.word }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.options, children: currentStep.options.map((option) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: [
                                styles.optionButton,
                                feedbackState === "correct" && styles.optionButtonCorrect,
                                feedbackState === "incorrect" && styles.optionButtonIncorrect,
                            ], disabled: feedbackState !== null, onPress: () => handleOptionSelect(option), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.optionText, children: option }) }, option))) }), correctAnswerHint && (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: styles.correctHint, children: ["Correct answer: ", correctAnswerHint] })] })), currentStep.type === "GUESS_SYSTEM" && ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.stepContent, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.prompt, children: "What system are you detecting?" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.options, children: currentStep.options.map((option) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: [
                                styles.optionButton,
                                feedbackState === "correct" && styles.optionButtonCorrect,
                                feedbackState === "incorrect" && styles.optionButtonIncorrect,
                            ], disabled: feedbackState !== null, onPress: () => handleOptionSelect(option), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.optionText, children: option }) }, option))) }), correctAnswerHint && (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: styles.correctHint, children: ["Correct answer: ", correctAnswerHint] })] })), currentStep.type === "INFO" && ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.stepContent, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.infoText, children: currentStep.text }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: styles.continueButton, onPress: advanceStep, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.continueText, children: "Continue" }) })] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: styles.metaText, children: ["Step ", currentStepIndex + 1, " / ", puzzle.steps.length] })] }));
}
const styles = react_native_1.StyleSheet.create({
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
        opacity: 0.7,
    },
});
