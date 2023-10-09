import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EvaluationResult } from '@/types/evaluation';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import useKeypress from '@/lib/hooks/useKeypress';
import { cn } from '@/lib/utils';

interface ResultsSelectorProps {
  data: EvaluationResult[];
  onValueChange: (value: EvaluationResult) => void;
}

function CorrectnessIcon({ isCorrect }: { isCorrect: boolean | null }) {
  if (isCorrect === null) {
    return null;
  }

  return isCorrect ? (
    <CheckCircle className={'w-8 text-green-400'} />
  ) : (
    <XCircle className={'w-8 text-red-400'} />
  );
}

export function DatapointSelector({
  data,
  onValueChange,
}: ResultsSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);

  const onDatapointChange = (value: string) => {
    const index = parseInt(value);
    setCurrentIndex(index);
    onValueChange(data[index]);
  };

  const goToLeft = () => {
    if (currentIndex !== null && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onValueChange(data[newIndex]);
    }
  };

  const goToRight = () => {
    if (currentIndex !== null && currentIndex < data.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onValueChange(data[newIndex]);
    }
  };

  useKeypress('ArrowLeft', goToLeft);
  useKeypress('ArrowRight', goToRight);

  const isLeftDisabled = currentIndex === 0 || currentIndex === null;
  const isRightDisabled =
    currentIndex === data.length - 1 || currentIndex === null;

  return (
    <div className={'flex gap-4 items-center max-w-2xl'}>
      <div className={'flex gap-1'}>
        <ArrowLeft
          className={cn(
            'text-gray-600 p-0.5 rounded-full hover:bg-gray-50 hover:pointer-cursor hover:text-gray-700',
            isLeftDisabled ? 'opacity-50' : '',
          )}
          size={'32px'}
          onClick={goToLeft}
        />
        <ArrowRight
          className={cn(
            'text-gray-600 p-0.5 rounded-full hover:bg-gray-50 hover:pointer-cursor hover:text-gray-700',
            isRightDisabled ? 'opacity-50' : '',
          )}
          size={'32px'}
          onClick={goToRight}
        />
      </div>

      <Select
        onValueChange={onDatapointChange}
        value={currentIndex?.toString()}
      >
        <SelectTrigger className="max-w-2xl overflow-hidden whitespace-nowrap text-overflow-ellipsis">
          <div
            className={'overflow-hidden justify-start text-overflow-ellipsis'}
          >
            <SelectValue placeholder="Select a question" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup
            className={
              'w-full max-w-2xl max-h-[300px] overflow-y-scroll overflow-x-clip'
            }
          >
            {data.map((item, index) => (
              <SelectItem key={index} value={index.toString()}>
                <div className={'flex justify-start items-center gap-2'}>
                  <CorrectnessIcon isCorrect={item.correct} />
                  <p
                    className={
                      'w-full overflow-hidden whitespace-nowrap text-overflow-ellipsis'
                    }
                  >
                    {item.input.question}
                  </p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
