"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Users,
  Settings,
  FileText,
  BookOpen,
  Clock,
  Award,
  MessageSquare,
  Eye,
} from "lucide-react";

export default function FeaturesPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(true); // You can determine this from user role

  const adminFeatures = [
    {
      title: "Live Student Monitoring",
      description: "Track student engagement through face and mood detection to identify support needs",
      icon: Eye,
      href: "/dashboard/home",
    },
    {
      title: "Manage Users",
      description: "Add, edit, and remove students and staff",
      icon: Users,
      href: "/dashboard/manage/users",
    },
    {
      title: "Analytics",
      description: "View detailed reports and statistics",
      icon: BarChart3,
      href: "/dashboard/reports",
    },
    {
      title: "Documents",
      description: "Manage academic documents",
      icon: FileText,
      href: "/dashboard/manage/documents",
    },
  ];

  const studentFeatures = [
    {
      title: "My Courses",
      description: "View and access your enrolled courses",
      icon: BookOpen,
      href: "/dashboard/courses",
    },
    {
      title: "Timetable",
      description: "Check your class schedule",
      icon: Clock,
      href: "/dashboard/timetable",
    },
    {
      title: "Grades",
      description: "View your grades and performance",
      icon: Award,
      href: "/dashboard/grades",
    },
    {
      title: "Chatbot",
      description: "AI-powered chatbot powered by GenAI with RAG-based context storage",
      icon: MessageSquare,
      href: "https://public-space-ai-chatbot-hz6mki-d98a47-35-200-243-45.traefik.me/",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select a feature below to get started
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Admin Features Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-1 h-8 bg-purple-600 rounded"></div>
              Admin Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your institution and monitor system activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.title}
                  onClick={() => router.push(feature.href)}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left"
                >
                  {/* Background accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Student Features Section */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-1 h-8 bg-blue-600 rounded"></div>
              Student Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Access your academic resources and information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.title}
                  onClick={() => {
                    if (feature.external) {
                      window.open(feature.href, "_blank");
                    } else {
                      router.push(feature.href);
                    }
                  }}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left"
                >
                  {/* Background accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
