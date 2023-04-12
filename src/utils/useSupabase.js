import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function useSupabase() {
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dnJrbXZkYmh4aXZteWtzaGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2NjYxNTEsImV4cCI6MTk5MzI0MjE1MX0.WB_GvyWcmhypSRBAn4b-CFyYYFEE4I4HLSFFB9wacLE';
  const url = 'https://hvvrkmvdbhxivmykshhi.supabase.co';

  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const supaObj = createClient(url, key, {
      // Supabase real-time settings (optional)
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });

    setSupabase(supaObj);
  }, [key, url]); // Depend on key and url to avoid unnecessary re-renders

  return supabase;
}
