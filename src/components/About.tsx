import React from 'react';
import Testimonials from "./Testimonials";
import { CheckCircle, Heart, Star, ShieldCheck, Award, Smile } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import rasuImg from "@/assets/rasu.jpg";

const About = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "State Licensed",
      description: "Fully licensed by the state of California, ensuring strict safety and care standards."
    },
    {
      icon: Award,
      title: "Certified Staff",
      description: "CPR & First Aid certified, with years of experience in early childhood education."
    },
    {
      icon: Heart,
      title: "Loving Environment",
      description: "A warm, home-like atmosphere where every child is treated like family."
    },
    {
      icon: Smile,
      title: "Play-Based Learning",
      description: "Curriculum focused on learning through play, exploration, and creativity."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Why Choose Us / Trust Indicators */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Safety, Love, and Learning
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We provide more than just supervision. We create a nurturing foundation for your child's future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Owner Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-secondary/10 rounded-[3rem] rotate-3 transform scale-105"></div>
            {/* Image of Rasu */}
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-white border-4 border-white aspect-[4/5] group">
              <img
                src={rasuImg}
                alt="Miss Rasu with her children and Fluffy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Woman Owned Badge Overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-pink-100 animate-bounce-slow">
              <div className="p-2 bg-pink-100 rounded-full">
                <Heart className="w-6 h-6 text-pink-500 fill-current" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Proudly</div>
                <div className="text-lg font-bold text-slate-800">Woman Owned</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 text-left" id="about-section">
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6">
              Meet the Owner/Care-taker
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Hi, I'm <span className="text-primary">Miss Rasu</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Welcome to Aama Daycare! As a mother and experienced caregiver, I understand that choosing childcare is one of the most important decisions a parent makes.
              </p>
              <p>
                I noticed a need for care that goes beyond just "watching" children. I wanted to create a <span className="font-semibold text-secondary">second home</span> where children feel truly loved, safe, and excited to explore the world around them.
              </p>
              <p>
                In the photo, you'll see my own son and daughter, along with our beloved dog, <span className="font-semibold text-primary">Fluffy</span>. They are the heart of our little family here, and we can't wait to welcome your little one into our warm, happy home.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-slate-50 rounded-full border border-slate-200 font-semibold text-slate-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                CPR & First Aid Certified
              </div>
              <div className="px-6 py-3 bg-slate-50 rounded-full border border-slate-200 font-semibold text-slate-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Licensed Provider
              </div>
            </div>
          </div>
        </div>

        {/* Existing Testimonials */}
        <Testimonials />
      </div>
    </section>
  );
};

// Helper for placeholder
const UserIconPlaceholder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)

export default About;