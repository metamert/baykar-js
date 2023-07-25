"use client";

import { useCurrentQuestion } from "@/hooks/quiz.hooks";
import { useAppSelector } from "@/store/hooks";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoader({ count }: { count: number }) {
  const skeletons = new Array(count).fill(0);

  return (
    <div className="p-2">
      {skeletons.map((s, ix) => (
        <Skeleton key={ix} className="w-full h-[20px] rounded-full my-2" />
      ))}
    </div>
  );
}
