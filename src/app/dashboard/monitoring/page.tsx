"use client";

import { useState, useMemo } from "react";
import {
  Smile,
  Frown,
  Meh,
  AlertCircle,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface StudentMood {
  id: number;
  name: string;
  studentId: string;
  currentMood: "happy" | "neutral" | "sad" | "stressed";
  moodScore: number;
  engagementLevel: number;
  focusTime: number;
  classAttendance: string;
  alertLevel: "none" | "low" | "medium" | "high";
  moodTrend: ("happy" | "neutral" | "sad" | "stressed")[];
  needsSupport: boolean;
  supportCategory?: string;
}

export default function MonitoringPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("engagement");

  const students: StudentMood[] = [
    {
      id: 1,
      name: "Arjun Sharma",
      studentId: "STU001",
      currentMood: "happy",
      moodScore: 85,
      engagementLevel: 92,
      focusTime: 45,
      classAttendance: "95%",
      alertLevel: "none",
      moodTrend: ["happy", "happy", "neutral", "happy", "happy"],
      needsSupport: false,
    },
    {
      id: 2,
      name: "Priya Desai",
      studentId: "STU002",
      currentMood: "stressed",
      moodScore: 45,
      engagementLevel: 65,
      focusTime: 25,
      classAttendance: "80%",
      alertLevel: "high",
      moodTrend: ["sad", "sad", "stressed", "sad", "stressed"],
      needsSupport: true,
      supportCategory: "Academic Counseling",
    },
    {
      id: 3,
      name: "Raj Kumar",
      studentId: "STU003",
      currentMood: "neutral",
      moodScore: 62,
      engagementLevel: 70,
      focusTime: 35,
      classAttendance: "85%",
      alertLevel: "medium",
      moodTrend: ["neutral", "happy", "neutral", "sad", "neutral"],
      needsSupport: true,
      supportCategory: "Motivation Support",
    },
    {
      id: 4,
      name: "Anjali Singh",
      studentId: "STU004",
      currentMood: "happy",
      moodScore: 88,
      engagementLevel: 94,
      focusTime: 48,
      classAttendance: "98%",
      alertLevel: "none",
      moodTrend: ["happy", "happy", "happy", "happy", "happy"],
      needsSupport: false,
    },
    {
      id: 5,
      name: "Vikram Patel",
      studentId: "STU005",
      currentMood: "sad",
      moodScore: 35,
      engagementLevel: 45,
      focusTime: 18,
      classAttendance: "70%",
      alertLevel: "high",
      moodTrend: ["sad", "sad", "sad", "sad", "stressed"],
      needsSupport: true,
      supportCategory: "Mental Health Support",
    },
    {
      id: 6,
      name: "Neha Gupta",
      studentId: "STU006",
      currentMood: "happy",
      moodScore: 80,
      engagementLevel: 88,
      focusTime: 42,
      classAttendance: "92%",
      alertLevel: "low",
      moodTrend: ["happy", "neutral", "happy", "happy", "happy"],
      needsSupport: false,
    },
  ];

  // Filter students
  const filteredStudents = useMemo(() => {
    let result = [...students];

    if (selectedFilter === "needsHelp") {
      result = result.filter((s) => s.needsSupport);
    } else if (selectedFilter === "alert") {
      result = result.filter((s) => s.alertLevel !== "none");
    } else if (selectedFilter === "happy") {
      result = result.filter((s) => s.currentMood === "happy");
    }

    // Sort
    if (sortBy === "engagement") {
      result.sort((a, b) => b.engagementLevel - a.engagementLevel);
    } else if (sortBy === "mood") {
      const moodOrder = { happy: 0, neutral: 1, sad: 2, stressed: 3 };
      result.sort((a, b) => moodOrder[a.currentMood] - moodOrder[b.currentMood]);
    } else if (sortBy === "risk") {
      const riskOrder = { high: 0, medium: 1, low: 2, none: 3 };
      result.sort((a, b) => riskOrder[a.alertLevel] - riskOrder[b.alertLevel]);
    }

    return result;
  }, [selectedFilter, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const avgEngagement =
      students.reduce((sum, s) => sum + s.engagementLevel, 0) / totalStudents;
    const needsHelpCount = students.filter((s) => s.needsSupport).length;
    const avgMoodScore =
      students.reduce((sum, s) => sum + s.moodScore, 0) / totalStudents;

    return {
      totalStudents,
      avgEngagement: avgEngagement.toFixed(1),
      needsHelpCount,
      avgMoodScore: avgMoodScore.toFixed(1),
    };
  }, []);

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "happy":
        return <Smile className="w-5 h-5 text-green-500" />;
      case "neutral":
        return <Meh className="w-5 h-5 text-yellow-500" />;
      case "sad":
        return <Frown className="w-5 h-5 text-orange-500" />;
      case "stressed":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy":
        return "from-green-500 to-green-600";
      case "neutral":
        return "from-yellow-500 to-yellow-600";
      case "sad":
        return "from-orange-500 to-orange-600";
      case "stressed":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
      case "low":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "none":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Breadcrumb pageName="Live Student Monitoring" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Students */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Total Students
              </h3>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stats.totalStudents}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Under monitoring
            </p>
          </div>

          {/* Avg Engagement */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Avg Engagement
              </h3>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {stats.avgEngagement}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Across all students
            </p>
          </div>

          {/* Needs Support */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Needs Support
              </h3>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {stats.needsHelpCount}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Require intervention
            </p>
          </div>

          {/* Avg Mood Score */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Avg Mood Score
              </h3>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                <Smile className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {stats.avgMoodScore}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Out of 100
            </p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Filter Students
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "All Students" },
                  { value: "needsHelp", label: "Needs Support" },
                  { value: "alert", label: "Alert Status" },
                  { value: "happy", label: "Happy & Engaged" },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === filter.value
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="engagement">Engagement Level</option>
                <option value="mood">Mood Score</option>
                <option value="risk">Risk Level</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className={`rounded-xl shadow-md border transition-all hover:shadow-xl ${
                student.needsSupport
                  ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
            >
              {/* Header with current mood */}
              <div className={`h-2 bg-gradient-to-r ${getMoodColor(student.currentMood)}`}></div>

              <div className="p-6">
                {/* Student Name and ID */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {student.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {student.studentId}
                  </p>
                </div>

                {/* Current Mood */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getMoodIcon(student.currentMood)}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {student.currentMood}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAlertColor(student.alertLevel)}`}>
                    {student.alertLevel === "none" ? "Normal" : student.alertLevel.charAt(0).toUpperCase() + student.alertLevel.slice(1)}
                  </span>
                </div>

                {/* Mood Trend */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Mood Trend
                  </p>
                  <div className="flex gap-1">
                    {student.moodTrend.map((mood, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 h-2 rounded-full bg-gradient-to-r ${getMoodColor(mood)}`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Engagement
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {student.engagementLevel}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Focus Time
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {student.focusTime}m
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Mood Score
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {student.moodScore}/100
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Attendance
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {student.classAttendance}
                    </p>
                  </div>
                </div>

                {/* Support Info */}
                {student.needsSupport && student.supportCategory && (
                  <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-xs font-medium text-yellow-800 dark:text-yellow-300">
                      📌 {student.supportCategory}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <button className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                  student.needsSupport
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}>
                  {student.needsSupport ? "Schedule Support" : "View Profile"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
