/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function useSupabase() {
  key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dnJrbXZkYmh4aXZteWtzaGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2NjYxNTEsImV4cCI6MTk5MzI0MjE1MX0.WB_GvyWcmhypSRBAn4b-CFyYYFEE4I4HLSFFB9wacLE';
url = 'https://hvvrkmvdbhxivmykshhi.supabase.co';

  const [supabase, setSupa] = useState(null);
  useEffect(() => {
    const updateClient = supaObj => {
      if (supabase === null) {
        setSupa(supaObj);
      }
    };

    const obj = createClient(url, key, {

      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
    updateClient(obj);
  });

  return supabase;
}