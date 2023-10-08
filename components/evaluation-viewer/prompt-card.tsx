import { CollapsableCard } from '@/components/collapsable-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PromptCardProps {
  prompt: string;
  promptTemplate: string | undefined;
}

export function PromptCard({ prompt, promptTemplate }: PromptCardProps) {
  return (
    <CollapsableCard title={'Prompt'}>
      <Tabs defaultValue="prompt">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="prompt">Final prompt</TabsTrigger>
          {promptTemplate && (
            <TabsTrigger value="template">Template</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="prompt">{prompt}</TabsContent>
        {promptTemplate && (
          <TabsContent value="template">{promptTemplate}</TabsContent>
        )}
      </Tabs>
    </CollapsableCard>
  );
}
