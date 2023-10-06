'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DatasetSelectorProps {
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}

export function DatasetSelector({
  value,
  options,
  onValueChange,
}: DatasetSelectorProps) {
  return (
    <div>
      <p className={'font-normal text-sm'}>Datasets</p>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select data set" />
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
