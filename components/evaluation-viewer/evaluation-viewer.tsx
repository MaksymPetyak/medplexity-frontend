'use client';

import { EvaluationResult, EvaluationSummary } from '@/types/evaluation';
import { DatapointSelector } from '@/components/evaluation-viewer/datapoint-selector';
import { useState } from 'react';
import { InputCard } from '@/components/evaluation-viewer/input-card';
import { OutputCard } from '@/components/evaluation-viewer/output-card';
import useEvaluationStore from '@/lib/hooks/useEvaluationStore';
import useSWR from 'swr';

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

  return (
    <div className={'flex flex-col gap-2'}>
      <DatapointSelector
        data={evaluationSummary.evaluationResults}
        onValueChange={setSelectedDatapoint}
      />
      <div>
        <InputCard
          inputs={selectedDatapoint.input}
          inputsMetadata={selectedDatapoint.inputMetadata}
        />

        {/* TODO: create a separate field for the prompt <PromptCard prompt={"Test"} />*/}
        <OutputCard
          outputs={selectedDatapoint.output}
          outputsMetadata={selectedDatapoint.outputMetadata}
        />
      </div>
    </div>
  );
}

export function EvaluationViewer() {
  const { evaluationPath } = useEvaluationStore();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('medmcqa_gpt-4_evaluation.json', fetcher);

  // TODO: styling
  if (error) return <div className={'text-red-500'}>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  if (!evaluationPath) {
    return <p>No evaluation selected.</p>;
  }

  return <Evaluation evaluationSummary={data} />;
}
