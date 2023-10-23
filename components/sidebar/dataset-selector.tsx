'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dataset } from '@/evaluations/evaluations';

interface DatasetSelectorProps {
  value: string;
  datasets: { [key: string]: Dataset };
  onValueChange: (value: string) => void;
}

export function DatasetSelector({
  value,
  datasets,
  onValueChange,
}: DatasetSelectorProps) {
  const entries = Object.entries(datasets);

  return (
    <div>
      <p className={'font-normal text-sm'}>Datasets</p>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={entries.length <= 1}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select data set" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {entries.map(([key, dataset]) => {
              return (
                <SelectItem
                  key={key}
                  value={key}
                  onClick={() => onValueChange(key)}
                >
                  <div
                    className={'flex w-full items-center justify-between gap-4'}
                  >
                    {dataset.name}
                    <Badge variant={'secondary'}>{dataset.type}</Badge>
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
