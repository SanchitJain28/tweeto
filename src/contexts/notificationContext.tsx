"use client";

import { useAuth } from "@/hooks/useAuth";
import { Notification } from "@/types/Types";
import { createClient } from "@/utils/supabase/client";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface NotificationContextType {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

const supabase = createClient();

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[] | []>([]);
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!user?.id || loading) return;
    console.log("NOTIFICATION CHANNEL INITIATED")
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `recipient_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("📬 New notification:", payload.new);
          setNotifications((prev) => [payload.new as Notification, ...prev]);
          toast("🔔 New notification");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, loading]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}
