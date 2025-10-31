import type { IconProps } from "@/types/icon-props";

/**
 * Default Instagram-style user avatar icon
 * Displays a circular user silhouette similar to Instagram's default profile picture
 */
export function DefaultUserAvatar(props: IconProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="currentColor"
      {...props}
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
      
      {/* Head circle */}
      <circle cx="20" cy="13" r="6" fill="#9CA3AF" />
      
      {/* Body/shoulders */}
      <path
        d="M20 20C26.6274 20 32 24.4772 32 30V40H8V30C8 24.4772 13.3726 20 20 20Z"
        fill="#9CA3AF"
      />
    </svg>
  );
}

/**
 * Smaller version of default user avatar (for compact displays)
 */
export function DefaultUserAvatarSmall(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="currentColor"
      {...props}
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
      
      {/* Head circle */}
      <circle cx="20" cy="13" r="6" fill="#9CA3AF" />
      
      {/* Body/shoulders */}
      <path
        d="M20 20C26.6274 20 32 24.4772 32 30V40H8V30C8 24.4772 13.3726 20 20 20Z"
        fill="#9CA3AF"
      />
    </svg>
  );
}
