import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vkxlcowblrveznxsradv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZreGxjb3dibHJ2ZXpueHNyYWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMjA5NDAsImV4cCI6MjA1ODg5Njk0MH0.MEI4Bl7Ph_b1xJWkD5-Gq1zPEE9tx9pkwJahl3756J0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
