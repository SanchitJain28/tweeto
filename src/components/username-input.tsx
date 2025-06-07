"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { checkUsernameAvailability } from "@/actions/profile-actions"


interface UsernameInputProps {
  value: string
  onChange: (value: string) => void
  onValidityChange: (isValid: boolean) => void
}

export function UsernameInput({ value, onChange, onValidityChange }: UsernameInputProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [availability, setAvailability] = useState<{ available: boolean; message: string } | null>(null)
  const [error, setError] = useState<string>("")

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long"
    }
    if (username.length > 20) {
      return "Username must be less than 20 characters"
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers, and underscores"
    }
    if (username.startsWith("_") || username.endsWith("_")) {
      return "Username cannot start or end with an underscore"
    }
    return ""
  }

  useEffect(() => {
    const checkAvailability = async () => {
      if (!value) {
        setAvailability(null)
        setError("")
        onValidityChange(false)
        return
      }

      const validationError = validateUsername(value)
      if (validationError) {
        setError(validationError)
        setAvailability(null)
        onValidityChange(false)
        return
      }

      setError("")
      setIsChecking(true)

      try {
        const result = await checkUsernameAvailability(value)
        setAvailability(result)
        onValidityChange(result.available)
      } catch (error) {
        console.log(error)
        setError("Failed to check username availability")
        onValidityChange(false)
      } finally {
        setIsChecking(false)
      }
    }

    const timeoutId = setTimeout(checkAvailability, 300)
    return () => clearTimeout(timeoutId)
  }, [value, onValidityChange])

  const getStatusIcon = () => {
    if (isChecking) {
      return <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
    }
    if (error) {
      return <XCircle className="h-4 w-4 text-red-500" />
    }
    if (availability?.available) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    if (availability && !availability.available) {
      return <XCircle className="h-4 w-4 text-red-500" />
    }
    return null
  }

  const getStatusMessage = () => {
    if (error) return error
    if (availability) return availability.message
    return ""
  }

  const getStatusColor = () => {
    if (error || (availability && !availability.available)) return "text-red-500"
    if (availability?.available) return "text-green-500"
    return "text-gray-500"
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</div>
        <Input
          id="username"
          name="username"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="your-username"
          className="pl-8 pr-10"
          required
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{getStatusIcon()}</div>
      </div>
      {getStatusMessage() && <p className={`text-sm ${getStatusColor()}`}>{getStatusMessage()}</p>}
    </div>
  )
}
