import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Contact from "@/components/Contact";

const Index = () => {
  console.log("Index page rendering");
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Programs />
      <Contact />
    </div>
  );
};

export default Index;
