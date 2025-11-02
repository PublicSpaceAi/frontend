'use client';

import { useState } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
};

type TimetableDay = {
  [key: string]: TimeSlot[];
};

const SetTimetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const subjects = ['Hindi', 'English', 'Maths', 'Science', 'Social Studies', 'PE', 'Arts'];

  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [timetable, setTimetable] = useState<TimetableDay>(() => {
    const initial: TimetableDay = {};
    days.forEach((day) => {
      initial[day] = [];
    });
    return initial;
  });

  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [tempSlot, setTempSlot] = useState<TimeSlot>({ id: '', startTime: '', endTime: '', subject: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSlot = () => {
    setShowAddForm(true);
    setTempSlot({ id: Date.now().toString(), startTime: '', endTime: '', subject: '' });
  };

  const handleEditSlot = (slot: TimeSlot) => {
    setEditingSlot(slot.id);
    setTempSlot(slot);
    setShowAddForm(true);
  };

  const handleSaveSlot = () => {
    if (!tempSlot.startTime || !tempSlot.endTime || !tempSlot.subject) {
      alert('Please fill in all fields');
      return;
    }

    setTimetable((prev) => ({
      ...prev,
      [selectedDay]: editingSlot
        ? prev[selectedDay].map((slot) => (slot.id === editingSlot ? tempSlot : slot))
        : [...prev[selectedDay], tempSlot],
    }));

    setShowAddForm(false);
    setEditingSlot(null);
    setTempSlot({ id: '', startTime: '', endTime: '', subject: '' });
  };

  const handleDeleteSlot = (slotId: string) => {
    setTimetable((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].filter((slot) => slot.id !== slotId),
    }));
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingSlot(null);
    setTempSlot({ id: '', startTime: '', endTime: '', subject: '' });
  };

  const handleSaveTimetable = () => {
    localStorage.setItem('timetable', JSON.stringify(timetable));
    alert('Timetable saved successfully!');
  };

  const currentDaySlots = timetable[selectedDay] || [];
  const sortedSlots = [...currentDaySlots].sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="w-full rounded-lg bg-white shadow-md dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-white">Set Your Timetable</h2>
        <p className="text-sm text-purple-100">Organize your weekly schedule with ease</p>
      </div>

      <div className="flex flex-col gap-6 p-6 lg:flex-row">
        {/* Left: Day Selection */}
        <div className="lg:w-1/4">
          <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">Select Day</h3>
          <div className="space-y-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`w-full rounded-lg px-4 py-3 text-left font-medium transition-all ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Timetable Content */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {selectedDay}&apos;s Schedule
            </h3>
            <button
              onClick={handleAddSlot}
              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
            >
              <Plus size={18} />
              Add Period
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="mb-6 rounded-lg border-2 border-purple-300 bg-purple-50 p-4 dark:border-purple-600 dark:bg-purple-900/20">
              <h4 className="mb-4 font-semibold text-gray-800 dark:text-white">
                {editingSlot ? 'Edit Period' : 'Add New Period'}
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={tempSlot.startTime}
                      onChange={(e) =>
                        setTempSlot((prev) => ({ ...prev, startTime: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-900"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={tempSlot.endTime}
                      onChange={(e) =>
                        setTempSlot((prev) => ({ ...prev, endTime: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <select
                    value={tempSlot.subject}
                    onChange={(e) =>
                      setTempSlot((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-900"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleSaveSlot}
                  className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 transition-colors"
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-lg bg-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-200"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Schedule List */}
          <div className="space-y-2">
            {sortedSlots.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-8 text-center dark:border-gray-600 dark:bg-gray-700/50">
                <p className="text-gray-500 dark:text-gray-400">No periods added yet</p>
              </div>
            ) : (
              sortedSlots.map((slot, index) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-700"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-center leading-8 font-medium text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{slot.subject}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditSlot(slot)}
                      className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-200 transition-colors dark:bg-red-900 dark:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-700/50">
        <div className="flex justify-end gap-3">
          <button className="rounded-lg border-2 border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSaveTimetable}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 font-medium text-white hover:shadow-lg transition-all"
          >
            <Save size={18} />
            Save Timetable
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetTimetable;
