import { ImageResponse } from 'next/og';

export const alt = 'Monolith Technologies Limited | Software, Cloud & Cybersecurity';
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
          <svg width="56" height="56" viewBox="2 2 28 28">
            <defs>
              <linearGradient id="l" x1="4" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C4C6FF" />
                <stop offset="1" stopColor="#7C7FFF" />
              </linearGradient>
              <linearGradient id="r" x1="28" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#312E81" />
              </linearGradient>
            </defs>
            <path fill="url(#l)" d="M4 4h6.2l5.3 9.6V25L10.3 16v12H4z" />
            <path fill="url(#r)" d="M28 4h-6.2l-5.3 9.6V25l5.2-9v12H28z" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>Monolith</div>
            <div style={{ fontSize: 17, letterSpacing: 5, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>TECHNOLOGIES LIMITED</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -4, lineHeight: 1.02 }}>
            Software built to stand the test of time.
          </div>
          <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.6)' }}>
            Software &middot; Cloud &middot; Cybersecurity
          </div>
        </div>
      </div>
    ),
    size
  );
}
