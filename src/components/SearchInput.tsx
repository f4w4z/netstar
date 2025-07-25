'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn('h-9 w-9', isOpen && 'hidden')}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Open Search</span>
      </Button>
      <div
        className={cn(
          'absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300',
          isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
        )}
      >
        <form
          onSubmit={handleSearch}
          className={cn('relative', !isOpen && 'hidden')}
        >
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onBlur={() => setIsOpen(false)}
            className="h-9 pr-10 border-2 border-border focus:border-accent focus:ring-0"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-accent"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export function SearchSheet() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Search className="h-4 w-4" />
          <span className="sr-only">Open Search</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Search for movies or TV shows</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSearch} className="flex w-full items-center space-x-2 pt-4">
          <Input 
            type="search" 
            placeholder="e.g. The Matrix" 
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
