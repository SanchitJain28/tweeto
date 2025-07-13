CREATE OR REPLACE FUNCTION get_saved_tweets(user_id UUID)
RETURNS TABLE (
  id UUID,
  profile_id UUID,
  image_url TEXT,
  text TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  tags TEXT[],
  like_count BIGINT,
  is_liked_by_current_user BOOLEAN,
  saved_at TIMESTAMPTZ
) 
LANGUAGE SQL
AS $$
  SELECT 
    t.id,
    t.profile_id,
    t.image_url,
    t.text,
    t.created_at,
    t.updated_at,
    t.tags,
    COALESCE(lc.like_count, 0) as like_count,
    COALESCE(ul.is_liked, false) as is_liked_by_current_user,
    st.created_at as saved_at
  FROM saved_tweets st
  JOIN tweets t ON st.tweet_id = t.id
  LEFT JOIN (
    SELECT tweet_id, COUNT(*) as like_count
    FROM tweet_likes
    GROUP BY tweet_id
  ) lc ON t.id = lc.tweet_id
  LEFT JOIN (
    SELECT tweet_id, true as is_liked
    FROM tweet_likes
    WHERE profile_id = user_id
  ) ul ON t.id = ul.tweet_id
  WHERE st.profile_id = user_id
  ORDER BY st.created_at DESC;
$$;