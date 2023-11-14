'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataSplitSelectorProps {
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}

export function DataSplitSelector({
  value,
  options,
  onValueChange,
}: DataSplitSelectorProps) {
  return (
    <div className="ml-2">
      <p className={'font-normal text-sm'}>Config</p>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={options.length <= 1}
      >
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
