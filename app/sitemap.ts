import { MetadataRoute } from 'next';
import { getAllProducts } from './lib/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use env var for base URL or fallback
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://chickenpay-dev.up.railway.app/';

  const products = await getAllProducts();

  // Create sitemap entries for dynamic products (by category)
  // We use Set to avoid duplicates if multiple products share the same category slug in URL
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  const productEntries: MetadataRoute.Sitemap = uniqueCategories.map((category) => ({
    url: `${baseUrl}/product/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/topup`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    ...productEntries,
  ];
}
