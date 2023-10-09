'use client';

import { DatasetDescription } from '@/components/sidebar/dataset-description';
import { useEffect, useState } from 'react';
import { DATASETS, SplitType } from '@/evaluations/evaluations';
import { DatasetSelector } from '@/components/sidebar/dataset-selector';
import { DataSplitSelector } from '@/components/sidebar/datasplit-selector';
import { Separator } from '@/components/ui/separator';
import { ModelSelector } from '@/components/sidebar/model-selector';
import useEvaluationStore from '@/lib/hooks/useEvaluationStore';

interface SelectionState {
  dataset: string;
  split: SplitType;
  model: string;
}

export function EvaluationSelector() {
  const { setEvaluationURL } = useEvaluationStore();

  const evals = DATASETS;

  const [selections, setSelections] = useState<SelectionState>({
    dataset: Object.keys(evals)[0],
    split: 'train',
    model: '',
  });

  const availableDatasets = Object.keys(evals);
  const selectedDataset = evals[selections.dataset];
  const availableSplits = Object.keys(selectedDataset.splits);
  // @ts-ignore
  const selectedSplitData = selectedDataset.splits[selections.split];
  const availableModels = Object.keys(selectedSplitData || {});

  useEffect(() => {
    // Reset splits and models when dataset changes
    setSelections((prev) => ({
      ...prev,
      split: availableSplits[0] as SplitType,
      model: availableModels[0],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections.dataset]);

  useEffect(() => {
    // Reset models when split changes
    setSelections((prev) => ({ ...prev, model: availableModels[0] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections.split]);

  useEffect(() => {
    const evaluationURL = selectedSplitData
      ? selectedSplitData[selections.model]
      : null;
    setEvaluationURL(evaluationURL);
  }, [selections.model, selectedSplitData, setEvaluationURL]);

  // Step 3: Refactor into Helper Functions
  const updateDataset = (newDataset: string) => {
    setSelections({ dataset: newDataset, split: 'train', model: '' });
  };

  const updateSplit = (newSplit: string) => {
    setSelections((prev) => ({
      ...prev,
      split: newSplit as SplitType,
      model: '',
    }));
  };

  const updateModel = (newModel: string) => {
    setSelections((prev) => ({ ...prev, model: newModel }));
  };

  return (
    <div className={'flex flex-col gap-2 mt-2 w-full'}>
      <DatasetSelector
        value={selections.dataset}
        options={Object.keys(evals)}
        onValueChange={updateDataset}
      />
      <DataSplitSelector
        value={selections.split}
        // @ts-ignore
        options={availableSplits}
        onValueChange={updateSplit}
      />
      <DatasetDescription description={selectedDataset.description} />
      <Separator className={'my-2 bg-gray-300'} />
      <ModelSelector
        value={selections.model}
        options={availableModels}
        onValueChange={updateModel}
      />
    </div>
  );
}
