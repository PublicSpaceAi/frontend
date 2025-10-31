import { NextRequest, NextResponse } from "next/server"

// This is a placeholder API route for user registration
// You should connect this to your actual database

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, age, gender } = body

    // Validation
    if (!name || !email || !password || !age || !gender) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    if (age < 18) {
      return NextResponse.json(
        { message: "You must be at least 18 years old" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    // TODO: Add your own registration logic here
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Save user to database
    // 4. Return success or error

    // For now, this is a placeholder that always succeeds
    // Replace this with your actual database logic
    console.log("Registration attempt:", { name, email, age, gender })

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          name,
          email,
          age,
          gender,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    )
  }
}
