import { quizApi } from "@/services/quiz.services";
import { QuizOption, QuizQuestionAndAnswer, RawQuestions } from "@/types/quiz.types";
import { createSlice as generateSlice, current, PayloadAction } from "@reduxjs/toolkit";





type ReplyQuestionPayload = {
    questionId: string,
    answer?: QuizOption,
}

type QuizState = {
    rawQuestions: RawQuestions
    questionAndAnswers: QuizQuestionAndAnswer[]
    currentStep: number
};

const initialState = {
    rawQuestions: [],
    questionAndAnswers: [],
    currentStep: 0
} as QuizState;




export const quiz = generateSlice({
    name: "quiz",
    initialState,
    reducers: {
        reset: () => initialState,

        replyQuestion: (state, action: PayloadAction<ReplyQuestionPayload>) => {
            const payload = action.payload
            state.currentStep += 1
            const repliedQuestion = state.questionAndAnswers.find(qa => qa.questionId === payload.questionId)

            if (!repliedQuestion) {
                state.questionAndAnswers.push(payload)
                return
            }
            repliedQuestion.answer = payload.answer
        },

        nextQuestion: (state) => {
            state.currentStep += 1
        },

    },
    extraReducers: (builder) => {
        builder.addMatcher(quizApi.endpoints.getQuizData.matchFulfilled, (state, { payload }) => {
            state.rawQuestions = payload
        });
    }
});

export const {
    replyQuestion,
    reset,
    nextQuestion
} = quiz.actions;
export default quiz.reducer;