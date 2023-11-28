import { CollapsableCard } from '@/components/collapsable-card';
import { Separator } from '@/components/ui/separator';
import { displayValue } from '@/lib/utils';

interface OutputCardProps {
  output: Record<string, any> | string;
  outputsMetadata: Record<string, any> | null;
}

export function OutputCard({ output, outputsMetadata }: OutputCardProps) {
  return (
    <CollapsableCard title={'Outputs'} isDefaultOpen>
      <div className={'flex flex-col gap-2'}>
        {typeof output === 'string' ? (
          <div>
            <strong>Answer:</strong> {output}
          </div>
        ) : (
          Object.entries(output).map(([key, value], index) => (
            <div key={index}>
              <strong>{key}:</strong> {displayValue(value)}
            </div>
          ))
        )}
        {outputsMetadata && (
          <div>
            <Separator />
            {Object.entries(outputsMetadata).map(([key, value], index) => (
              <div key={index}>
                <strong>{key}:</strong> {displayValue(value)}
              </div>
            ))}
          </div>
        )}
      </div>
    </CollapsableCard>
  );
}
