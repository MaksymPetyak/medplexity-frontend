import { CollapsableCard } from '@/components/collapsable-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PromptCardProps {
  prompt: string;
  promptTemplate: string | undefined;
}

export function PromptCard({ prompt, promptTemplate }: PromptCardProps) {
  if (!prompt && !promptTemplate) {
    return null;
  }

  const defaultValue = prompt ? 'prompt' : 'template';

  return (
    <CollapsableCard title={'Prompt'}>
      <Tabs defaultValue={defaultValue}>
        <TabsList className="grid w-full grid-cols-2">
          {prompt && <TabsTrigger value="prompt">Final prompt</TabsTrigger>}
          {promptTemplate && (
            <TabsTrigger value="template">Template</TabsTrigger>
          )}
        </TabsList>
        {prompt && <TabsContent value="prompt">{prompt}</TabsContent>}
        {promptTemplate && (
          <TabsContent value="template">{promptTemplate}</TabsContent>
        )}
      </Tabs>
    </CollapsableCard>
  );
}
