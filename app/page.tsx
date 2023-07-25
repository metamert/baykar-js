"use client";

import { Quiz } from "./components/quiz/quiz";
import { QuizStep } from "./components/quiz/quiz-step";
import { cn } from "./lib/utils";

import { useGetQuizDataQuery } from "./services/quiz.services";

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

export default function Home() {
  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <Quiz />
        </div>
      </div>
    </main>
  );
}
