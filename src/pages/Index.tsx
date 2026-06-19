import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Pricing from "@/components/Pricing";
import PhotoGallery from "@/components/PhotoGallery";
import VideoTour from "@/components/VideoTour";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="min-h-screen">
        <Hero />
        <About />
        <Programs />
        <Pricing />
        <PhotoGallery />
        <VideoTour />
        <Contact />
      </main>
      {/* Footer is added in index.html for global SEO NAP */}
    </>
  );
};

export default Index;
