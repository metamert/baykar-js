import { configureStore } from "@reduxjs/toolkit";
import quizReducer from '@/store/slices/quiz.slice'
import { quizApi } from "@/services/quiz.services";

export const store = configureStore({
    reducer: {
        quizReducer,
        [quizApi.reducerPath]: quizApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(quizApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;