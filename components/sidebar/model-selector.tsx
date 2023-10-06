import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ModelSelectorProps {
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}

export function ModelSelector({
  value,
  options,
  onValueChange,
}: ModelSelectorProps) {
  return (
    <div>
      <p className={'font-normal text-sm'}>Model</p>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select model" />
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
