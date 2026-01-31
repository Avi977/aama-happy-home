import React from 'react';
import { Sun, Coffee, BookOpen, Apple, TreePine, Utensils, Moon, Palette, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineItem {
    time: string;
    title: string;
    description: string;
    icon: React.ElementType;
    iconColor: string;
}

const scheduleData: TimelineItem[] = [
    {
        time: '7:30 AM',
        title: 'Warm Welcome & Free Play',
        description: 'Children arrive, greet friends, and ease into the day with toys and activities.',
        icon: Sun,
        iconColor: 'from-orange-400 to-yellow-400'
    },
    {
        time: '8:30 AM',
        title: 'Healthy Breakfast & Clean Up',
        description: 'A nutritious breakfast fuels the day, followed by tidy-up time.',
        icon: Coffee,
        iconColor: 'from-amber-500 to-orange-500'
    },
    {
        time: '9:00 AM',
        title: 'Circle Time',
        description: 'Songs, stories, and group sharing to build community and language skills.',
        icon: Users,
        iconColor: 'from-blue-400 to-indigo-400'
    },
    {
        time: '9:30 AM',
        title: 'Learning & Discovery',
        description: 'Hands-on activities focused on letters, numbers, colors, and shapes.',
        icon: BookOpen,
        iconColor: 'from-purple-400 to-pink-400'
    },
    {
        time: '10:30 AM',
        title: 'Morning Snack',
        description: 'A light, healthy snack to recharge.',
        icon: Apple,
        iconColor: 'from-red-400 to-rose-400'
    },
    {
        time: '11:00 AM',
        title: 'Outdoor Play',
        description: 'Running, climbing, and group games to strengthen bodies and teamwork.',
        icon: TreePine,
        iconColor: 'from-green-400 to-emerald-400'
    },
    {
        time: '12:00 PM',
        title: 'Lunch & Clean Up',
        description: 'Wholesome meals to keep little ones energized.',
        icon: Utensils,
        iconColor: 'from-orange-400 to-red-400'
    },
    {
        time: '1:00 PM',
        title: 'Nap & Quiet Time',
        description: 'Rest time for growing bodies and minds.',
        icon: Moon,
        iconColor: 'from-indigo-400 to-purple-400'
    },
    {
        time: '2:30 PM',
        title: 'Gentle Wake-Up & Quiet Play',
        description: 'Books, puzzles, and soft toys for a calm transition.',
        icon: BookOpen,
        iconColor: 'from-cyan-400 to-blue-400'
    },
    {
        time: '3:00 PM',
        title: 'Afternoon Snack',
        description: 'A healthy bite before afternoon activities.',
        icon: Apple,
        iconColor: 'from-yellow-400 to-amber-400'
    },
    {
        time: '3:30 PM',
        title: 'Outdoor Adventures',
        description: 'More playground time, fresh air, and active play.',
        icon: TreePine,
        iconColor: 'from-teal-400 to-green-400'
    },
    {
        time: '4:30 PM',
        title: 'Creative & Sensory Play',
        description: 'Art, playdough, and painting to spark imagination.',
        icon: Palette,
        iconColor: 'from-pink-400 to-purple-400'
    },
    {
        time: '6:00 PM',
        title: 'Pick-Up & Goodbye',
        description: 'Winding down the day, last pickups, and cheerful farewells.',
        icon: Sun,
        iconColor: 'from-orange-400 to-pink-400'
    }
];

const ScheduleTimeline = () => {
    return (
        <div className="relative py-12">
            {scheduleData.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === scheduleData.length - 1;

                return (
                    <div key={index} className="relative flex gap-8 mb-8 group">
                        {/* Time (Left) */}
                        <div className="w-24 flex-shrink-0 text-right pt-2">
                            <span className="text-lg font-bold text-slate-900">{item.time}</span>
                        </div>

                        {/* Timeline Icon & Line (Center) */}
                        <div className="relative flex flex-col items-center flex-shrink-0">
                            {/* Icon */}
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg z-10 bg-gradient-to-br transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                                item.iconColor
                            )}>
                                <Icon className="w-7 h-7 text-white" />
                            </div>

                            {/* Vertical Line */}
                            {!isLast && (
                                <div className="absolute top-14 bottom-0 w-1 bg-gradient-to-b from-slate-200 to-slate-100 translate-y-[-0.5rem]" style={{ height: 'calc(100% + 2rem)' }} />
                            )}
                        </div>

                        {/* Content Card (Right) */}
                        <div className="flex-1 pb-8">
                            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                                <h3 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-base leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ScheduleTimeline;
