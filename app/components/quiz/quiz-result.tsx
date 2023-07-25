import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/store/hooks";
import { calculateAnswerStatistics } from "@/utils/quiz.utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { SkeletonLoader } from "../ui/skeleton-loader";
import { QuizResultChart } from "./quiz-result-chart";

export function QuizResult() {
  const questionAndAnswers = useAppSelector(
    (state) => state.quizReducer.questionAndAnswers
  );

  // We can request to get answers in here.
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  const handleResetQuiz = useCallback(() => {
    // Refreshing the page is easiest way to reset states.
    window.location.href = "";
  }, []);

  /**
   *
   */
  const getCorrectAnswersAsync = useCallback(() => {
    // Imitate async action with 1 second delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCorrectAnswers(new Array(10).fill("A"));
        resolve();
      }, 1000);
    });
  }, []);

  /**
   *
   */
  useEffect(() => {
    getCorrectAnswersAsync();
  }, [getCorrectAnswersAsync]);

  // Heavy Calculation.
  const answerStatistic = useMemo(
    () => calculateAnswerStatistics(questionAndAnswers, correctAnswers),
    [correctAnswers, questionAndAnswers]
  );

  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle>Quiz Results</CardTitle>
      </CardHeader>
      {correctAnswers.length === 0 ? (
        <SkeletonLoader count={10} />
      ) : (
        <>
          <QuizResultChart answerStatistic={answerStatistic} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">
                  Question
                </TableHead>
                <TableHead className="text-center">Answer</TableHead>
                <TableHead className="text-center">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questionAndAnswers.map((qa, ix) => (
                <TableRow key={ix}>
                  <TableCell className="font-medium ">
                    {qa.questionId}
                  </TableCell>
                  <TableCell className="text-center ">{qa?.answer}</TableCell>
                  <TableCell>
                    {qa?.answer
                      ? qa.answer === correctAnswers[Number(qa.questionId)]
                        ? "correct"
                        : "false"
                      : "empty"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      <CardFooter>
        <Button type="button" onClick={handleResetQuiz} className="w-full mt-4">
          Reset Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}
