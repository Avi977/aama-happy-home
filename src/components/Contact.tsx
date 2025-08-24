import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useAuth } from "@/hooks/auth-context";
import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { user, setUser, logout } = useAuth();
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [showGoogleLoginFor, setShowGoogleLoginFor] = useState<string | null>(null);
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "(510) 778-3220",
      action: "Call Us"
    },
    {
      icon: Mail,
      title: "Email", 
      details: "aamadaycare@gmail.com",
      action: "Send Email"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "737 Birdwood Ct, San Ramon, CA, 94582",
      action: "Get Directions"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 7:30 AM - 6:00 PM, Sat-Sun: Closed",
      action: "View Schedule"
    }
  ];

  const handleBookTourClick = () => {
    if (!user) {
      setShowGoogleLogin(true);
    } else {
      const phone = '5107783220';
      const text = encodeURIComponent('I would like to book a tour in your daycare. Please let me know the available slots.');
      window.location.href = `sms:${phone}?&body=${text}`;
    }
  };

  // Handler for Send Email
  const handleSendEmailClick = () => {
    if (!user) {
      setShowGoogleLoginFor('sendEmail');
    } else {
      const subject = encodeURIComponent('Aama Daycare Inquiry');
      const body = encodeURIComponent(`Hello,\n\nI would like to get more information about your daycare.\n\nSent from: ${user.email}`);
      window.location.href = `mailto:aamadaycare@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  // Handler for Request Information
  const handleRequestInfoClick = () => {
    if (!user) {
      setShowGoogleLoginFor('requestInfo');
    } else {
      const subject = encodeURIComponent('Request for Information - Aama Daycare');
      const body = encodeURIComponent(`Hello,\n\nI am interested in learning more about your daycare programs.\n\nSent from: ${user.email}`);
      window.location.href = `mailto:aamadaycare@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const decoded = credentialResponse.credential ? JSON.parse(atob(credentialResponse.credential.split('.')[1])) : null;
    setUser(decoded);
    setShowGoogleLoginFor(null);
  };

  return (
    <main>
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background" id="contact-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to give your child the best start? Contact us today to schedule a visit and see 
              why families choose Aama Daycare for their little ones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{info.details}</p>
                  {info.title === "Phone" ? (
                    <a href={`tel:${info.details.replace(/[^\d+]/g, "")}`} className="w-full block">
                      <Button variant="outline" size="sm" className="w-full">
                        {info.action}
                      </Button>
                    </a>
                  ) : info.title === "Email" ? (
                    <>
                      <Button variant="outline" size="sm" className="w-full" onClick={handleSendEmailClick}>
                        {info.action}
                      </Button>
                      {showGoogleLoginFor === 'sendEmail' && !user && (
                        <div className="flex flex-col items-center gap-2 mt-2">
                          <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                              alert('Login Failed');
                            }}
                            useOneTap={false}
                          />
                          <div className="text-muted-foreground text-sm bg-white/80 text-black px-4 py-2 rounded shadow">Please log in with Google to send an email.</div>
                        </div>
                      )}
                    </>
                  ) : info.title === "Location" ? (
                    <a href="https://www.google.com/maps/dir/?api=1&destination=737+Birdwood+Ct,+San+Ramon,+CA,+94582" target="_blank" rel="noopener noreferrer" className="w-full block">
                      <Button variant="outline" size="sm" className="w-full">
                        {info.action}
                      </Button>
                    </a>
                  ) : info.title === "Hours" ? (
                    <Link to="/schedule#daily-schedule" className="w-full block">
                      <Button variant="outline" size="sm" className="w-full">
                        {info.action}
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full">
                      {info.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center mt-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Schedule Your Visit Today
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Come see our facilities, meet our caring staff, and discover why Aama Daycare 
              is the perfect place for your child to learn, grow, and thrive.
            </p>
            {user ? (
              <>
                <div className="mb-4 text-foreground">Welcome, {user.name || user.email} <button className="ml-2 underline text-sm" onClick={logout}>Logout</button></div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" className="text-lg px-8" onClick={handleBookTourClick}>
                    Book a Tour
                  </Button>
                  <Button variant="warm" size="lg" className="text-lg px-8" onClick={handleRequestInfoClick}>
                    Request Information
                  </Button>
                  {showGoogleLoginFor === 'requestInfo' && !user && (
                    <div className="flex flex-col items-center gap-2 mt-2">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                          alert('Login Failed');
                        }}
                        useOneTap={false}
                      />
                      <div className="text-muted-foreground text-sm bg-white/80 text-black px-4 py-2 rounded shadow">Please log in with Google to request information.</div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Button variant="hero" size="lg" className="text-lg px-8" onClick={handleBookTourClick}>
                  Book a Tour
                </Button>
                {showGoogleLogin && (
                  <div className="flex flex-col items-center gap-2 mt-4">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => {
                        alert('Login Failed');
                      }}
                      useOneTap={false}
                    />
                    <div className="text-muted-foreground text-sm bg-white/80 text-black px-4 py-2 rounded shadow">Please log in with Google to book a tour.</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;