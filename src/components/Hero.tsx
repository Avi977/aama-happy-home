import { Button } from "@/components/ui/button";
import heroImage from "@/assets/daycare-hero.jpg";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/hooks/auth-context';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  backToHomeButton?: boolean;
}

const Hero: React.FC<HeroProps> = ({ backToHomeButton }) => {
  const { user, setUser } = useAuth();
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);

  const handleScheduleClick = () => {
    if (!user) {
      setShowGoogleLogin(true);
    } else {
      const phone = '5107783220';
      const text = encodeURIComponent('I am interested to visit and see your place for enrollment');
      window.location.href = `sms:${phone}?&body=${text}`;
    }
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const decoded = credentialResponse.credential ? JSON.parse(atob(credentialResponse.credential.split('.')[1])) : null;
    setUser(decoded);
    setShowGoogleLogin(false);
  };

  const handleLearnMoreClick = () => {
    const programsSection = document.getElementById('programs-section');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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
        {backToHomeButton && (
          <Link
            to="/"
            className="inline-flex items-center mb-8 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors font-semibold"
          >
            ← Back to Home
          </Link>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6" onClick={handleScheduleClick}>
            Schedule a Visit
          </Button>
          <Button variant="warm" size="lg" className="text-lg px-8 py-6" onClick={handleLearnMoreClick}>
            Learn More
          </Button>
        </div>
        {/* Show GoogleLogin button if needed */}
        {showGoogleLogin && !user && (
          <div className="flex flex-col items-center gap-2 mt-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                alert('Login Failed');
              }}
              useOneTap={false}
            />
            <div className="text-muted-foreground text-sm bg-white/80 text-black px-4 py-2 rounded shadow">Please log in with Google to schedule your visit.</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;