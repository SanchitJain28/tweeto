export interface Profile {
  created_at: Date;
  id: string;
  username: string;
  bio: string;
  full_name: string;
}

export interface Comment {
  user_id: string;
  text: string;
  created_at: Date;
}

export interface Tweet {
  user_name: string;
  created_at: Date;
  id: string;
  image_url: string;
  like_count: number;
  profile_id: string;
  reply_count: number;
  text: string;
  updated_at: Date;
  liked_by_current_user: boolean;
  comments: Comment[];
}

export interface FullProfile {
  following_count:number
  followers_count:number
  created_at: Date;
  id: string;
  username: string;
  bio: string;
  full_name: string;
  tweets_with_counts: Tweet[];
}

export interface Notification {
  id: string;
  recipient_id: string;
  sender_id: string;
  tweet_id: string;
  type: "like" | "comment";
  is_read: boolean;
  created_at: string;
}

export interface NotificationView {
  tweet_id:string
  notification_id: string
  recipient_id: string
  sender_id: string
  sender_username: string
  notification_text: string
}

export interface TweetOptions {
  text: string;
  tone:
    | "humorous"
    | "inspirational"
    | "trendy"
    | "professional"
    | "casual"
    | "informative";
  tags: string[];
}
