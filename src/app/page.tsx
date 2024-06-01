"use client";
import { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import './styles.css';

const Stopwatch = ({ hourlyRate }: { hourlyRate: number }) => {
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({ autoStart: true });
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const currentCash = hourlyRate ? (hourlyRate / 3600) * totalSeconds : 0;

  return (
    <div>
      <div>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="current-cash">{currentCash.toFixed(2)}円</div>
      {isRunning ? (
        <button onClick={pause}>pause</button>
      ) : (
        <button onClick={start}>resume</button>
      )}
    </div>
  );
};

const CashStreaming = ({ hourlyRate }: { hourlyRate: number }) => {
  return (
    <div>
      <Stopwatch hourlyRate={hourlyRate} />
    </div>
  );
};

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [hourlyRate, setHourlyRate] = useState<number>(0);

  const handleRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHourlyRate(parseFloat(event.target.value));
  };

  const handleStart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <main>
      <div>
        {isRunning ? (
          <div className="timer-display" style={{ display: 'flex', alignItems: 'center' }}>
            <img className="image-container" src="/tyokin.png" />
            <CashStreaming hourlyRate={hourlyRate} />
          </div>
        ) : (
          <form onSubmit={handleStart}>
          <b>時給を入力してね</b>
            <input type="number" placeholder="1000" onChange={handleRate} required />
            <input type="submit" value="スタート!" />
          </form>
        )}
      </div>
    </main>
  );
}
