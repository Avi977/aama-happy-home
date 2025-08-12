import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Palette, BookOpen } from "lucide-react";
import activitiesImage from "@/assets/activities.jpg";

const Programs = () => {
  const programs = [
    {
      title: "Toddler Care",
      age: "18 months - 3 years",
      description: "Gentle introduction to learning through play, social interaction, and creative activities",
      features: ["Potty training support", "Music and movement", "Sensory play", "Story time"],
      icon: Users
    },
    {
      title: "Preschool Program", 
      age: "3 - 5 years",
      description: "Comprehensive early learning program preparing children for kindergarten success",
      features: ["Letter and number recognition", "Art and crafts", "Science exploration", "School readiness"],
      icon: BookOpen
    },
    {
      title: "After School Care",
      age: "5 - 12 years", 
      description: "Safe, supervised environment with homework help and recreational activities",
      features: ["Homework assistance", "Outdoor play", "Educational games", "Healthy snacks"],
      icon: Clock
    }
  ];

  return (
    <section className="py-20 bg-warm/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored programs designed to meet the unique developmental needs of each age group
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={activitiesImage} 
              alt="Children engaged in educational activities" 
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Learning Through Play
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our curriculum combines structured learning with free play, allowing children to develop 
              naturally while building essential skills for their future educational journey.
            </p>
            <div className="flex items-center gap-4">
              <Palette className="w-8 h-8 text-accent" />
              <span className="text-lg text-foreground">Creative Arts & Crafts</span>
            </div>
            <Button variant="warm" size="lg" className="mt-6">
              View Full Curriculum
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground">{program.title}</CardTitle>
                <p className="text-secondary font-semibold">{program.age}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;