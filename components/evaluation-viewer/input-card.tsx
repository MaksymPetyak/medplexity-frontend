import { CollapsableCard } from '@/components/collapsable-card';
import { Separator } from '@/components/ui/separator';
import { displayValue } from '@/lib/utils';

interface InputCardProps {
  inputs: Record<string, any> | string;
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
      <div className={'flex flex-col gap-2 whitespace-pre-wrap'}>
        {typeof inputs === 'string' && (
          <div>
            <strong>Input:</strong> {inputs}
          </div>
        )}
        {typeof inputs !== 'string' &&
          Object.entries(inputs).map(([key, value], index) => (
            <div key={index}>
              <strong>{key}: </strong>
              {displayValue(value)}
            </div>
          ))}
        {expectedOutput !== null && (
          <div>
            <Separator />
            <strong>Expected answer:</strong> {expectedOutput}
          </div>
        )}
        {inputsMetadata && (
          <div>
            <Separator />
            {Object.entries(inputsMetadata).map(([key, value], index) => (
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
