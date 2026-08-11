import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.29.160"],
  ...(process.env.PORT && process.env.PORT !== "3000"
    ? { distDir: `.next-${process.env.PORT}` }
    : {}),
};

export default nextConfig;
