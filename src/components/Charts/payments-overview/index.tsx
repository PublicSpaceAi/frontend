'use client';

import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getEmotionData } from '@/services/emotion.service'; // Import the fake data function

// Emotion Attributes from e_score Table changed
// Emotion Attributes
const EMOTIONS = [
  { id: 'happy', label: 'Happy', color: '#22c55e' },
  { id: 'sad', label: 'Sad', color: '#3b82f6' },
  { id: 'angry', label: 'Anger', color: '#ef4444' },
  { id: 'surprise', label: 'Surprise', color: '#eab308' },
  { id: 'fear', label: 'Fear', color: '#8b5cf6' },
  { id: 'disgust', label: 'Disgust', color: '#8b0000' },
  { id: 'neutral', label: 'Neutral', color: '#64748b' },
] as const;

export function EmotionGraph() {
  const [data, setData] = useState<any[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(['happy', 'sad', 'neutral']);
  const [timePeriod, setTimePeriod] = useState<'1week' | '1month' | '6months' | '1year'>('1week');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['hindi', 'english', 'maths']);
  const [selectedDurations, setSelectedDurations] = useState<string[]>(['1week']);
  const [isSubjectsDropdownOpen, setIsSubjectsDropdownOpen] = useState(false);
  const [isDurationsDropdownOpen, setIsDurationsDropdownOpen] = useState(false);

  const SUBJECTS = [
    { id: 'hindi', label: 'Hindi' },
    { id: 'english', label: 'English' },
    { id: 'maths', label: 'Maths' },
  ];

  const DURATIONS = [
    { id: '1week', label: '1 Week' },
    { id: '1month', label: '1 Month' },
    { id: '6months', label: '6 Months' },
    { id: '1year', label: '1 Year' },
  ];

  // Fetch Data from fake data function
  useEffect(() => {
    async function fetchEmotionData() {
      const emotions = await getEmotionData();
      if (Array.isArray(emotions)) {
        setData(emotions); // Handle case where emotions is an array
      } else {
        // Format Data for Recharts
        const formattedData = Array.isArray(emotions)
          ? emotions.map((entry: any) => ({
              timestamp: new Date(entry.captured_at).toISOString(),
              happy: entry.happy,
              sad: entry.sad,
              anger: entry.angry,
              surprise: entry.surprise,
              fear: entry.fear,
              disgust: entry.disgust,
              neutral: entry.neutral,
            }))
          : [];
        setData(formattedData);
        setData(emotions.chartData || []); // Handle case where emotions is an object
      }
    }

    fetchEmotionData();
    const intervalId = setInterval(fetchEmotionData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Filter data based on selected time period
  const getFilteredData = () => {
    const now = new Date();
    let startDate = new Date();

    switch (timePeriod) {
      case '1week':
        startDate.setDate(now.getDate() - 7);
        break;
      case '1month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return data.filter(
      (item) => new Date(item.timestamp) >= startDate
    );
  };

  // Toggle Emotion Selection
  const toggleEmotion = (emotionId: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionId)
        ? prev.filter((id) => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  const filteredData = getFilteredData();

  return (
    <div className="col-span-12 xl:col-span-7 overflow-hidden rounded-lg border bg-white/50 backdrop-blur-lg shadow-sm dark:bg-gray-800/50">
      {/* Card Header */}
      <div className="border-b bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
        <h3 className="text-xl font-semibold text-white">Emotion Trends</h3>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Filters Section */}
        <div className="mb-6 space-y-3">
          {/* Top Row: Emotions and Sort By */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Emotion Selection Filters */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Emotions:
              </label>
              <div className="flex flex-wrap gap-1 overflow-x-auto pb-1">
                {EMOTIONS.map((emotion) => (
                  <button
                    key={emotion.id}
                    onClick={() => toggleEmotion(emotion.id)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 border border-gray-300 whitespace-nowrap ${
                      selectedEmotions.includes(emotion.id)
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50'
                    }`}
                    style={
                      selectedEmotions.includes(emotion.id)
                        ? {
                            backgroundColor: emotion.color,
                            borderColor: emotion.color,
                          }
                        : {}
                    }
                  >
                    {/* Color indicator dot */}
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: emotion.color,
                      }}
                    />
                    <span>{emotion.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subjects and Duration Dropdowns */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Sort By:
              </label>
              <div className="flex items-center gap-4 flex-wrap">
              {/* Subjects Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSubjectsDropdownOpen(!isSubjectsDropdownOpen)}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all hover:border-purple-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                >
                  <span>Subjects ({selectedSubjects.length})</span>
                  <svg
                    className={`h-3 w-3 transition-transform ${isSubjectsDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Subjects Dropdown Menu */}
                {isSubjectsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-gray-300 bg-white shadow-lg z-50 dark:border-gray-600 dark:bg-gray-800">
                    <div className="p-2 space-y-1">
                      {SUBJECTS.map((subject) => (
                        <label
                          key={subject.id}
                          className="flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <input
                            type="radio"
                            name="subject"
                            checked={selectedSubjects.includes(subject.id)}
                            onChange={() => {
                              setSelectedSubjects([subject.id]);
                            }}
                            className="h-4 w-4 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {subject.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Duration Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDurationsDropdownOpen(!isDurationsDropdownOpen)}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all hover:border-purple-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                >
                  <span>Duration ({selectedDurations.length})</span>
                  <svg
                    className={`h-3 w-3 transition-transform ${isDurationsDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Duration Dropdown Menu */}
                {isDurationsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-gray-300 bg-white shadow-lg z-50 dark:border-gray-600 dark:bg-gray-800">
                    <div className="p-2 space-y-1">
                      {DURATIONS.map((duration) => (
                        <label
                          key={duration.id}
                          className="flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <input
                            type="radio"
                            name="duration"
                            checked={selectedDurations.includes(duration.id)}
                            onChange={() => {
                              setSelectedDurations([duration.id]);
                            }}
                            className="h-4 w-4 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {duration.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Emotion Graph */}
        <div className="relative h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                {EMOTIONS.map((emotion) => (
                  <linearGradient
                    key={emotion.id}
                    id={`gradient-${emotion.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={emotion.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={emotion.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" opacity={0.2} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                stroke="#6b7280"
              />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelFormatter={(value) => new Date(value).toLocaleString()}
              />
              <Legend />
              {EMOTIONS.map(
                (emotion) =>
                  selectedEmotions.includes(emotion.id) && (
                    <Area
                      key={emotion.id}
                      type="monotone"
                      dataKey={emotion.id}
                      name={emotion.label}
                      stroke={emotion.color}
                      fill={`url(#gradient-${emotion.id})`}
                      strokeWidth={2}
                    />
                  )
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}