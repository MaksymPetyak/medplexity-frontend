'use client';

import { DatasetDescription } from '@/components/sidebar/dataset-description';
import { useEffect, useState } from 'react';
import { DATASETS, SplitType } from '@/evaluations/evaluations';
import { DatasetSelector } from '@/components/sidebar/dataset-selector';
import { DataSplitSelector } from '@/components/sidebar/datasplit-selector';
import { Separator } from '@/components/ui/separator';
import { ModelSelector } from '@/components/sidebar/model-selector';
import useEvaluationStore from '@/lib/hooks/useEvaluationStore';

export function EvaluationSelector() {
  const { setEvaluationURL } = useEvaluationStore();

  const evals = DATASETS;

  const availableDatasets = Object.keys(evals);
  const [selectedDatasetKey, setSelectedDatasetKey] = useState(
    availableDatasets[0],
  );
  const selectedDataset = evals[selectedDatasetKey];

  // @ts-ignore
  const availableSplits: SplitType[] = Object.keys(selectedDataset.splits);
  const [selectedSplit, setSelectedSplit] = useState<SplitType>(
    availableSplits[0],
  );
  const selectedSplitData = selectedDataset.splits[selectedSplit];

  const availableModels = Object.keys(selectedSplitData || {});
  const [selectedModel, setSelectedModel] = useState(availableModels[0]);

  const evaluationURL = selectedSplitData
    ? selectedSplitData[selectedModel]
    : null;

  useEffect(() => {
    setEvaluationURL(evaluationURL);
  }, [evaluationURL, setEvaluationURL]);

  return (
    <div className={'flex flex-col gap-2 mt-2 w-full'}>
      <DatasetSelector
        value={selectedDatasetKey}
        options={availableDatasets}
        onValueChange={setSelectedDatasetKey}
      />
      <DataSplitSelector
        value={selectedSplit}
        options={availableSplits}
        onValueChange={setSelectedSplit}
      />
      <DatasetDescription description={selectedDataset.description} />
      <Separator className={'my-2 bg-gray-300'} />
      <ModelSelector
        value={selectedModel}
        options={availableModels}
        onValueChange={setSelectedModel}
      />
    </div>
  );
}
