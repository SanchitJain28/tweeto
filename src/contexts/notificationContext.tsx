"use client";

import { useAuth } from "@/hooks/useAuth";
import { NotificationView } from "@/types/Types";
import { createClient } from "@/utils/supabase/client";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface NotificationContextType {
  notifications: NotificationView[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationView[]>>;
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

const supabase = createClient();

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<NotificationView[] | []>(
    []
  );
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, loading } = useAuth();

  const fetchnotifications = async () => {
    console.log("FETCHED");

    if (!user?.id) return;

    const { data, error } = await supabase
      .from("notifications_view")
      .select("*")
      .eq("recipient_id", user?.id);

    console.log(data, error);

    if (data) {
      setNotifications(data);
      setUnreadCount(data.length);
    }

    if (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    if (!user?.id || loading) return;
    console.log("NOTIFICATION CHANNEL INITIATED");
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
          setNotifications((prev) => [
            payload.new as NotificationView,
            ...prev,
          ]);
          setUnreadCount((prev) => prev + 1);
          toast("🔔 New notification");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, loading]);

  useEffect(() => {
    if (user?.id) {
      fetchnotifications();
    }
  }, [user?.id]);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, unreadCount, setUnreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
