export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NetStar. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Movie and TV show data provided by{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-accent"
          >
            TMDb
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
