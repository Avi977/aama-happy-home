import { Check, ShieldCheck, Clock, Utensils, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// TODO: Replace placeholder rates, license number, and subsidy details with the
// owner's real numbers before publishing. Values marked $X / "TBD" are placeholders.
const tiers = [
  {
    title: "Toddler Care",
    age: "12 mo - 3 yrs",
    price: "$X",
    period: "/mo",
    color: "from-pink-400 to-rose-400",
    highlights: ["Full-day care", "Potty training support", "Sensory play & story time"],
  },
  {
    title: "Preschool",
    age: "3 - 5 years",
    price: "$X",
    period: "/mo",
    color: "from-purple-400 to-indigo-400",
    featured: true,
    highlights: ["Kindergarten readiness", "Letter & number recognition", "Art, crafts & science"],
  },
  {
    title: "After School",
    age: "5 - 12 years",
    price: "$X",
    period: "/mo",
    color: "from-blue-400 to-cyan-400",
    highlights: ["Homework assistance", "Outdoor play", "Healthy snacks included"],
  },
];

const differentiators = [
  { icon: ShieldCheck, label: "State-licensed", detail: "License #TBD" },
  { icon: Users, label: "Low child-to-adult ratios", detail: "More one-on-one care" },
  { icon: Clock, label: "Open Mon–Fri", detail: "8:00 AM – 5:00 PM" },
  { icon: Utensils, label: "Meals & snacks included", detail: "Healthy, home-cooked" },
  { icon: Star, label: "5.0 rating on Yelp", detail: "Loved by local families" },
  { icon: Check, label: "Subsidies accepted", detail: "Financial assistance welcome" },
];

const Pricing = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-32 bg-[#FDFBF7] relative overflow-hidden" id="pricing-section">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6 uppercase tracking-wider">
            Tuition &amp; Rates
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
            Simple, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-secondary">Transparent</span> Pricing
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Affordable, all-inclusive care with no hidden fees. Contact us for current rates and availability.
          </p>
        </div>

        {/* Pricing tiers */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className={cn(
                "group relative bg-white p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300",
                tier.featured && "ring-2 ring-primary lg:scale-105"
              )}
            >
              {tier.featured && (
                <span className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-primary/10 text-primary">
                  Most Popular
                </span>
              )}

              <div className={cn("w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br", tier.color)} />

              <h3 className="text-3xl font-black text-slate-900 leading-tight">{tier.title}</h3>
              <p className="text-slate-500 font-medium mb-6">{tier.age}</p>

              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-black text-slate-900">{tier.price}</span>
                <span className="text-slate-500 font-medium mb-1">{tier.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700 font-medium">
                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br shrink-0 mt-0.5", tier.color)}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                className={cn(
                  "w-full h-14 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all",
                  tier.featured
                    ? "bg-gradient-to-br from-primary to-secondary text-white"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                )}
              >
                Contact for availability
              </Button>
            </div>
          ))}
        </div>

        {/* Why Aama? differentiators in plain text (prerendered for SEO) */}
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-black text-slate-900">Why Aama?</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="flex items-start gap-4 bg-white p-6 rounded-3xl shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{label}</p>
                <p className="text-slate-500">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
