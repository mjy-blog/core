import { MetadataRoute } from 'next';

import { data } from '../lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.BASE_URL!,
      lastModified: new Date(),
    },
    ...data.map(({ slug, attributes: { updateTime } }) => ({
      url: `${process.env.BASE_URL}/posts/${slug}`,
      lastModified: updateTime,
    })),
  ];
}
