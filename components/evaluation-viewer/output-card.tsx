import { CollapsableCard } from '@/components/collapsable-card';
import { Separator } from '@/components/ui/separator';
import { prettyPrint } from '@/lib/utils';

interface OutputCardProps {
  outputs: Record<string, any>;
  outputsMetadata: Record<string, any> | null;
}

export function OutputCard({ outputs, outputsMetadata }: OutputCardProps) {
  return (
    <CollapsableCard title={'Outputs'} isDefaultOpen>
      <div className={'flex flex-col gap-2'}>
        {Object.entries(outputs).map(([key, value], index) => (
          <div key={index}>
            <strong>{key}:</strong> {prettyPrint(value)}
          </div>
        ))}
        <Separator />
        {outputsMetadata &&
          Object.entries(outputsMetadata).map(([key, value], index) => (
            <div key={index}>
              <strong>{key}:</strong> {prettyPrint(value)}
            </div>
          ))}
      </div>
    </CollapsableCard>
  );
}
