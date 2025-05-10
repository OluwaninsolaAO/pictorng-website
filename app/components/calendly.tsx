'use client';

import { useEffect } from 'react';

export default function CalendlyBooking() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget min-w-[320px] h-[800px] md:h-[650px]"
      data-url="https://calendly.com/pictor-info?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=101828&text_color=62748e"
    ></div>
  );
}
