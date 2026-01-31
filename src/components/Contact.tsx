import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Calendar, Send } from "lucide-react";
import { useAuth } from "@/hooks/auth-context";
import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { user, setUser, logout } = useAuth();
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct mailto link
    const subject = encodeURIComponent(`New Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Child's Age: ${formData.childAge}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:aamadaycare@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const decoded = credentialResponse.credential ? JSON.parse(atob(credentialResponse.credential.split('.')[1])) : null;
    setUser(decoded);
  };

  return (
    <main>
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white" id="contact-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
              Start Your Journey With Us
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We have limited spots available! Contact us today to check availability and schedule a tour.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Contact Details & Map */}
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="border-none shadow-md bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                      <Phone className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Call Us</h3>
                    <p className="text-slate-500 mb-4 text-sm">Mon-Fri from 8am to 5pm</p>
                    <a href="tel:5107783220" className="w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">Call Now</Button>
                    </a>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Email Us</h3>
                    <p className="text-slate-500 mb-4 text-sm">We'll respond within 24h</p>
                    <a href="mailto:aamadaycare@gmail.com" className="w-full">
                      <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 font-bold">Email Me</Button>
                    </a>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-md overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className="p-6 pb-0">
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-primary" />
                      Visit Us
                    </h3>
                    <p className="text-slate-600 mb-4">737 Birdwood Ct, San Ramon, CA 94582</p>
                  </div>
                  <div className="h-64 w-full bg-slate-100">
                    <iframe
                      title="Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.964964073839!2d-121.9451546846926!3d37.76437097975937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fd7e2e2e2e2e2%3A0x1234567890abcdef!2s737%20Birdwood%20Ct%2C%20San%20Ramon%2C%20CA%2094582!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Inquiry Form */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>

              <h3 className="text-2xl font-black text-slate-900 mb-2">Send an Inquiry</h3>
              <p className="text-slate-500 mb-8">Fill out the form below and we'll get back to you to schedule your visit.</p>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name" name="name" placeholder="Jane Doe" required
                      value={formData.name} onChange={handleInputChange}
                      className="bg-slate-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone" name="phone" type="tel" placeholder="(555) 000-0000" required
                      value={formData.phone} onChange={handleInputChange}
                      className="bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email" name="email" type="email" placeholder="jane@example.com" required
                      value={formData.email} onChange={handleInputChange}
                      className="bg-slate-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childAge">Child's Age</Label>
                    <Input
                      id="childAge" name="childAge" placeholder="e.g. 2 years old" required
                      value={formData.childAge} onChange={handleInputChange}
                      className="bg-slate-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message / Questions</Label>
                  <Textarea
                    id="message" name="message" placeholder="Tell us about your childcare needs..."
                    className="bg-slate-50 min-h-[120px]"
                    value={formData.message} onChange={handleInputChange}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  <Send className="w-5 h-5 mr-2" />
                  Send Inquiry
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500 mb-4">Or schedule a meeting directly:</p>
                <Button variant="outline" className="gap-2 border-slate-200 hover:bg-slate-50">
                  <Calendar className="w-4 h-4" />
                  Schedule a Meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;