import { useAppSelector } from "@/store/hooks"

export const useCurrentQuestion = () => {
    const { currentStep, rawQuestions } = useAppSelector(state => state.quizReducer)

    if (rawQuestions?.length === 0) {
        return { currentQuestion: undefined }
    }


    const parsedQuestionData = rawQuestions.filter(rq => {

        return rq.userId === currentStep + 1
    }).slice(0, 4)



    return {
        currentQuestion: {
            id: parsedQuestionData[0].id,
            question: parsedQuestionData[0].title,
            answers: parsedQuestionData.map(q => q.body)
        }
    }
}