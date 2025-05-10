import Button from '@/components/mods/button';

export default function Home() {
  return (
    <div className="min-h-dvh">
      <div className="max-w-[1400px] mx-auto">
        <div className="m-5 rounded-4xl px-8 py-18 bg-gray-900 space-y-6">
          <div className="text-center text-balance space-y-4">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl break-words hyphens-auto bg-gradient-to-br from-red-200 via-slate-100 to-blue-400 text-transparent bg-clip-text"
              lang="de"
            >
              Digital Brilliance for Visionary Enterprises
            </h1>
            <p className="text-lg">
              Empowering ambitious brands with precision-engineered software,
              expert-driven project execution, and a handpicked network of
              top-tier talents.
            </p>
          </div>
          <div className="flex flex-wrap justify-center  gap-4 md:gap-8">
            <Button>Contact Us</Button>
            <Button>Book A Meeting</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
