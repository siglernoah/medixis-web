/** @type {import('next').NextConfig} */
// BASE_PATH is set only when building for GitHub Pages (served from /medixis-web/).
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default nextConfig;
