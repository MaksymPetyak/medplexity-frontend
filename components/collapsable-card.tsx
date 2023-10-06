import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface CollapsableCardProps {
  title: string;
  children: React.ReactNode;
  isDefaultOpen?: boolean;
}

export function CollapsableCard({
  title,
  children,
  isDefaultOpen = false,
}: CollapsableCardProps) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  return (
    <Card className="mb-4 overflow-auto">
      <CardHeader
        className={
          'text-md font-semibold bg-gray-50 border-b border-gray-200 p-2'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </CardHeader>
      {isOpen && (
        <CardContent className={'p-4 text-sm'}>{children}</CardContent>
      )}
    </Card>
  );
}
