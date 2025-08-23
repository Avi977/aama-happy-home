import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from 'react';
import { Link } from 'react-router-dom';

const usHolidays = [
  { date: 'January 1', name: "New Year's Day" },
  { date: 'Third Monday in January', name: 'Martin Luther King Jr. Day' },
  { date: 'Third Monday in February', name: "Presidents' Day" },
  { date: 'Last Monday in May', name: 'Memorial Day' },
  { date: 'June 19', name: 'Juneteenth National Independence Day' },
  { date: 'July 4', name: 'Independence Day' },
  { date: 'First Monday in September', name: 'Labor Day' },
  { date: 'Second Monday in October', name: 'Columbus Day' },
  { date: 'November 11', name: 'Veterans Day' },
  { date: 'Fourth Thursday in November', name: 'Thanksgiving Day' },
  { date: 'December 25', name: 'Christmas Day' },
];

const weeklyHours = [
  { day: 'Mon', open: '7:30 AM', close: '6:00 PM' },
  { day: 'Tue', open: '7:30 AM', close: '6:00 PM' },
  { day: 'Wed', open: '7:30 AM', close: '6:00 PM' },
  { day: 'Thu', open: '7:30 AM', close: '6:00 PM' },
  { day: 'Fri', open: '7:30 AM', close: '6:00 PM' },
  { day: 'Sat', open: null, close: null },
  { day: 'Sun', open: null, close: null },
];

function getPacificTimeParts() {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find(p => p.type === 'weekday').value; // e.g. 'Mon'
  const hour = parseInt(parts.find(p => p.type === 'hour').value, 10);
  const minute = parseInt(parts.find(p => p.type === 'minute').value, 10);
  return { weekday, hour, minute };
}

function isOpenNowPT() {
  const { weekday, hour, minute } = getPacificTimeParts();
  // Open Mon-Fri 7:30-18:00 PT
  if (["Sat", "Sun"].includes(weekday)) return false;
  if (hour < 7 || (hour === 7 && minute < 30)) return false;
  if (hour > 18 || (hour === 18 && minute > 0)) return false;
  return true;
}

const weekdayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Schedule = () => {
  const { weekday: todayShort, hour, minute } = getPacificTimeParts();
  const openNow = isOpenNowPT();

  return (
    <>
      <Header />
      <Hero />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-muted/30 rounded-xl p-8 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">Why Choose Aama Daycare?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            At Aama Daycare, we believe every child deserves a foundation of love, learning, and growth. Our experienced team creates an environment where children thrive emotionally, socially, and intellectually.
          </p>
        </div>
        <section className="py-20">
          <h2 className="text-4xl font-bold mb-8 text-left">Location & Hours</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
            {/* Left: Map and address */}
            <div className="flex-1 min-w-[260px]">
              <div className="rounded-lg overflow-hidden mb-4 shadow">
                <iframe
                  title="Aama Daycare Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.964964073839!2d-121.9451546846926!3d37.76437097975937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fd7e2e2e2e2e2%3A0x1234567890abcdef!2s737%20Birdwood%20Ct%2C%20San%20Ramon%2C%20CA%2094582!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mb-2">
                <span className="block font-bold text-primary text-lg">
                  <a href="https://www.google.com/maps/dir/?api=1&destination=737+Birdwood+Ct,+San+Ramon,+CA,+94582" target="_blank" rel="noopener noreferrer" className="hover:underline">737 Birdwood Ct</a>
                </span>
                <span className="block text-muted-foreground">San Ramon, CA 94582</span>
                <span className="block text-muted-foreground text-sm">Serving San Ramon Area</span>
              </div>
              <a href="https://www.google.com/maps/dir/?api=1&destination=737+Birdwood+Ct,+San+Ramon,+CA,+94582" target="_blank" rel="noopener noreferrer">
                <button className="mt-2 px-6 py-2 border rounded text-lg font-semibold hover:bg-muted transition">Get directions</button>
              </a>
            </div>
            {/* Right: Hours */}
            <div className="flex-1 min-w-[200px]">
              <table className="w-full text-left">
                <tbody>
                  {weeklyHours.map((row, idx) => {
                    const isToday = row.day === todayShort;
                    let status = null;
                    if (isToday) {
                      if (row.open && openNow) {
                        status = <span className="ml-2 text-green-600 font-semibold">Open now</span>;
                      } else {
                        status = <span className="ml-2 text-red-600 font-semibold">Closed now</span>;
                      }
                    }
                    return (
                      <tr key={row.day}>
                        <td className={`font-semibold${isToday ? ' text-primary' : ''}`}>{row.day}</td>
                        <td className="pl-4">
                          {row.open ? `${row.open} - ${row.close}` : 'Closed'}
                          {status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-left" id="schedule">Childcare Daily Schedule</h2>
          <p className="mb-8 text-lg text-muted-foreground">At Aama Daycare, we balance fun, learning, and rest so every child enjoys a happy and healthy day.</p>
          <div className="flex flex-col gap-6 mb-12">
            <div>
              <div className="font-bold text-primary text-lg">7:30 a.m. – Warm Welcome & Free Play</div>
              <div className="text-base text-foreground">Children arrive, greet friends, and ease into the day with toys and activities.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">8:30 a.m. – Healthy Breakfast & Clean Up</div>
              <div className="text-base text-foreground">A nutritious breakfast fuels the day, followed by tidy-up time.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">9:00 a.m. – Circle Time</div>
              <div className="text-base text-foreground">Songs, stories, and group sharing to build community and language skills.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">9:30 a.m. – Learning & Discovery</div>
              <div className="text-base text-foreground">Hands-on activities focused on letters, numbers, colors, and shapes.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">10:30 a.m. – Morning Snack</div>
              <div className="text-base text-foreground">A light, healthy snack to recharge.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">11:00 a.m. – Outdoor Play</div>
              <div className="text-base text-foreground">Running, climbing, and group games to strengthen bodies and teamwork.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">12:00 p.m. – Lunch & Clean Up</div>
              <div className="text-base text-foreground">Wholesome meals to keep little ones energized.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">1:00 p.m. – Nap & Quiet Time</div>
              <div className="text-base text-foreground">Rest time for growing bodies and minds.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">2:30 p.m. – Gentle Wake-Up & Quiet Play</div>
              <div className="text-base text-foreground">Books, puzzles, and soft toys for a calm transition.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">3:00 p.m. – Afternoon Snack</div>
              <div className="text-base text-foreground">A healthy bite before afternoon activities.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">3:30 p.m. – Outdoor Adventures</div>
              <div className="text-base text-foreground">More playground time, fresh air, and active play.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">4:30 p.m. – Creative & Sensory Play</div>
              <div className="text-base text-foreground">Art, playdough, and painting to spark imagination.</div>
            </div>
            <div>
              <div className="font-bold text-primary text-lg">6:00 p.m. – Pick-Up & Goodbye</div>
              <div className="text-base text-foreground">Winding down the day, last pickups, and cheerful farewells.</div>
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-left">Holidays & Closures</h3>
          <ul className="list-disc list-inside space-y-1">
            {usHolidays.map((holiday, idx) => (
              <li key={idx}><strong>{holiday.date}:</strong> {holiday.name}</li>
            ))}
          </ul>
          <p className="mt-6 text-muted-foreground">If a holiday falls on a weekend, the daycare may be closed on the nearest weekday. Please contact us for any special schedule requests.</p>
          <div className="mt-16 mb-12 bg-muted/30 rounded-xl p-8">
            <h2 className="text-4xl font-bold mb-2 text-left" id="curriculum">Our Curriculum</h2>
            <p className="mb-4 text-lg text-muted-foreground">
              We use the <span className="font-semibold text-primary">Mother Goose Time</span> curriculum, a research-backed, play-based program designed to nurture growth and learning in toddlers and preschoolers.
            </p>
            <a
              href="https://www.mothergoosetime.com/toddler/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-6 py-3 bg-primary text-white rounded font-semibold hover:bg-primary/80 transition"
            >
              Learn More About Mother Goose Time
            </a>
          </div>
          <p className="mt-8 text-xs text-muted-foreground italic border-t pt-4">
            <strong>Disclosure:</strong> Hours of operation, daily schedule, and holiday closures are subject to change without prior notice. Please contact Aama Daycare to confirm the most up-to-date information.
          </p>
        </section>
      </div>
    </>
  );
};

export default Schedule;
