import React from 'react';
import { Star, ExternalLink } from "lucide-react";

const YelpReviews = () => {
  const reviews = [
    {
      id: '1',
      text: "This review is long overdue. My son attended Aama Day Care for 1.5 yrs and I feel so fortunate that he got that time with Miss Rasu and her beautiful cohort of kids. If you are seeking an environment much like home where your child gets hands on care and attention, this is the place! Miss Rasu is compassionate and genuinely loves kids! I was also able to befriend many other parents and we still stay in touch. I'm forever grateful to Miss Rasu and her family for giving my son such a wonderful and fun experience!",
      rating: 5,
      user: 'Tenzing P.',
      date: 'May 21, 2025'
    },
    {
      id: '2',
      text: "Miss Raasu is a natural with children. She is a very genuine caregiver who runs this business more out of passion than profession. What will stand out about her is that she never gives up on any child whom she accepts even if the child takes longer to adjust or is more demanding than usual. She is the epitome of patience and children mill around her like little moths, attracted to her composed and loving demeanor. In our case she accommodated our request of sibling admission even though my younger one was 6 months smaller than the age she admits children at. It was a huge relief for us, and we can never thank her enough for all the help she has extended and the safe and loving environment she has given both my kids. She also has a contemporary learning schedule which mixes free play and learning so seamlessly that kids strengthen their fundamentals while having fun at it. Wherever she stays is a boon for the families looking for a safe space for their children. I would trust her blindly when it comes to childcare.",
      rating: 5,
      user: 'Richa G.',
      date: 'June 10, 2024'
    },
    {
      id: '3',
      text: "We started when my son was 16 months and he's now 5 and ready to graduate for kindergarten life. He learned so much during his stay, including writing his name, closing mouth when eating, hands are for caring, etc. Ms Rasu hosts once a year party, and it's such a hit for both kids and adults. We get to know the other parents and kids during the party and of course kids don't eat as they're having so much fun. We get updates on food, poop, sleep and behavior (food and bad) for the day. My son loves the treasure chest and sticker reward system. The last few years, I was happy we had a consistent group of kids that we saw from little one to walking / talking kids. It was nice to see their development and camaraderie. We got to know the kids and their families. It's bittersweet that we are graduating and will miss everyone.",
      rating: 5,
      user: 'Daisy P.',
      date: 'June 28, 2024'
    },
    {
      id: '4',
      text: "Aama daycare has been a godsend for my family!!! My son started going there since he was 1.5 years old until recently. Sadly we had to switch daycares as we relocated but I have such fond memories of this place! Ms. Rasu was so amazing in every aspect of my child's growth. It felt that every time he went there he learned something new! She went above and beyond to make sure that the kids are entertained and made learning so much fun!!! My kid was so excited to go to Ms. Rasu's every single day and it was so hard to make him come home lol. We surely are going to miss this place!!! Ms. Rasu has definitely made a huge impact in my child's life and I am eternally grateful to her!",
      rating: 5,
      user: 'Juhi S.',
      date: 'September 19, 2023'
    },
    {
      id: '5',
      text: "This is a very special daycare. They pay special attention to each child, and the children come away happy every day that they have learned something new or had a great experience. We highly recommend this daycare/school as an academic program for any child :)",
      rating: 5,
      user: 'Mark Kevin C.',
      date: 'December 20, 2017'
    },
    {
      id: '6',
      text: "Rasu is really amazing, loving caring person.. She loves kids, pay good attention to their needs.. My kid is happy going there everyday, and learned a lot since she started... It's also really important to feel and know my kid is well taken care of and that's what I find at her day care... I also love how she always arranges special days with kids to celebrate with nice theme..",
      rating: 5,
      user: 'Yeliz A.',
      date: 'June 8, 2022'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white border-t border-muted">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">What Parents Are Saying</h3>
          <p className="text-muted-foreground mb-6">
            Real feedback from parents who trust Aama Daycare with their children
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="text-xl font-semibold text-foreground ml-2">5.0</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-3">
                {renderStars(review.rating)}
                <span className="text-sm text-muted-foreground ml-auto">
                  {review.date}
                </span>
              </div>
              
              <blockquote className="text-sm text-gray-700 italic mb-4 leading-relaxed">
                "{review.text}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">- {review.user}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.yelp.com/biz/aama-day-care-san-ramon-2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-colors duration-200"
            >
              <Star className="w-4 h-4" />
              Read All Reviews on Yelp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YelpReviews;
