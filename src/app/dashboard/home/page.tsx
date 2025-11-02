'use client';

import { EmotionGraph } from "@/components/Charts/payments-overview";
import { UsedDevices } from "@/components/Charts/used-devices";
// import { WeeksProfit } from "@/components/Charts/weeks-profit"; // Remove this line
import VideoEmbed from "@/components/VideoEmbed"; // Ensure you import VideoEmbed correctly
import TodaysTimetable from "@/components/TimeTable/TodaysTimetable";
import TodoListWidget from "@/components/TimeTable/TodoListWidget";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { ChatsCard } from "../(home)/_components/chats-card";
import { OverviewCardsGroup } from "../(home)/_components/overview-cards";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import { RegionLabels } from "../(home)/_components/region-labels";
import { MessageCircle } from "lucide-react";

export default function Home() {
  const extractTimeFrame = (key: string) => key;

  return (
    <>
      {/* <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense> */}

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <EmotionGraph
          // className="col-span-12 xl:col-span-7"
          key={extractTimeFrame("payments_overview")}
          // timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        />

        {/* Replace WeeksProfit with VideoEmbed, TodaysTimetable and TodoListWidget */}
        <VideoEmbed className="col-span-12 xl:col-span-5" />

        {/* Today's Timetable */}
        <TodaysTimetable />

        {/* Todo List Widget */}
        <TodoListWidget />

        {/* <UsedDevices
          className="col-span-12 xl:col-span-5"
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
        /> */}

        {/* <RegionLabels /> */}

        {/* <div className="col-span-12 grid xl:col-span-8">
          <Suspense fallback={<TopChannelsSkeleton />}>
            <TopChannels />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <ChatsCard />
        </Suspense> */}
      </div>
      {/* Chatbot Button */}
      <a
        href="https://chatbot-zeta-dun.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 text-white p-4 shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
}
