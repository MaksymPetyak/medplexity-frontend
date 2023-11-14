'use client';

import { EvaluationResult, EvaluationSummary } from '@/types/evaluation';
import { DatapointSelector } from '@/components/evaluation-viewer/datapoint-selector';
import { useState } from 'react';
import { InputCard } from '@/components/evaluation-viewer/input-card';
import { OutputCard } from '@/components/evaluation-viewer/output-card';
import useEvaluationStore from '@/lib/hooks/useEvaluationStore';
import useSWR from 'swr';
import { toCamelCase } from '@/lib/utils';
import { PromptCard } from '@/components/evaluation-viewer/prompt-card';

interface EvaluationProps {
  evaluationSummary: EvaluationSummary;
}

function Evaluation({ evaluationSummary }: EvaluationProps) {
  const [selectedDatapoint, setSelectedDatapoint] = useState<EvaluationResult>(
    evaluationSummary.evaluationResults[0],
  );

  if (evaluationSummary.evaluationResults.length === 0) {
    return <p>No datapoints in the evaluation.</p>;
  }

  const outputMetadata = selectedDatapoint.outputMetadata;
  let prompt = null;
  if (outputMetadata !== null) {
    prompt = outputMetadata.prompt;
    delete outputMetadata['prompt'];
  }

  return (
    <div className={'flex flex-col gap-2 text-sm md:text-base'}>
      <DatapointSelector
        data={evaluationSummary.evaluationResults}
        onValueChange={setSelectedDatapoint}
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
