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
    <Link href={href} className="group block">
      <Card className="h-full overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:border-accent group-hover:scale-105">
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={item.posterPath}
              alt={`Poster for ${item.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              {...(item['data-ai-hint'] ? { 'data-ai-hint': item['data-ai-hint'] } : {})}
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-2">
        <h3 className="font-headline text-sm font-bold transition-colors group-hover:text-accent">{item.title}</h3>
      </div>
    </Link>
  );
}
