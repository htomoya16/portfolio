import type { NextConfig } from "next";

/**
 * ビルドした日（日本時間）を `YYYY.MM.DD` で埋め込む。フッターの `ver.` 表示に使う。
 * next.config はビルド時に一度だけ評価されるので、ページの再生成では変わらない。
 * Vercel のビルド環境は UTC なので、タイムゾーンを明示しないと日付が 1 日ずれる。
 */
const buildDate = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})
  .format(new Date())
  .replaceAll("/", ".");

const nextConfig: NextConfig = {
  env: {
    BUILD_DATE: buildDate,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "protopedia.net",
      },
    ],
  },
};

export default nextConfig;
