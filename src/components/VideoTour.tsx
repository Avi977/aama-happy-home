import { PlayCircle } from "lucide-react";

// TODO: Replace with the real tour video.
//   Option A (YouTube): set VIDEO_URL to the embed URL, e.g.
//     "https://www.youtube.com/embed/XXXXXXXXXXX"
//   Option B (self-hosted): drop an mp4 in public/ and set VIDEO_URL to "/tour.mp4",
//     then switch the <iframe> below for the <video> block (commented out).
const VIDEO_URL = "";

const VideoTour = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden" id="video-tour-section">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6 uppercase tracking-wider">
            Step Inside
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
            Take a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-secondary">Virtual Tour</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            See our warm, home-like rooms, the outdoor play space, and a typical day at Aama Daycare — all from the comfort of your home.
          </p>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white bg-slate-100">
          {VIDEO_URL ? (
            <iframe
              src={VIDEO_URL}
              title="Aama Daycare virtual tour"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* Placeholder shown until a real video URL is added above. */
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-slate-400">
              <PlayCircle className="w-20 h-20" />
              <p className="text-lg font-bold">Tour video coming soon</p>
            </div>
          )}

          {/*
          // Self-hosted alternative — uncomment and remove the <iframe> above:
          <video className="w-full h-full object-cover" controls poster="/og-image.jpg">
            <source src={VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          */}
        </div>
      </div>
    </section>
  );
};

export default VideoTour;
