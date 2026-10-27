import { ImageResponse } from 'next/og';

export const alt = 'Monolith | Software, Cloud & Cybersecurity Engineering';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          color: '#fff',
          background:
            'radial-gradient(60% 70% at 50% 0%, rgba(99,102,241,0.55), #07070b 70%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="g" x1="4" y1="0" x2="28" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8B8DFF" />
                <stop offset="1" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
            <path
              fillRule="evenodd"
              fill="url(#g)"
              d="M8 0h16a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8Zm1.5 23V9h3.4l3.1 5.4L19.1 9h3.4v14h-3.2v-8.2l-2.1 3.7h-2.4l-2.1-3.7V23H9.5Z"
            />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -2 }}>monolith</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -4, lineHeight: 1.02 }}>
            Software built to stand the test of time.
          </div>
          <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.6)' }}>
            Software &middot; Cloud &middot; Cybersecurity &middot; Monolith Technologies Limited
          </div>
        </div>
      </div>
    ),
    size
  );
}
