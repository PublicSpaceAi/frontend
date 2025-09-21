import { EmotionGraph } from "@/components/Charts/payments-overview";
import { UsedDevices } from "@/components/Charts/used-devices";
// import { WeeksProfit } from "@/components/Charts/weeks-profit"; // Remove this line
import VideoEmbed from "@/components/VideoEmbed"; // Ensure you import VideoEmbed correctly
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { ChatsCard } from "./_components/chats-card";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { RegionLabels } from "./_components/region-labels";
import { MessageCircle } from "lucide-react";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

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

        {/* Replace WeeksProfit with VideoEmbed */}
        <VideoEmbed className="col-span-12 xl:col-span-5" />

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
        href="https://psi-chat-mauve.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 text-white p-4 shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
}
