'use client';

import { DatasetDescription } from '@/components/sidebar/dataset-description';
import { useEffect, useState } from 'react';
import { BenchmarkSelector } from '@/components/sidebar/benchmark-selector';
import { DataSplitSelector } from '@/components/sidebar/datasplit-selector';
import { Separator } from '@/components/ui/separator';
import { ModelSelector } from '@/components/sidebar/model-selector';
import useEvaluationStore from '@/lib/hooks/useEvaluationStore';
import { NestedBenchmark } from '@/types/benchmarks';

interface SelectionState {
  dataset: string;
  split: string;
  model: string;
}

export function EvaluationSelector({
  evaluations,
}: {
  evaluations: NestedBenchmark[];
}) {
  const { setSelectedEvaluationURL } = useEvaluationStore();

  const [selections, setSelections] = useState({
    benchmarkId: evaluations[0]?.benchmark.id,
    splitType: 'train',
    model: '',
  });

  const selectedBenchmark = evaluations.find(
    (evaluation) => evaluation.benchmark.id === selections.benchmarkId,
  );
  const availableSplits = selectedBenchmark?.splits || [];
  const selectedSplit = availableSplits.find(
    (split) => split.split_type === selections.splitType,
  );
  const availableModels =
    selectedSplit?.evaluations.map((evaluation) => evaluation.model) || [];

  useEffect(() => {
    // Reset splits and models when benchmark changes
    setSelections((prev) => ({
      ...prev,
      splitType: availableSplits[0]?.split_type || 'train',
      model: availableModels[0] || '',
    }));
  }, [selections.benchmarkId]);

  useEffect(() => {
    // Reset models when split changes
    setSelections((prev) => ({ ...prev, model: availableModels[0] || '' }));
  }, [selections.splitType]);

  useEffect(() => {
    const evaluationURL =
      selectedSplit?.evaluations.find(
        (evaluation) => evaluation.model === selections.model,
      )?.evaluation_url || null;
    setSelectedEvaluationURL(evaluationURL);
  }, [selections.model, selectedSplit, setSelectedEvaluationURL]);

  const updateBenchmark = (newBenchmarkId: string) => {
    setSelections({
      benchmarkId: newBenchmarkId,
      splitType: 'train',
      model: '',
    });
  };

  const updateSplit = (newSplitType: string) => {
    setSelections((prev) => ({ ...prev, splitType: newSplitType, model: '' }));
  };

  const updateModel = (newModel: string) => {
    setSelections((prev) => ({ ...prev, model: newModel }));
  };

  return (
    <div className={'flex flex-col gap-2 mt-2 w-full'}>
      <BenchmarkSelector
        value={selections.benchmarkId}
        benchmarks={evaluations.map((evaluation) => evaluation.benchmark)}
        onValueChange={updateBenchmark}
      />
      <DataSplitSelector
        value={selections.splitType}
        options={availableSplits.map((split) => split.split_type)}
        onValueChange={updateSplit}
      />
      <DatasetDescription
        description={selectedBenchmark?.benchmark.description || ''}
      />
      <Separator className={'my-2 bg-gray-300'} />
      <ModelSelector
        value={selections.model}
        options={availableModels}
        onValueChange={updateModel}
      />
    </div>
  );
}
