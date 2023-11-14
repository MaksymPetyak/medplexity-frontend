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
import { Benchmark } from '@/types/benchmarks';

interface BenchmarkSelectorProps {
  value: string;
  benchmarks: Benchmark[];
  onValueChange: (value: string) => void;
}

export function BenchmarkSelector({
  value,
  benchmarks,
  onValueChange,
}: BenchmarkSelectorProps) {
  return (
    <div>
      <p className={'font-normal text-sm'}>Datasets</p>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={benchmarks.length <= 1}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select data set" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {benchmarks.map((benchmark) => {
              return (
                <SelectItem
                  key={benchmark.id}
                  value={benchmark.id}
                  onClick={() => onValueChange(benchmark.id)}
                >
                  <div
                    className={'flex w-full items-center justify-between gap-4'}
                  >
                    {benchmark.name}
                    <Badge className={'hidden md:block'} variant={'secondary'}>
                      {benchmark.type}
                    </Badge>
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
