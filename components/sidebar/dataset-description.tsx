'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DatasetDescriptionProps {
  description: string;
}

export function DatasetDescription({ description }: DatasetDescriptionProps) {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="mt-4 w-full">
      <p
        className={cn(
          'text-sm',
          showFull ? '' : 'truncate whitespace-nowrap w-full',
        )}
      >
        {description}
      </p>
      <button
        onClick={() => setShowFull(!showFull)}
        className="text-blue-500 text-xs hover:underline ml-2"
      >
        {showFull ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
}
