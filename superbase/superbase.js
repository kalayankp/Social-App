import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dnJrbXZkYmh4aXZteWtzaGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2NjYxNTEsImV4cCI6MTk5MzI0MjE1MX0.WB_GvyWcmhypSRBAn4b-CFyYYFEE4I4HLSFFB9wacLE';
url = 'https://hvvrkmvdbhxivmykshhi.supabase.co';

export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
