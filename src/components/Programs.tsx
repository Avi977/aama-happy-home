import { Clock, Users, Palette, BookOpen, Star, Sparkles } from "lucide-react";
import activitiesImage from "@/assets/activities.jpg"; // Keep existing image or replace if needed
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toddlerImg from "@/assets/photos/toddler.jpg";
import preschoolImg from "@/assets/photos/preschool.jpg";
import afterschoolImg from "@/assets/photos/afterschool.jpg";

const Programs = () => {
  const programs = [
    {
      title: "Toddler Care",
      age: "12 mo - 3 yrs",
      description: "Gentle introduction to learning through play, social interaction, and creative activities.",
      features: ["Potty training support", "Music and movement", "Sensory play", "Story time"],
      icon: Users,
      color: "from-pink-400 to-rose-400",
      bgAlert: "bg-pink-50/90",
      image: toddlerImg
    },
    {
      title: "Preschool",
      age: "3 - 5 years",
      description: "Comprehensive early learning program preparing children for kindergarten success.",
      features: ["Letter recognition", "Art and crafts", "Science exploration", "School readiness"],
      icon: BookOpen,
      color: "from-purple-400 to-indigo-400",
      bgAlert: "bg-purple-50/90",
      image: preschoolImg
    },
    {
      title: "After School",
      age: "5 - 12 years",
      description: "Safe, supervised environment with homework help and recreational activities.",
      features: ["Homework assistance", "Outdoor play", "Educational games", "Healthy snacks"],
      icon: Clock,
      color: "from-blue-400 to-cyan-400",
      bgAlert: "bg-blue-50/90",
      image: afterschoolImg
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="programs-section">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6 uppercase tracking-wider">
            Curriculum
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-secondary">Programs</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Tailored learning experiences designed to meet the unique developmental needs of every age group.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group relative bg-white border border-white/20 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/80" />
              </div>

              <div className="relative z-10">
                {/* Icon Header */}
                <div className={cn("w-20 h-20 rounded-3xl mb-8 flex items-center justify-center shadow-lg bg-gradient-to-br transform -rotate-6 group-hover:rotate-0 transition-transform duration-300", program.color)}>
                  <program.icon className="w-10 h-10 text-white" />
                </div>

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-black text-slate-900 leading-tight">{program.title}</h3>
                  <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-sm", program.bgAlert, program.color.split(" ")[1].replace("to", "text"))}>
                    {program.age}
                  </span>
                </div>

                <p className="text-slate-600 mb-8 leading-relaxed text-lg font-medium">
                  {program.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 font-bold">
                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br shrink-0 mt-0.5", program.color)}>
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlight Section */}
        <div className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-[3rem] rotate-3 group-hover:rotate-6 transition-transform opacity-20" />
            <img
              src={activitiesImage}
              alt="Kids learning"
              className="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/3] rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500"
            />
          </div>

          <div className="space-y-8">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Learning Through <br />
              <span className="text-primary">Play & Exploration</span>
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              Our curriculum combines structured learning with free play, allowing children to develop naturally while building essential skills for their future educational journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/schedule">
                <Button className="h-14 px-8 rounded-full text-lg font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl hover:shadow-2xl transition-all">
                  View Daily Schedule
                </Button>
              </Link>
              <Link to="/schedule#curriculum">
                <Button variant="outline" className="h-14 px-8 rounded-full text-lg font-bold border-2 border-slate-200 text-slate-600 hover:bg-white hover:text-primary hover:border-primary transition-colors">
                  Full Curriculum
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;