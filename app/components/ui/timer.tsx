import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Countdown from "react-countdown";
import { useStopwatch } from "react-timer-hook";

function Counter({
  setCanQuestionReply,
  onTimeCompleted,
}: {
  setCanQuestionReply: Dispatch<SetStateAction<boolean>>;
  onTimeCompleted: () => void;
}) {
  const [isQuestionCountDownStarted, setIsQuestionCountDownStarted] =
    useState(false);

  useEffect(() => {
    if (isQuestionCountDownStarted) {
      setCanQuestionReply(true);
      return;
    }
  }, [isQuestionCountDownStarted, setCanQuestionReply]);

  const handleOnComplete = useCallback(() => {
    if (isQuestionCountDownStarted) {
      onTimeCompleted();
      return;
    }
    setIsQuestionCountDownStarted(true);
  }, [isQuestionCountDownStarted, onTimeCompleted]);

  const expiryMillisecond = isQuestionCountDownStarted ? 30000 : 10000;
  const expiryTimestamp = Date.now() + expiryMillisecond;

  return (
    <Countdown
      key={expiryTimestamp.toString()}
      date={expiryTimestamp}
      onComplete={handleOnComplete}
      intervalDelay={100}
      renderer={(props) => (
        <div>
          {!isQuestionCountDownStarted
            ? `After ${props.seconds} seconds you will be able to answer the question.`
            : ` Time left to answer the question: ${props.seconds}`}
        </div>
      )}
    />
  );
}

export const CounterWithMemo = React.memo(Counter);
