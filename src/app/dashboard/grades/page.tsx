"use client";

import { useState, useMemo } from "react";
import { TrendingUp, Award, Target, AlertCircle, CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface Grade {
  id: number;
  course: string;
  grade: string;
  score: number;
  credits: number;
  instructor: string;
  status: string;
}

interface GradesData {
  [key: string]: Grade[];
}

export default function GradesPage() {
  const [selectedSemester, setSelectedSemester] = useState("Fall 2024");

  const grades: GradesData = {
    "Fall 2024": [
      {
        id: 1,
        course: "Introduction to Web Development",
        grade: "A",
        score: 92,
        credits: 3,
        instructor: "Dr. Priya Sharma",
        status: "Excellent",
      },
      {
        id: 2,
        course: "Data Structures and Algorithms",
        grade: "A-",
        score: 88,
        credits: 4,
        instructor: "Prof. Rajesh Kumar",
        status: "Very Good",
      },
      {
        id: 3,
        course: "Database Management Systems",
        grade: "B+",
        score: 85,
        credits: 3,
        instructor: "Dr. Anjali Desai",
        status: "Good",
      },
      {
        id: 4,
        course: "Machine Learning Basics",
        grade: "A",
        score: 90,
        credits: 4,
        instructor: "Prof. Vikram Singh",
        status: "Excellent",
      },
    ],
    "Spring 2024": [
      {
        id: 5,
        course: "Web Design Fundamentals",
        grade: "A",
        score: 94,
        credits: 3,
        instructor: "Dr. Neha Gupta",
        status: "Excellent",
      },
      {
        id: 6,
        course: "Programming Basics",
        grade: "B",
        score: 82,
        credits: 4,
        instructor: "Prof. Arjun Patel",
        status: "Good",
      },
      {
        id: 7,
        course: "Computer Networks",
        grade: "A-",
        score: 87,
        credits: 3,
        instructor: "Dr. Meera Nair",
        status: "Very Good",
      },
    ],
    "Fall 2023": [
      {
        id: 8,
        course: "Calculus I",
        grade: "B+",
        score: 84,
        credits: 4,
        instructor: "Prof. Sneha Reddy",
        status: "Good",
      },
      {
        id: 9,
        course: "Physics I",
        grade: "A-",
        score: 89,
        credits: 4,
        instructor: "Dr. Arun Iyer",
        status: "Very Good",
      },
      {
        id: 10,
        course: "English Literature",
        grade: "B",
        score: 81,
        credits: 3,
        instructor: "Dr. Divya Kapoor",
        status: "Good",
      },
    ],
  };

  const currentGrades = grades[selectedSemester];

  // Calculate statistics
  const stats = useMemo(() => {
    const avgScore =
      currentGrades.reduce((sum, g) => sum + g.score, 0) / currentGrades.length;
    const totalCredits = currentGrades.reduce((sum, g) => sum + g.credits, 0);
    const excellentCount = currentGrades.filter(
      (g) => g.status === "Excellent"
    ).length;
    const goodCount = currentGrades.filter((g) =>
      ["Good", "Very Good"].includes(g.status)
    ).length;

    return {
      avgScore: avgScore.toFixed(1),
      totalCredits,
      excellentCount,
      goodCount,
    };
  }, [currentGrades]);

  // Grade distribution data for bar chart
  const gradeDistribution = useMemo(() => {
    const distribution = {
      A: currentGrades.filter((g) => g.grade === "A").length,
      "A-": currentGrades.filter((g) => g.grade === "A-").length,
      "B+": currentGrades.filter((g) => g.grade === "B+").length,
      B: currentGrades.filter((g) => g.grade === "B").length,
      "B-": currentGrades.filter((g) => g.grade === "B-").length,
    };
    return distribution;
  }, [currentGrades]);

  // Score range for visual distribution
  const scoreRanges = {
    "90-100": currentGrades.filter((g) => g.score >= 90).length,
    "80-89": currentGrades.filter((g) => g.score >= 80 && g.score < 90).length,
    "70-79": currentGrades.filter((g) => g.score >= 70 && g.score < 80).length,
    "Below 70": currentGrades.filter((g) => g.score < 70).length,
  };

  const getGradeColor = (grade: string) => {
    if (["A", "A-"].includes(grade)) return "from-green-500 to-green-600";
    if (["B+", "B"].includes(grade)) return "from-blue-500 to-blue-600";
    if (["B-", "C+"].includes(grade)) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 80) return "text-blue-600 dark:text-blue-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "Very Good":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "Good":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Breadcrumb pageName="My Grades" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Semester Selector */}
        <div className="mb-8 flex flex-wrap gap-3">
          {Object.keys(grades).map((semester) => (
            <button
              key={semester}
              onClick={() => setSelectedSemester(semester)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedSemester === semester
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-purple-400"
              }`}
            >
              {semester}
            </button>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Average Score */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Average Score
              </h3>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className={`text-4xl font-bold mb-2 ${getScoreColor(parseFloat(stats.avgScore))}`}>
              {stats.avgScore}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Out of 100
            </p>
          </div>

          {/* Total Credits */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Total Credits
              </h3>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stats.totalCredits}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Credits earned
            </p>
          </div>

          {/* Excellent Grades */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Excellent Grades
              </h3>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {stats.excellentCount}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              A or A- grades
            </p>
          </div>

          {/* Good Grades */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Good Grades
              </h3>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-shrink-0">
                <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {stats.goodCount}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              B or above
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Grade Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Grade Distribution
            </h3>
            <div className="space-y-4">
              {Object.entries(gradeDistribution).map(([grade, count]) => (
                <div key={grade}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Grade {grade}
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {count}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getGradeColor(grade)} transition-all duration-500`}
                      style={{
                        width: `${(count / currentGrades.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score Range Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Score Distribution
            </h3>
            <div className="space-y-4">
              {Object.entries(scoreRanges).map(([range, count]) => (
                <div key={range}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {range}
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {count}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${
                        range === "90-100"
                          ? "from-green-500 to-green-600"
                          : range === "80-89"
                          ? "from-blue-500 to-blue-600"
                          : range === "70-79"
                          ? "from-yellow-500 to-yellow-600"
                          : "from-red-500 to-red-600"
                      } transition-all duration-500`}
                      style={{
                        width: `${(count / currentGrades.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Grades Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Course Grades - {selectedSemester}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentGrades.map((gradeItem, index) => (
                  <tr
                    key={gradeItem.id}
                    className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-700/20"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {gradeItem.course}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {gradeItem.instructor}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <p
                        className={`text-sm font-bold ${getScoreColor(
                          gradeItem.score
                        )}`}
                      >
                        {gradeItem.score}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div
                        className={`inline-block px-3 py-1 rounded-lg font-bold text-white text-sm bg-gradient-to-r ${getGradeColor(
                          gradeItem.grade
                        )}`}
                      >
                        {gradeItem.grade}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {gradeItem.credits}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          gradeItem.status
                        )}`}
                      >
                        {gradeItem.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
