import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
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
      details: "hello@aamadaycare.com",
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
      details: "Monday - Friday: 7:00 AM - 6:00 PM",
      action: "View Schedule"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
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
                <Button variant="outline" size="sm" className="w-full">
                  {info.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Schedule Your Visit Today
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Come see our facilities, meet our caring staff, and discover why Aama Daycare 
            is the perfect place for your child to learn, grow, and thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8">
              Book a Tour
            </Button>
            <Button variant="warm" size="lg" className="text-lg px-8">
              Request Information
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;