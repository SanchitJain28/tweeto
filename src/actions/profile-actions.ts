"use server"

// Simulate existing usernames for demo
const existingUsernames = ["john", "jane", "admin", "user", "test", "demo", "sample"]

export async function checkUsernameAvailability(username: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const isAvailable = !existingUsernames.includes(username.toLowerCase())

  return {
    available: isAvailable,
    message: isAvailable ? "Username is available!" : "Username is already taken",
  }
}

export async function createProfile(formData: FormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const username = formData.get("username") as string
  const displayName = formData.get("displayName") as string
  const bio = formData.get("bio") as string

  // Check if username is available one more time
  const availability = await checkUsernameAvailability(username)

  if (!availability.available) {
    return {
      success: false,
      message: "Username is no longer available",
    }
  }

  return {
    success: true,
    message: `Profile created successfully for @${username}!`,
    profile: {
      username,
      displayName,
      bio,
    },
  }
}
