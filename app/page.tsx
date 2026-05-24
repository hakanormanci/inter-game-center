"use client";
import { useState } from "react";
import matches from "../data/matches.json";
import teams from "../data/teams.json";
import Countdown from "../components/Countdown";
import { match } from "assert";

export default function Home() {
  const now = new Date();

  const nextMatch = matches.find(
    (m) => new Date(m.date) > now
  );

  const lastMatch = matches
    .filter((m) => new Date(m.date) <= now)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )[0];

  const initialIndex = matches.findIndex(
    (m) => new Date(m.date) > now
  );

  const [currentIndex, setCurrentIndex] = useState(
    initialIndex !== -1 ? initialIndex : matches.length-1
  );

  const match = matches[currentIndex];

  const goNext = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex-1);
    }
  };

  const goPrev = () => {
    if (currentIndex < matches.length-1) {
      setCurrentIndex(currentIndex+1);
    }
  };

  if (!match) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>No matches available</p>
      </main>
    );
  }

  const opponent = teams.find(
    (team) => team.id === match.opponentId
  );

  const isPast = new Date(match.date) <= now;

  const hasScore =
    match.game_stats.home_score !== "" &&
    match.game_stats.away_score !== "";

  const date = new Date(match.date).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50 text-black relative">
      <div className="relative bg-blue-900 text-white p-10 rounded-2xl shadow-lg max-w-4xl w-full flex flex-col items-center gap-8">

        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-xl opacity-70 hover:opacity-100"
        >
          ←
        </button>

        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xl opacity-70 hover:opacity-100"
        >
          →
        </button>
        {/* Label */}
        <p className="text-sm text-gray-400">
          {match.round}
        </p>

        {/* Competition */}
        <p className="text-sm text-gray-300">
          {match.competition} • {match.home ? "Home" : "Away"}
        </p>

        {/* TEAMS */}
        <div className="flex flex-col items-center gap-6 w-full">

          <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full px-10 gap-8">

            {/* HOME */}
            <div className="flex items-center gap-4 justify-start">
              {match.home ? (
                <>
                  <img src="/logos/inter.png" className="w-20 h-20 object-contain" />
                  <span className="text-xl font-semibold leading-tight line-clamp-2 max-w-[180px] text-left">
                    FC Internationale Berlin
                  </span>
                </>
              ) : (
                <>
                  <img src={opponent?.logo} className="w-20 h-20 object-contain" />
                  <span className="text-xl font-semibold leading-tight line-clamp-2 max-w-[180px] text-left">
                    {opponent?.name}
                  </span>
                </>
              )}
            </div>

            {/* VS */}
            <div className="text-center justify-self-center">
              {hasScore ? (
                <div className="text-2xl font-bold">
                  {
                  `${match.game_stats.home_score} - ${match.game_stats.away_score}`
                  }
                </div>
              ) : (
                <div className="text-xl text-gray-500">vs</div>
              )}
            </div>

            {/* AWAY */}
            <div className="flex items-center gap-4 justify-end">
              {match.home ? (
                <>
                  <span className="text-xl font-semibold leading-tight line-clamp-2 max-w-[180px] text-left">
                    {opponent?.name}
                  </span>
                  <img src={opponent?.logo} className="w-20 h-20 object-contain" />
                </>
              ) : (
                <>
                  <span className="text-xl font-semibold leading-tight line-clamp-2 max-w-[180px] text-left">
                    FC Internationale Berlin
                  </span>
                  <img src="/logos/inter.png" className="w-20 h-20 object-contain" />
                </>
              )}
            </div>

          </div>
        </div>

        {/* DATE + COUNTDOWN */}
        <div className="flex flex-col items-center gap-1 text-sm text-gray-300">
          <p>{date}</p>
          <Countdown date={match.date} />
        </div>

      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-center text-xs text-gray-400 space-y-1 w-full">
        <p>NO RACISM</p>
        <p>🌱 Sustainable club</p>
      </div>
    </main>
  );
}