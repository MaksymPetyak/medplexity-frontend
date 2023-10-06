'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SplitType } from '@/evaluations/evaluations';

interface DataSplitSelectorProps {
  value: SplitType;
  options: SplitType[];
  onValueChange: (value: SplitType) => void;
}

export function DataSplitSelector({
  value,
  options,
  onValueChange,
}: DataSplitSelectorProps) {
  return (
    <div className="ml-2">
      <p className={'font-normal text-sm'}>Config</p>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select data split" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              return (
                <SelectItem
                  key={option}
                  value={option}
                  onClick={() => onValueChange(option)}
                >
                  {option}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
