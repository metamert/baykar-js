import { QuizQueryResponse } from '@/types/quiz.types'
import { createApi as generateApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const QUIZ_API_END_POINT = 'https://jsonplaceholder.typicode.com/posts'


export const quizApi = generateApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({ baseUrl: QUIZ_API_END_POINT }),
    endpoints: (builder) => ({
        getQuizData: builder.query<QuizQueryResponse, void>({
            query: () => '',
        }),
    }),
})

export const { useGetQuizDataQuery } = quizApi