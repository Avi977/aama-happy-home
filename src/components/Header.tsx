import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth-context';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, User as UserIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const { user, setUser, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about-section' }, // Using hash anchors for flexibility
    { name: 'Programs', path: '/#programs-section' },
    { name: 'Contact', path: '/#contact-section' },
  ];

  const handleGoogleSuccess = (credentialResponse: any) => {
    const decoded = credentialResponse.credential ? JSON.parse(atob(credentialResponse.credential.split('.')[1])) : null;
    setUser(decoded);
  };

  const scrollToSection = (path: string) => {
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className={cn(
            "text-2xl font-black tracking-tighter transition-colors",
            isScrolled ? "text-slate-500" : "text-slate-500 drop-shadow-md"
          )}>
            Aama<span className="text-secondary">Daycare</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.path)}
              className={cn(
                "text-sm font-bold uppercase tracking-wider transition-colors hover:text-secondary cursor-pointer",
                isScrolled ? "text-slate-900" : "text-slate-900 drop-shadow-sm font-black"
              )}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-300">
              <div className="flex flex-col items-end">
                <span className={cn("text-xs font-bold", isScrolled ? "text-slate-900" : "text-slate-900")}>
                  {user.name}
                </span>
                <button onClick={logout} className="text-[10px] uppercase tracking-wider underline hover:text-secondary transition-colors text-slate-600">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Button
                variant={isScrolled ? "outline" : "outline"}
                size="sm"
                className="gap-2 font-bold"
                onClick={() => setShowLoginDialog(true)}
              >
                <UserIcon className="w-4 h-4" />
                Login
              </Button>

              {/* Hidden Google Login - shown in dialog */}
              {showLoginDialog && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6" onClick={() => setShowLoginDialog(false)}>
                  <div className="p-8 bg-white rounded-[2rem] shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setShowLoginDialog(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900">Parent Portal Login</h3>
                    <p className="text-slate-600 mb-6">Sign in with your Google account to access the parent portal.</p>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => console.log('Login Failed')}
                      width="100%"
                    />
                  </div>
                </div>
              )}
            </>
          )}
          <a href="tel:5107783220">
            <Button variant={isScrolled ? "default" : "secondary"} size="sm" className="gap-2 font-bold shadow-lg">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">Call Now</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <a href="tel:5107783220" className="md:hidden">
            <div className="p-2 bg-primary text-white rounded-full shadow-lg">
              <Phone className="w-4 h-4" />
            </div>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn("p-2", isScrolled ? "text-slate-900" : "text-slate-900")}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8 drop-shadow-md" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                scrollToSection(link.path);
                setMobileMenuOpen(false);
              }}
              className="text-lg font-bold text-slate-700 py-2 border-b border-slate-50 text-left"
            >
              {link.name}
            </button>
          ))}

          <div className="pt-4 flex flex-col gap-4">
            {!user ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm text-slate-500 font-medium">Parent Portal Login</span>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log('Login Failed')}
                  width="100%"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="text-destructive">
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
