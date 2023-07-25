"use client";

// React && Next
import { SyntheticEvent } from "react";
import { useCallback, useState } from "react";

// Store
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { replyQuestion } from "@/store/slices/quiz.slice";

// Hooks && Utils && Types
import { useCurrentQuestion } from "@/hooks/quiz.hooks";
import { convertId, getQuizOptionByIndex } from "@/utils/quiz.utils";
import { QuizOption } from "@/types/quiz.types";

// Component

import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { SkeletonLoader } from "../ui/skeleton-loader";
import { Toast } from "../ui/toast";

export function QuizStep({
  canQuestionReply,
  isLastStep,
}: {
  canQuestionReply: boolean;
  isLastStep: boolean;
}) {
  // Hooks

  const { currentQuestion } = useCurrentQuestion();
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [isToastOpen, setIsToastOpen] = useState(false);

  const dispatch = useAppDispatch();

  // Handlers
  /**
   *
   * @param value
   */
  const handleChange = (value: string) => {
    setSelectedAnswer(value);
  };

  /**
   *
   *
   */
  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      if (!canQuestionReply) {
        setIsToastOpen(true);
        return;
      }

      if (!currentQuestion || !currentQuestion?.id) {
        return;
      }

      dispatch(
        replyQuestion({
          answer: selectedAnswer as QuizOption,
          questionId: convertId(currentQuestion.id).toString(),
        })
      );
    },
    [canQuestionReply, currentQuestion, dispatch, selectedAnswer]
  );

  return (
    <>
      <Toast
        title="You cant answer right now, please wait the timer."
        isOpen={isToastOpen}
        setIsOpen={setIsToastOpen}
      />
      {currentQuestion ? (
        <>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>{currentQuestion.question} ?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-wrap">
              <RadioGroup
                id={"answer"}
                className="flex flex-1 flex-wrap  box-border"
                onValueChange={handleChange}
              >
                {currentQuestion.answers.map((a, ix) => {
                  const answerKey = getQuizOptionByIndex(ix);

                  return (
                    <div
                      defaultChecked={false}
                      key={answerKey}
                      className="flex md:basis-1/2 flex-co p-2"
                    >
                      <Label
                        htmlFor={answerKey}
                        className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer "
                      >
                        <RadioGroupItem value={answerKey} id={answerKey} />
                        {answerKey}
                        {")"} {a}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                // onClick={handleContinueClicked}
                className="w-full"
              >
                {isLastStep ? "Complete the quiz" : "Next Question"}
              </Button>
            </CardFooter>
          </form>
        </>
      ) : (
        <SkeletonLoader count={10} />
      )}
    </>
  );
}
