import { useState, useEffect, useCallback } from 'react';

export interface GithubUser {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
  bio: string;
  html_url: string;
}

export interface GithubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    issue?: {
      title: string;
      number: number;
    };
    pull_request?: {
      title: string;
      number: number;
    };
  };
  created_at: string;
}

interface GithubData {
  user: GithubUser | null;
  events: GithubEvent[];
  loading: boolean;
  error: string | null;
}

const CACHE_KEY = 'portfolio_github_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function useGithub(username: string) {
  const [data, setData] = useState<GithubData>({
    user: null,
    events: [],
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async (force = false) => {
    if (!username) return;

    // Check cache
    if (!force) {
      const cached = localStorage.getItem(`${CACHE_KEY}_${username}`);
      if (cached) {
        const { timestamp, data: cachedData } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setData({
            ...cachedData,
            loading: false,
            error: null,
          });
          return;
        }
      }
    }

    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
      const [userRes, eventsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/events/public`)
      ]);

      if (!userRes.ok) throw new Error(`User not found: ${userRes.statusText}`);
      if (!eventsRes.ok) throw new Error(`Events not found: ${eventsRes.statusText}`);

      const user = await userRes.json();
      const events = await eventsRes.json();

      const newData = {
        user,
        events: events.slice(0, 10), // Only keep recent 10 events
      };

      // Update cache
      localStorage.setItem(`${CACHE_KEY}_${username}`, JSON.stringify({
        timestamp: Date.now(),
        data: newData
      }));

      setData({
        ...newData,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      console.error('GitHub API Error:', err);
      setData(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.message || 'Failed to fetch GitHub data' 
      }));
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, refresh: () => fetchData(true) };
}
