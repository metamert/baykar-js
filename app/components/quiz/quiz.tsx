"use client";

// React & Next
import { useCallback, useEffect, useState } from "react";

// Store
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { replyQuestion } from "@/store/slices/quiz.slice";

// Components
import { Card, CardDescription } from "../ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizStep } from "./quiz-step";
import { CounterWithMemo } from "../ui/timer";
import { QuizResult } from "./quiz-result";

// Utils && Hooks
import { useGetQuizDataQuery } from "@/services/quiz.services";
import { convertId } from "@/utils/quiz.utils";

export function Quiz() {
  // Hooks

  /**
   *
   */
  const { rawQuestions, currentStep } = useAppSelector(
    (state) => state.quizReducer
  );
  useGetQuizDataQuery();
  const dispatch = useAppDispatch();

  const [canQuestionReply, setCanQuestionReply] = useState(false);
  const [isReloadingTimer, setIsReloadingTimer] = useState(false);

  // Effects

  /**
   *
   */
  useEffect(() => {
    setCanQuestionReply(false);
    setIsReloadingTimer(true);
  }, [currentStep]);

  useEffect(() => {
    if (isReloadingTimer) {
      setIsReloadingTimer(false);
    }
  }, [isReloadingTimer]);

  // Handlers

  /**
   *
   */
  const handleTimeCompleted = useCallback(() => {
    dispatch(
      replyQuestion({ questionId: convertId(currentStep + 1).toString() })
    );
  }, [currentStep, dispatch]);

  // Values
  const totalQuestions = rawQuestions?.length / 10 ?? 10;
  const progressValue = (currentStep / totalQuestions) * 100;

  const isLastStep = currentStep === 9;
  const isQuizCompleted = currentStep > 9;

  if (isQuizCompleted) {
    return <QuizResult />;
  }

  return (
    <Card className="p-2">
      {!isReloadingTimer && (
        <CounterWithMemo
          onTimeCompleted={handleTimeCompleted}
          setCanQuestionReply={setCanQuestionReply}
        />
      )}
      <CardDescription>Question {currentStep + 1}</CardDescription>

      <div className="w-full p-4">
        <Progress value={progressValue} />
      </div>
      <QuizStep isLastStep={isLastStep} canQuestionReply={canQuestionReply} />
    </Card>
  );
}
