export interface Profile {
  created_at: Date;
  id: string;
  username: string;
  bio: string;
  full_name: string;
}

export interface Tweet {
  created_at: Date;
  id: string;
  image_url: string;
  like_count: number;
  profile_id: string;
  reply_count: number;
  text: string;
  updated_at: Date;
}

export interface FullProfile {
  created_at: Date;
  id: string;
  username: string;
  bio: string;
  full_name: string;
  tweets_with_counts: Tweet[];
}
