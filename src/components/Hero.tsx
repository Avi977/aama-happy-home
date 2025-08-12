import { Button } from "@/components/ui/button";
import heroImage from "@/assets/daycare-hero.jpg";

const Hero = () => {
  console.log("Hero component rendering");
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Happy children playing at Aama Daycare" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/70"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-secondary">Aama</span> Daycare
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto">
          Where every child is cherished, nurtured, and inspired to grow in a safe, loving environment
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Schedule a Visit
          </Button>
          <Button variant="warm" size="lg" className="text-lg px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;