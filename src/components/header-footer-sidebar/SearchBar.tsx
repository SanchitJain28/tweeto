"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, User, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Profile {
  created_at: Date;
  id: string;
  username: string;
  bio: string;
  full_name: string;
}

interface SearchResult {
  searchedUsers: Profile[];
  searchedTweetsCategory: SearchedTweet[];
}

interface SearchBarProps {
  onUserSelect?: (user: Profile) => void;
  onTweetSelect?: (tweet: SearchedTweet) => void;
  placeholder?: string;
  maxResults?: number;
}

interface SearchedTweet {
  created_at: string;
  id: string;
  profiles: Profile;
  tags: string;
  text: string;
}

export default function SearchBar({
  onUserSelect,
  onTweetSelect,
  placeholder = "Search users and tweets...",
  maxResults = 5,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tweetResults, setTweetResults] = useState<SearchedTweet[]>([]);

  const debouncedSearchTerm = useDebounce(searchQuery, 300);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setTweetResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data }: { data: SearchResult } = await axios.post(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      console.log(data);
      setResults(data.searchedUsers || []);
      setTweetResults(data.searchedTweetsCategory || []);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to search. Please try again.");
      toast.error("Error occurred while searching");
      setResults([]);
      setTweetResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (user: Profile) => {
    onUserSelect?.(user);
    setSearchQuery(user.full_name || user.username);
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setTweetResults([]);
    setShowResults(false);
    setError(null);
  };

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-search-container]")) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const formatTweetDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative w-full max-w-md" data-search-container>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowResults(true);
          }}
          className="pl-10 pr-10"
          aria-label="Search users"
          aria-expanded={showResults}
          aria-haspopup="listbox"
          role="combobox"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchQuery.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-hidden">
          <CardContent className="p-0">
            {error ? (
              <div className="p-4 text-center text-destructive">
                <p>{error}</p>
              </div>
            ) : (
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
                  <TabsTrigger value="users" className="rounded-none">
                    Users ({results.length})
                  </TabsTrigger>
                  <TabsTrigger value="tweets" className="rounded-none">
                    Tweets ({tweetResults.length})
                  </TabsTrigger>
                </TabsList>

                <div className="max-h-80 overflow-y-auto">
                  <TabsContent value="users" className="mt-0">
                    {results.length > 0 ? (
                      <ul role="listbox" className="divide-y">
                        {results.slice(0, maxResults).map((user) => (
                          <li key={user.id}>
                            <button
                              onClick={() => handleUserSelect(user)}
                              className="w-full p-3 text-left hover:bg-muted/50 focus:bg-muted/50 focus:outline-none transition-colors"
                              role="option"
                              aria-selected="false"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={`/placeholder.svg?height=40&width=40`}
                                    alt={user.full_name}
                                  />
                                  <AvatarFallback>
                                    {getInitials(
                                      user.full_name || user.username
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm">
                                    {highlightMatch(
                                      user.full_name || user.username,
                                      searchQuery
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    @
                                    {highlightMatch(user.username, searchQuery)}
                                  </div>
                                  {user.bio && (
                                    <div className="text-xs text-muted-foreground mt-1 truncate">
                                      {user.bio}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          </li>
                        ))}
                        {results.length > maxResults && (
                          <li className="p-3 text-center text-sm text-muted-foreground">
                            Showing {maxResults} of {results.length} results
                          </li>
                        )}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No users found</p>
                        <p className="text-xs">Try a different search term</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="tweets" className="mt-0">
                    {tweetResults.length > 0 ? (
                      <ul role="listbox" className="divide-y">
                        {tweetResults.slice(0, maxResults).map((tweet) => (
                          <li key={tweet.id}>
                            <button
                              onClick={() => {
                                onTweetSelect?.(tweet);
                                setShowResults(false);
                              }}
                              className="w-full p-3 text-left hover:bg-muted/50 focus:bg-muted/50 focus:outline-none transition-colors"
                              role="option"
                              aria-selected="false"
                            >
                              <div className="flex gap-3">
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                  <AvatarImage
                                    src={`/placeholder.svg?height=32&width=32`}
                                    alt={tweet.profiles.full_name}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {getInitials(
                                      tweet.profiles.full_name ||
                                        tweet.profiles.username
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm truncate">
                                      {tweet.profiles.full_name ||
                                        tweet.profiles.username}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      @{tweet.profiles.username}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      · {formatTweetDate(tweet.created_at)}
                                    </span>
                                  </div>
                                  <div className="text-sm text-foreground mb-2">
                                    {highlightMatch(tweet.text, searchQuery)}
                                  </div>
                                  {/* {tweet.tags && (
                                    <div className="flex flex-wrap gap-1">
                                      {tweet.tags
                                        .split(",")
                                        .map((tag, index) => (
                                          <span
                                            key={index}
                                            className="text-xs bg-muted px-2 py-0.5 rounded-full"
                                          >
                                            #{tag.trim()}
                                          </span>
                                        ))}
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </button>
                          </li>
                        ))}
                        {tweetResults.length > maxResults && (
                          <li className="p-3 text-center text-sm text-muted-foreground">
                            Showing {maxResults} of {tweetResults.length}{" "}
                            results
                          </li>
                        )}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No tweets found</p>
                        <p className="text-xs">Try a different search term</p>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
