import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import PhotoGallery from "@/components/PhotoGallery";
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
        <PhotoGallery />
        <Contact />
      </main>
      {/* Footer is added in index.html for global SEO NAP */}
    </>
  );
};

export default Index;
