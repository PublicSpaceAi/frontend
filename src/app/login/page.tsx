import { redirect } from "next/navigation"

// Login route has been removed - redirect to dashboard
export default function LoginPage() {
  redirect("/dashboard/features")
}
