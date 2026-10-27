import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Monolith Technologies Limited',
    short_name: 'Monolith',
    description: 'Software, cloud and cybersecurity engineering.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07070b',
    theme_color: '#07070b',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
