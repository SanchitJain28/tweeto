// /pages/auth/callback.js
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';


export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient()
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // ✅ User is now logged in
        router.push('/'); // go to username setup
      } else {
        // Handle failed login or session
        router.push('/signup/confirm'); // fallback
      }
    };

    checkSession();
  }, []);

  return <p>Verifying your account...</p>;
}
