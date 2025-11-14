import React from 'react'
import ProfileClient from './ProfileClient'
import { checkProfile } from '@/models/checkProfile'

export default async function ProfilePage() {
  await checkProfile()
  return (
    <div>
        <ProfileClient/>
    </div>
  )
}
