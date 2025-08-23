import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Contact from "@/components/Contact";
import Header from "@/components/Header";

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
        <Contact />
      </main>
      {/* Footer is added in index.html for global SEO NAP */}
    </>
  );
};

export default Index;
