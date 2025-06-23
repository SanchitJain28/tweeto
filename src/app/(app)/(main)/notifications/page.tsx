"use client";

import { useAuth } from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";
import type { NotificationView } from "@/types/Types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const supabase = createClient();

export default function NotificationPage() {
  const { notifications } = useNotification();
  const { user, loading } = useAuth();
  const [allNotification, setAllNotification] = useState<NotificationView[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [readNotifications, setReadNotifications] = useState<Set<string>>(
    new Set()
  );

  const fetchnotifications = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from("notifications_view")
      .select("*")
      .eq("recipient_id", user?.id);

    if (data) {
      setAllNotification(data);
    }

    if (error) {
      console.error("Failed to fetch notifications:", error);
    }
    setIsLoading(false);
  };

  const markAsRead = (notificationId: string) => {
    setReadNotifications((prev) => new Set([...prev, notificationId]));
  };

  const markAllAsRead = () => {
    const allIds = allNotification.map((n) => n.notification_id);
    setReadNotifications(new Set(allIds));
  };

  const deleteNotification = (notificationId: string) => {
    setAllNotification((prev) =>
      prev.filter((n) => n.notification_id !== notificationId)
    );
    setReadNotifications((prev) => {
      const newSet = new Set(prev);
      newSet.delete(notificationId);
      return newSet;
    });
  };

  useEffect(() => {
    const fetchNewNotification = async () => {
      if (notifications.length === 0 || !user?.id) return;

      const { data, error } = await supabase
        .from("notifications_view")
        .select("*")
        .eq("recipient_id", user?.id);

      if (data) {
        setAllNotification(data);
      }

      if (error) {
        console.error("Failed to fetch full notification:", error);
      }
    };

    fetchNewNotification();
  }, [notifications, user?.id]);

  useEffect(() => {
    if (user?.id && !loading) {
      fetchnotifications();
    }
  }, [user?.id, loading]);

  if (loading) {
    return <NotificationSkeleton />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Please sign in
            </h3>
            <p className="text-gray-600 text-center">
              You need to be signed in to view your notifications.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const unreadCount = allNotification.filter(
    (n) => !readNotifications.has(n.notification_id)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-gray-600">
                  Stay updated with your latest activities
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {unreadCount} unread
              </Badge>
            )}
          </div>

          {allNotification.length > 0 && unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              size="sm"
              className="bg-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <NotificationSkeleton />
        ) : allNotification.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {allNotification.map((notify) => {
              const isRead = readNotifications.has(notify.notification_id);
              return (
                <Card
                  key={notify.notification_id}
                  className={`transition-all duration-200 hover:shadow-md ${
                    isRead ? "bg-white" : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {notify.sender_username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2">
                              <span className="font-semibold text-gray-900">
                                {notify.sender_username}
                              </span>
                              <span className="text-gray-700 ml-1">
                                liked your tweet
                              </span>
                            </div>
                            <div className="bg-gray-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                              <p className="text-gray-800 text-sm italic">
                                &ldquo;{notify.notification_text}&ldquo;
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notify.notification_id)}
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              disabled={isRead}
                            >
                              <Check
                                className={`h-4 w-4 ${isRead ? "text-green-600" : "text-gray-400"}`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                deleteNotification(notify.notification_id)
                              }
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="p-4 bg-gray-100 rounded-full mb-4">
          <Bell className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No notifications yet
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          When you receive notifications, they will appear here. Stay tuned for
          updates!
        </p>
      </CardContent>
    </Card>
  );
}
