import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

// Auto-import all images from src/assets/photos
const images = import.meta.glob("../assets/photos/*.{jpg,png,jpeg}", { eager: true, import: 'default' });
const photoUrls = Object.values(images) as string[];

const PhotoGallery = () => {
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;

        // Custom interval for auto-scrolling every 10 seconds
        const intervalId = setInterval(() => {
            api.scrollNext();
        }, 10000);

        return () => clearInterval(intervalId);
    }, [api]);

    return (
        <section className="py-24 bg-white overflow-hidden relative" id="gallery-section">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-20">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                    Moments of Joy
                </h2>
                <p className="text-xl text-slate-500">Capturing the magic of daily life at Aama Daycare</p>
            </div>

            <div className="max-w-7xl mx-auto px-12 relative z-20">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {photoUrls.map((url, idx) => (
                            <CarouselItem key={`gallery-${idx}`} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-lg border-4 border-white group">
                                        <img
                                            src={url}
                                            alt={`Daycare moment ${idx + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12 w-12 h-12 border-2 border-slate-200 hover:border-primary hover:text-primary" />
                    <CarouselNext className="hidden md:flex -right-12 w-12 h-12 border-2 border-slate-200 hover:border-primary hover:text-primary" />
                </Carousel>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default PhotoGallery;
