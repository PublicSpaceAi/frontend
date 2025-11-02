"use client";

import { useState } from "react";
import { BookOpen, Clock, Users, BarChart3, ChevronRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function CoursesPage() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Dr. Sarah Johnson",
      semester: "Fall 2024",
      progress: 75,
      students: 124,
      credits: 3,
      status: "In Progress",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      instructor: "Prof. Michael Chen",
      semester: "Fall 2024",
      progress: 60,
      students: 98,
      credits: 4,
      status: "In Progress",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      title: "Database Management Systems",
      instructor: "Dr. Emily Rodriguez",
      semester: "Fall 2024",
      progress: 85,
      students: 76,
      credits: 3,
      status: "In Progress",
      color: "from-green-500 to-green-600",
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Prof. James Wilson",
      semester: "Fall 2024",
      progress: 40,
      students: 102,
      credits: 4,
      status: "In Progress",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 5,
      title: "Mobile App Development",
      instructor: "Dr. Lisa Anderson",
      semester: "Spring 2025",
      progress: 0,
      students: 88,
      credits: 3,
      status: "Upcoming",
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 6,
      title: "Cloud Computing",
      instructor: "Prof. David Martinez",
      semester: "Spring 2025",
      progress: 0,
      students: 65,
      credits: 4,
      status: "Upcoming",
      color: "from-indigo-500 to-indigo-600",
    },
  ]);

  const activeCourses = courses.filter((c) => c.status === "In Progress");
  const upcomingCourses = courses.filter((c) => c.status === "Upcoming");
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Breadcrumb pageName="My Courses" />

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Total Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Total Courses
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {courses.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Active Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Active Courses
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {activeCourses.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Total Credits */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Total Credits
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {totalCredits}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          {/* Avg Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Avg Progress
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {activeCourses.length > 0
                    ? Math.round(
                        activeCourses.reduce((sum, c) => sum + c.progress, 0) /
                          activeCourses.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Courses Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600 rounded"></div>
              Active Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Courses you are currently enrolled in
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                {/* Color header bar */}
                <div
                  className={`h-2 bg-gradient-to-r ${course.color}`}
                ></div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {course.instructor}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                      {course.status}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Progress
                      </span>
                      <span className="text-xs font-medium text-gray-900 dark:text-white">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${course.color} transition-all duration-500`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Course info */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Semester
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.semester}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Students
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.students}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Credits
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.credits}
                      </p>
                    </div>
                  </div>

                  {/* Action button */}
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    View Course
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Courses Section */}
        {upcomingCourses.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                Upcoming Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Courses available for enrollment in the next semester
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  {/* Color header bar */}
                  <div
                    className={`h-2 bg-gradient-to-r ${course.color}`}
                  ></div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {course.instructor}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                        {course.status}
                      </span>
                    </div>

                    {/* Course info */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Semester
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {course.semester}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Students
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {course.students}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Credits
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {course.credits}
                        </p>
                      </div>
                    </div>

                    {/* Action button */}
                    <button className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                      Enroll Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
