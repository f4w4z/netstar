import Link from 'next/link';
import Image from 'next/image';
import type { ContentItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface ContentCardProps {
  item: ContentItem;
}

export function ContentCard({ item }: ContentCardProps) {
  const href = `/${item.type}/${item.id}`;

  return (
    <div className="group flex flex-col h-full">
      <Link href={href} className="block mb-2">
        <Card className="overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:border-accent group-hover:scale-105">
          <CardContent className="p-0">
            <div className="aspect-[2/3] relative">
              <Image
                src={item.posterPath}
                alt={`Poster for ${item.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                data-ai-hint="movie poster"
              />
            </div>
          </CardContent>
        </Card>
      </Link>
      <div className="mt-auto">
        <Link href={href}>
            <h3 className="font-headline text-sm font-bold transition-colors group-hover:text-accent line-clamp-2">{item.title}</h3>
        </Link>
      </div>
    </div>
  );
}
