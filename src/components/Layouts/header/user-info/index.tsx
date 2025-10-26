"use client";

import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3 rounded-full bg-gray-200 px-4 py-2 dark:bg-gray-700 animate-pulse">
        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-opacity-90"
      >
        Sign In
      </Link>
    );
  }

  const user = session.user;
  const userImage = user.image || "/images/user/user-03.png";
  const userName = user.name || "User";
  const userEmail = user.email || "user@example.com";

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="group relative rounded-lg align-middle outline-none transition-all ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark hover:bg-gray-100 dark:hover:bg-gray-800">
        <span className="sr-only">User Menu</span>

        <div className="flex items-center gap-3 px-3 py-2">
          <div className="relative">
            <Image
              src={userImage}
              className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
              alt={`Avatar of ${userName}`}
              role="presentation"
              width={40}
              height={40}
              priority
            />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
          </div>
          
          <div className="hidden flex-col items-start md:flex">
            <span className="text-sm font-semibold text-dark dark:text-white truncate max-w-[120px]">
              {userName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
              {userEmail}
            </span>
          </div>

          <ChevronUpIcon
            aria-hidden
            className={cn(
              "hidden md:block h-4 w-4 transition-transform duration-200 text-gray-600 dark:text-gray-400",
              isOpen && "rotate-0",
              !isOpen && "rotate-180"
            )}
            strokeWidth={2}
          />
        </div>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-gray-dark min-w-[280px]"
        align="end"
      >
        {/* User Info Header */}
        <div className="border-b border-stroke dark:border-dark-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={userImage}
                className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                alt={`Avatar for ${userName}`}
                role="presentation"
                width={48}
                height={48}
              />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-dark dark:text-white truncate">
                {userName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {userEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 space-y-1">
          <Link
            href={"/dashboard/profile"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <UserIcon className="h-5 w-5 flex-shrink-0" />
            <span>View Profile</span>
          </Link>

          <Link
            href={"/dashboard/pages/settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <SettingsIcon className="h-5 w-5 flex-shrink-0" />
            <span>Settings</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-stroke dark:border-dark-3 my-1"></div>

        {/* Logout Button */}
        <div className="p-2">
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              isLoggingOut
                ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 cursor-not-allowed opacity-60"
                : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            )}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOutIcon className="h-5 w-5 flex-shrink-0" />
            <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
            {isLoggingOut && (
              <svg className="ml-auto h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-stroke dark:border-dark-3 px-4 py-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Session expires in 30 days
          </p>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
