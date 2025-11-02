'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
};

type TimetableData = {
  [day: string]: TimeSlot[];
};

const TodaysTimetable = () => {
  const [timetable, setTimetable] = useState<TimetableData>({});
  const [todaySlots, setTodaySlots] = useState<TimeSlot[]>([]);
  const [currentDay, setCurrentDay] = useState<string>('');

  useEffect(() => {
    // Get today's day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const todayName = days[today];
    setCurrentDay(todayName);

    // Load timetable from localStorage
    const savedTimetable = localStorage.getItem('timetable');
    if (savedTimetable) {
      const parsedTimetable = JSON.parse(savedTimetable);
      setTimetable(parsedTimetable);
      setTodaySlots((parsedTimetable[todayName] || []).sort((a: TimeSlot, b: TimeSlot) =>
        a.startTime.localeCompare(b.startTime)
      ));
    }
  }, []);

  const getUpcomingSlots = () => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    return todaySlots.filter((slot) => slot.startTime >= currentTime);
  };

  const upcomingSlots = getUpcomingSlots();
  const hasSlots = todaySlots.length > 0;

  return (
    <div className="col-span-12 lg:col-span-5 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Today&apos;s Schedule</h3>
            <p className="text-sm text-blue-100">{currentDay}</p>
          </div>
          <Calendar className="h-8 w-8 text-white opacity-80" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!hasSlots ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="mb-2 text-gray-500 dark:text-gray-400">No classes scheduled for today</p>
            <Link
              href="/dashboard/timetable"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
            >
              Set Your Timetable
            </Link>
          </div>
        ) : (
          <>
            {/* Upcoming Classes */}
            <div className="mb-6">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-800 dark:text-white">
                <Clock className="h-4 w-4 text-blue-500" />
                Upcoming Classes
              </h4>
              {upcomingSlots.length > 0 ? (
                <div className="space-y-2">
                  {upcomingSlots.slice(0, 3).map((slot, index) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20"
                    >
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{slot.subject}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming classes today</p>
              )}
            </div>

            {/* All Classes */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-800 dark:text-white">All Classes Today</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {todaySlots.map((slot, index) => (
                  <div
                    key={slot.id}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-2 dark:border-gray-700"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-center text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-white">{slot.subject}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <Link
              href="/dashboard/timetable"
              className="mt-4 block w-full rounded-lg border-2 border-blue-500 py-2 text-center font-medium text-blue-600 hover:bg-blue-50 transition-colors dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              Edit Timetable
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TodaysTimetable;
