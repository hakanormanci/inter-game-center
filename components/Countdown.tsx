"use client";

import { useEffect, useState } from "react";

export default function Countdown({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const target = new Date(date);
      const now = new Date();

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Kick-off");
        return;
      }

      const totalMinutes = Math.floor(diff / (1000 * 60));

      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    update(); // 🔥 sayfa açılır açılmaz çalışır

    const interval = setInterval(update, 60000); // her dakika günceller

    return () => clearInterval(interval);
  }, [date]);

  return (
    <p>
        {timeLeft === "Kick-off"
            ? "Kicked-off"
            : `Kick-off in ${timeLeft}`}
    </p>
  );
}