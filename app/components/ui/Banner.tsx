"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
    id: number;
    image: string;
    title: string;
    subtitle: string;
}

const defaultSlides: BannerSlide[] = [
    {
        id: 1,
        image: "/banner1.png",
        title: "แอปพรีเมียมราคาถูก",
        subtitle: "รับประกันคุณภาพ รับประกันตลอดการใช้งาน",
    },
    {
        id: 2,
        image: "/banner2.png",
        title: "แอปพรีเมียม ลดสูงสุด 30%",
        subtitle: "Netflix, Spotify, YouTube Premium และอีกมากมาย",
    },
    {
        id: 3,
        image: "/banner3.png",
        title: "ชำระเงินปลอดภัย 100%",
        subtitle: "รองรับ PromptPay, TrueMoney, บัตรเครดิต",
    },
];

interface BannerProps {
    slides?: BannerSlide[];
    autoPlayInterval?: number;
}

export default function Banner({
    slides = defaultSlides,
    autoPlayInterval = 4000,
}: BannerProps) {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const totalSlides = slides.length;

    const getPrevIndex = useCallback(
        (index: number) => (index - 1 + totalSlides) % totalSlides,
        [totalSlides]
    );

    const getNextIndex = useCallback(
        (index: number) => (index + 1) % totalSlides,
        [totalSlides]
    );

    const goTo = useCallback(
        (index: number) => {
            if (isTransitioning) return;
            setIsTransitioning(true);
            setCurrent(index);
            setTimeout(() => setIsTransitioning(false), 500);
        },
        [isTransitioning]
    );

    const goNext = useCallback(() => {
        goTo(getNextIndex(current));
    }, [current, getNextIndex, goTo]);

    const goPrev = useCallback(() => {
        goTo(getPrevIndex(current));
    }, [current, getPrevIndex, goTo]);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(goNext, autoPlayInterval);
        return () => clearInterval(timer);
    }, [goNext, autoPlayInterval]);

    const prevIndex = getPrevIndex(current);
    const nextIndex = getNextIndex(current);

    return (
        <div className="relative w-full py-8 overflow-hidden select-none">
            {/* Slides Container */}
            <div className="relative flex items-center justify-center h-[200px] sm:h-[280px] md:h-[350px] lg:h-[420px]">
                {slides.map((slide, index) => {
                    let position: "left" | "center" | "right" | "hidden" = "hidden";
                    if (index === current) position = "center";
                    else if (index === prevIndex) position = "left";
                    else if (index === nextIndex) position = "right";

                    return (
                        <div
                            key={slide.id}
                            onClick={() => {
                                if (position === "left") goPrev();
                                if (position === "right") goNext();
                            }}
                            className={`
                absolute rounded-2xl overflow-hidden shadow-2xl
                transition-all duration-500 ease-in-out
                ${position === "hidden" ? "opacity-0 scale-75 pointer-events-none" : ""}
                ${position === "center"
                                    ? "z-30 w-[70%] sm:w-[60%] md:w-[55%] opacity-100 scale-100"
                                    : ""
                                }
                ${position === "left"
                                    ? "z-20 w-[50%] sm:w-[40%] md:w-[35%] opacity-50 scale-90 -translate-x-[75%] sm:-translate-x-[85%] cursor-pointer hover:opacity-70"
                                    : ""
                                }
                ${position === "right"
                                    ? "z-20 w-[50%] sm:w-[40%] md:w-[35%] opacity-50 scale-90 translate-x-[75%] sm:translate-x-[85%] cursor-pointer hover:opacity-70"
                                    : ""
                                }
              `}
                        >
                            {/* Image */}
                            <div className="relative aspect-[21/9] w-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={position === "center"}
                                    sizes="(max-width: 768px) 70vw, 55vw"
                                    draggable={false}
                                />
                                {/* Gradient Overlay — only on center */}
                                {position === "center" && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                )}
                                {/* Dark overlay on sides */}
                                {position !== "center" && (
                                    <div className="absolute inset-0 bg-black/30" />
                                )}
                            </div>

                            {/* Text — only on center slide */}
                            {position === "center" && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                                    <h2 className="text-white text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                                        {slide.title}
                                    </h2>
                                    <p className="text-gray-200 text-[10px] sm:text-sm md:text-base drop-shadow-md">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Arrow Buttons */}
            <button
                onClick={goPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40
          w-11 h-11 sm:w-12 sm:h-12 rounded-full
          bg-black/40 backdrop-blur-sm border border-white/10
          text-white flex items-center justify-center
          hover:bg-white/20 hover:scale-110
          transition-all duration-300 cursor-pointer"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={goNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40
          w-11 h-11 sm:w-12 sm:h-12 rounded-full
          bg-black/40 backdrop-blur-sm border border-white/10
          text-white flex items-center justify-center
          hover:bg-white/20 hover:scale-110
          transition-all duration-300 cursor-pointer"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dot Indicators - Touch Area >= 44x44 */}
            <div className="flex justify-center flex-wrap mt-4 sm:mt-6">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goTo(index)}
                        className="p-3 mx-1 group cursor-pointer"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div className={`
                            h-2 rounded-full transition-all duration-300
                            ${index === current
                                ? "w-8 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                                : "w-2 bg-white/30 group-hover:bg-white/50"
                            }
                        `} />
                    </button>
                ))}
            </div>
        </div>
    );
}
