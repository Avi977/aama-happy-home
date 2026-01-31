import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, Facebook, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand & Description */}
                    <div>
                        <Link to="/" className="inline-block mb-6">
                            <span className="text-3xl font-black tracking-tighter text-white">
                                Aama<span className="text-secondary">Daycare</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            A loving, safe, and nurturing environment where your child can grow, learn, and play. State-licensed and proudly woman-owned.
                        </p>

                        {/* Woman Owned Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full">
                            <Heart className="w-4 h-4 text-pink-500 fill-current animate-pulse" />
                            <span className="text-sm font-bold text-pink-400 uppercase tracking-wide">
                                Woman Owned Business
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/#about-section" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/#programs-section" className="hover:text-white transition-colors">Our Programs</Link></li>
                            <li><Link to="/schedule" className="hover:text-white transition-colors">Daily Schedule</Link></li>
                            <li><Link to="/#contact-section" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                                <span>737 Birdwood Ct,<br />San Ramon, CA 94582</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <a href="tel:5107783220" className="hover:text-white transition-colors">(510) 778-3220</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:aamadaycare@gmail.com" className="hover:text-white transition-colors">aamadaycare@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Call to Action */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Schedule a Visit</h4>
                        <p className="text-slate-400 mb-6 text-sm">
                            Come see why parents trust us with their little ones. Book a tour today!
                        </p>
                        <a href="tel:5107783220">
                            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-6">
                                Book a Tour
                            </Button>
                        </a>
                        <div className="mt-8 flex gap-4">
                            {/* Social Placeholders */}
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {currentYear} Aama Daycare. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
