import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next News",
    short_name: "NextNews",
    description:
      "Next News delivers the latest breaking news, trending stories, and in-depth articles from around the world.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#181817",
    icons: [
      {
        src: "/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
