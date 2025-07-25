import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { ContentItem } from '@/lib/types';
import { ContentCard } from './ContentCard';

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
}

export function ContentCarousel({ title, items }: ContentCarouselProps) {
  return (
    <section>
      <h2 className="text-2xl font-headline font-bold mb-4">{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map(item => (
            <CarouselItem key={`${item.type}-${item.id}`} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
              <ContentCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
    </section>
  );
}
