
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { ContentItem } from '@/lib/types';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import Autoplay from "embla-carousel-autoplay"

interface HeroCarouselProps {
  items: ContentItem[];
}

export function HeroCarousel({ items }: HeroCarouselProps) {
  return (
     <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        className="w-full"
      >
        <CarouselContent>
          {items.map(item => (
            <CarouselItem key={`${item.type}-${item.id}`}>
                <div className="w-full h-[60vh] relative">
                    <Image 
                        src={item.backdropPath!}
                        alt={`Backdrop for ${item.title}`}
                        fill
                        className="object-cover"
                        data-ai-hint="movie backdrop"
                        priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 text-white">
                        <div className="container mx-auto">
                            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">{item.title}</h2>
                            <p className="max-w-2xl text-lg hidden md:block mb-6 line-clamp-3">{item.overview}</p>
                            <Button asChild size="lg">
                                <Link href={`/${item.type}/${item.id}`}>
                                    View Details
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
  );
}
