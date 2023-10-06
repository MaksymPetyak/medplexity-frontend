import { CollapsableCard } from '@/components/collapsable-card';

interface PromptCardProps {
  prompt: string;
}

export function PromptCard({ prompt }: PromptCardProps) {
  return <CollapsableCard title={'Prompt'}>{prompt}</CollapsableCard>;
}
