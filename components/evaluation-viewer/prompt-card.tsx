import { CollapsableCard } from '@/components/collapsable-card';

interface PromptCardProps {
  prompt: string;
  promptTemplate: string | undefined;
}

export function PromptCard({ prompt, promptTemplate }: PromptCardProps) {
  return <CollapsableCard title={'Prompt'}>{prompt}</CollapsableCard>;
}
