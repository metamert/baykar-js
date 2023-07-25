import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function QuizResultChart({
  answerStatistic,
}: {
  answerStatistic: {
    correctCount: number;
    falseCount: number;
    emptyCount: number;
  };
}) {
  const { correctCount, falseCount, emptyCount } = answerStatistic;
  const data = useMemo(() => {
    return {
      labels: ["correct answer", "false answer", "empty answer"],
      datasets: [
        {
          label: "# of Votes",
          data: [correctCount, falseCount, emptyCount],
          backgroundColor: ["green", "red", "white"],

          borderWidth: 0,
        },
      ],
    };
  }, [correctCount, emptyCount, falseCount]);

  return (
    <div className="w-full h-[300px] p-2 m-4 flex justify-center items-center">
      <Pie data={data} />
    </div>
  );
}
