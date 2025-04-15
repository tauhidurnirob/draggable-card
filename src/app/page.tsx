"use client";

import dynamic from "next/dynamic";

const LeagueList = dynamic(() => import("@/component/LeagueList"), { ssr: false });

export default function Home() {
  return (
    <main className="w-[100%] h-[100%] bg-[#171717] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-1 flex-1 items-center ">
            <figure className="w-[20px] h-[20px]">
              <img src="/icons/league-icon.png" alt="League" />
            </figure>
            <h1 className="text-2xl font-semibold line ">Leagues</h1>
          </div>

          <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md text-sm">
            + Connect League
          </button>
        </div>
        <LeagueList />
      </div>
    </main>
  );
}
