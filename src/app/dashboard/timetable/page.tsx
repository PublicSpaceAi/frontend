'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import CalendarBox from '@/components/TimeTable';
import SetTimetable from '@/components/TimeTable/SetTimetable';

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState<'view' | 'set'>('set');

  return (
    <>
      <Breadcrumb pageName="Timetable" />

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 rounded-lg border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <button
          onClick={() => setActiveTab('set')}
          className={`flex-1 rounded-md px-4 py-2 font-medium transition-all ${
            activeTab === 'set'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
              : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          }`}
        >
          Set Timetable
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`flex-1 rounded-md px-4 py-2 font-medium transition-all ${
            activeTab === 'view'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
              : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          }`}
        >
          View Timetable
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'set' ? <SetTimetable /> : <CalendarBox />}
    </>
  );
};

export default CalendarPage;
