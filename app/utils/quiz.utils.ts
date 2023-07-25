import { QuizOption, QuizQuestionAndAnswer } from "@/types/quiz.types";

export const getQuizOptionByIndex = (index: number) => {
    const options = Object.values(QuizOption);
    return options[index] || null;
}


/**
 * Json object is not proper for, quiz questions since every question has 10 element in the Json object. So i need to use this logic to get proper ids.
 * @param oldId 
 * @returns 
 */
export const convertId = (oldId: number) => {
    if (oldId === 1) return 1; // Exception

    return Math.floor(oldId / 10 + 1); // Float
};




export function calculateAnswerStatistics(
    questionAndAnswers: QuizQuestionAndAnswer[],
    correctAnswers: string[]
): {
    correctCount: number,
    falseCount: number,
    emptyCount: number,
} {
    let correctCount = 0;
    let falseCount = 0;
    let emptyCount = 0;

    questionAndAnswers.forEach((qa) => {
        if (!qa.answer) {
            emptyCount++;
        } else if (qa.answer === correctAnswers[Number(qa.questionId)]) {
            correctCount++;
        } else {
            falseCount++;
        }
    });

    return {
        correctCount,
        falseCount,
        emptyCount,
    };
}