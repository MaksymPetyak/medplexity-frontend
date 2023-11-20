'use client';

import { EvaluationResult, EvaluationSummary } from '@/types/evaluation';
import { DatapointSelector } from '@/components/evaluation-viewer/datapoint-selector';
import { useEffect, useState } from 'react';
import { InputCard } from '@/components/evaluation-viewer/input-card';
import { OutputCard } from '@/components/evaluation-viewer/output-card';
import useEvaluationStore from '@/lib/hooks/useEvaluationStore';
import useSWR from 'swr';
import { toCamelCase } from '@/lib/utils';
import { PromptCard } from '@/components/evaluation-viewer/prompt-card';
import useQueryParams from '@/lib/hooks/useQueryParams';

interface EvaluationProps {
  evaluationSummary: EvaluationSummary;
}

function Evaluation({ evaluationSummary }: EvaluationProps) {
  const { queryParams } = useQueryParams();
  const { setSelectedDatapointId } = useEvaluationStore();

  const [selectedDatapoint, setSelectedDatapoint] = useState<EvaluationResult>(
    queryParams.get('selectedDatapointId') !== null
      ? evaluationSummary.evaluationResults.find(
          (item) => item.id === queryParams.get('selectedDatapointId'),
        ) || evaluationSummary.evaluationResults[0]
      : evaluationSummary.evaluationResults[0],
  );

  useEffect(() => {
    setSelectedDatapointId(selectedDatapoint.id || null);
  }, [selectedDatapoint]);

  if (evaluationSummary.evaluationResults.length === 0) {
    return <p>No datapoints in the evaluation.</p>;
  }

  let outputMetadata = selectedDatapoint.outputMetadata;
  let prompt = null;
  if (outputMetadata !== null) {
    let { prompt: extractedPrompt, ...metadata } = outputMetadata;
    prompt = extractedPrompt;
    outputMetadata = metadata;
  }

  const initialIndex = evaluationSummary.evaluationResults.findIndex(
    (item) => item.id === selectedDatapoint.id,
  );

  return (
    <div className={'flex flex-col gap-2 text-sm md:text-base'}>
      <DatapointSelector
        data={evaluationSummary.evaluationResults}
        onValueChange={setSelectedDatapoint}
        initialIndex={initialIndex === -1 ? undefined : initialIndex}
      />
      <div>
        <InputCard
          inputs={selectedDatapoint.input}
          inputsMetadata={selectedDatapoint.inputMetadata}
          expectedOutput={selectedDatapoint.expectedOutput}
        />
        <PromptCard
          prompt={prompt}
          promptTemplate={evaluationSummary.promptTemplate}
        />
        <OutputCard
          output={selectedDatapoint.output}
          outputsMetadata={outputMetadata}
        />
      </div>
    </div>
  );
}

export function EvaluationViewer() {
  const { selectedEvaluationURL } = useEvaluationStore();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(selectedEvaluationURL, fetcher);

  if (error) return <div className={'text-red-500'}>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const normalisedData = toCamelCase(data);

  if (!selectedEvaluationURL) {
    return <p>No evaluation selected.</p>;
  }

  return (
    <Evaluation
      evaluationSummary={normalisedData}
      key={selectedEvaluationURL}
    />
  );
}
