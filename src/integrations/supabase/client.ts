// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://eockoxvsesnuystnljdq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvY2tveHZzZXNudXlzdG5samRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MTgzNTEsImV4cCI6MjA1NzM5NDM1MX0.mRzTiJKj1NA8PqlF2lJiVTxT_kAYWZCN8OppTjHMmrg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);