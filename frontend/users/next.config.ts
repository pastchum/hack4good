import type { NextConfig } from "next";

require('dotenv').config({ path: '../.env' });

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  }
};

export default nextConfig;
