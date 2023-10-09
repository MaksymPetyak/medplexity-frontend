import { CollapsableCard } from '@/components/collapsable-card';
import { Separator } from '@/components/ui/separator';
import { prettyPrint } from '@/lib/utils';

interface InputCardProps {
  inputs: Record<string, any>;
  inputsMetadata: Record<string, any> | null;
  expectedOutput: string | null;
}

export function InputCard({
  inputs,
  inputsMetadata,
  expectedOutput,
}: InputCardProps) {
  return (
    <CollapsableCard title={'Inputs'} isDefaultOpen>
      <div className={'flex flex-col gap-2'}>
        {Object.entries(inputs).map(([key, value], index) => (
          <div key={index}>
            <strong>{key}:</strong> {prettyPrint(value)}
          </div>
        ))}
        <Separator />
        {expectedOutput !== null && (
          <div>
            <strong>Expected answer:</strong> {expectedOutput}
          </div>
        )}
        <Separator />
        {inputsMetadata &&
          Object.entries(inputsMetadata).map(([key, value], index) => (
            <div key={index}>
              <strong>{key}:</strong> {prettyPrint(value)}
            </div>
          ))}
      </div>
    </CollapsableCard>
  );
}
