import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "about/", "services/", "standards/", "team/", "careers/", "suppliers/", "partners/", "contact/", "privacy/"].map((p) => ({
    url: `${site.url}/${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
