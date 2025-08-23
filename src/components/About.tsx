import { Heart, Shield, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Loving Care!",
      description: "Every child receives individual attention and affection in our nurturing environment"
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Your child's safety is our top priority with secure facilities and trained staff"
    },
    {
      icon: Star,
      title: "Quality Education",
      description: "Age-appropriate learning activities that promote cognitive and social development"
    },
    {
      icon: Users,
      title: "Family Community",
      description: "Building strong relationships between children, families, and our dedicated staff"
    }
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Aama Daycare?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At Aama Daycare, we believe every child deserves a foundation of love, learning, and growth. Our experienced team creates an environment where children thrive emotionally, socially, and intellectually.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white border-t border-muted">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-8">What Parents Are Saying</h3>
          <div className="space-y-8">
            <blockquote className="text-lg text-muted-foreground italic">“A nurturing home environment but also provides structure and lessons which prepare toddlers for school.”</blockquote>
            <blockquote className="text-lg text-muted-foreground italic">“Miss Rasu is compassionate and genuinely loves kids!”</blockquote>
            <blockquote className="text-lg text-muted-foreground italic">“The place is always clean and tidy. I never had any issues.”</blockquote>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;