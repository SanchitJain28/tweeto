--Followers table

create table public.followers (
  id uuid not null default gen_random_uuid (),
  following uuid not null,
  followed_by uuid not null,
  timestamp timestamp with time zone null default now(),
  constraint followers_pkey primary key (id),
  constraint unique_follower_pair unique (following, followed_by),
  constraint followers_followed_by_fkey foreign KEY (followed_by) references profiles (id) on delete CASCADE,
  constraint followers_following_fkey foreign KEY (following) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;

--NOtification table 

create table public.notifications (
  id uuid not null default gen_random_uuid (),
  recipient_id uuid not null,
  sender_id uuid not null,
  tweet_id uuid null,
  type text not null,
  is_read boolean null default false,
  created_at timestamp without time zone null default now(),
  constraint notifications_pkey primary key (id),
  constraint notifications_recipient_id_fkey foreign KEY (recipient_id) references profiles (id) on delete CASCADE,
  constraint notifications_sender_id_fkey foreign KEY (sender_id) references profiles (id) on delete CASCADE,
  constraint notifications_tweet_id_fkey foreign KEY (tweet_id) references tweets (id) on delete CASCADE,
  constraint notifications_type_check check (
    (type = any (array['like'::text, 'comment'::text]))
  )
) TABLESPACE pg_default;


--profiles tables 
create table public.profiles (
  id uuid not null,
  created_at timestamp with time zone not null default now(),
  username text not null,
  full_name text null,
  dob date null,
  bio text null,
  constraint profiles_pkey primary key (id),
  constraint profiles_username_key unique (username),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id)
) TABLESPACE pg_default;


--saved tweets
create table public.saved_tweets (
  id uuid not null default gen_random_uuid (),
  tweet_id uuid not null,
  profile_id uuid not null,
  created_at timestamp with time zone null default now(),
  constraint saved_tweets_pkey primary key (id),
  constraint saved_tweets_profile_id_tweet_id_key unique (profile_id, tweet_id),
  constraint saved_tweets_profile_id_fkey foreign KEY (profile_id) references profiles (id) on delete CASCADE,
  constraint saved_tweets_tweet_id_fkey foreign KEY (tweet_id) references tweets (id) on delete CASCADE
) TABLESPACE pg_default;

--tweets likes 
create table public.tweet_likes (
  id uuid not null default gen_random_uuid (),
  tweet_id uuid not null,
  profile_id uuid not null,
  created_at timestamp with time zone null default now(),
  constraint tweet_likes_pkey primary key (id),
  constraint tweet_likes_tweet_id_profile_id_key unique (tweet_id, profile_id),
  constraint tweet_likes_profile_id_fkey foreign KEY (profile_id) references profiles (id) on delete CASCADE,
  constraint tweet_likes_tweet_id_fkey foreign KEY (tweet_id) references tweets (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_tweet_likes_tweet_id on public.tweet_likes using btree (tweet_id) TABLESPACE pg_default;

create index IF not exists idx_tweet_likes_profile_id on public.tweet_likes using btree (profile_id) TABLESPACE pg_default;

create trigger notify_on_like
after INSERT on tweet_likes for EACH row
execute FUNCTION handle_new_like ();

--tweet replies

create table public.tweet_replies (
  id uuid not null default gen_random_uuid (),
  tweet_id uuid not null,
  profile_id uuid not null,
  text text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint tweet_replies_pkey primary key (id),
  constraint tweet_replies_profile_id_fkey foreign KEY (profile_id) references profiles (id) on delete CASCADE,
  constraint tweet_replies_tweet_id_fkey foreign KEY (tweet_id) references tweets (id) on delete CASCADE,
  constraint tweet_replies_text_check check ((char_length(text) <= 280))
) TABLESPACE pg_default;

create index IF not exists idx_tweet_replies_tweet_id on public.tweet_replies using btree (tweet_id) TABLESPACE pg_default;

create index IF not exists idx_tweet_replies_profile_id on public.tweet_replies using btree (profile_id) TABLESPACE pg_default;

--view of tweets with counts 
create view public.tweet_with_likes_and_comments as
select
  t.id,
  t.profile_id,
  t.image_url,
  t.text,
  t.created_at,
  t.updated_at,
  COALESCE(like_counts.like_count, 0::bigint) as like_count
from
  tweets t
  left join (
    select
      tweet_likes.tweet_id,
      count(*) as like_count
    from
      tweet_likes
    group by
      tweet_likes.tweet_id
  ) like_counts on t.id = like_counts.tweet_id;

  --tweets table 
  create table public.tweets (
  id uuid not null default gen_random_uuid (),
  profile_id uuid not null,
  image_url text null,
  text text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  tags text[] null,
  constraint tweets_pkey primary key (id),
  constraint tweets_profile_id_fkey foreign KEY (profile_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_tweets_profile_id on public.tweets using btree (profile_id) TABLESPACE pg_default;

create index IF not exists idx_tweets_created_at on public.tweets using btree (created_at desc) TABLESPACE pg_default;