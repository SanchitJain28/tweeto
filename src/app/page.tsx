"use client"
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Home() {
  const [user,setUser]=useState<User|null>(null)
  const supabase = createClient()
  const getUser=async()=>{
    const {data} = await supabase.auth.getUser()
    setUser(data.user)
    console.log(data)
  }
  useEffect(()=>{
    getUser()
  },[])
  if(!user){
    return (
      <div className="justify-center flex text-4xl">Please log in </div>
    )
  }
  return (
    <div className="">
      <h1 className="justify-center flex text-4xl">Welcome  {user.user_metadata.email}</h1>
    </div>
  );
}
