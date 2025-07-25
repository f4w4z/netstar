
'use client';

import { useLoading } from '@/context/LoadingContext';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

export function ProgressBar() {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 95) {
            clearInterval(timer);
            return 95;
          }
          // Simulate loading progress
          const diff = Math.random() * 20;
          return Math.min(oldProgress + diff, 95);
        });
      }, 300);
      return () => {
        clearInterval(timer);
      };
    } else {
        // Complete the progress bar when loading is finished
        setProgress(100);
    }
  }, [isLoading]);
  
  if (!isLoading && progress === 100) {
    return null; // Don't render anything if not loading and progress is complete
  }

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
       <Progress value={progress} className="h-1 rounded-none" />
    </div>
  );
}
