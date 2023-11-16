'use client';

import { DatasetDescription } from '@/components/sidebar/dataset-description';
import { useEffect, useState } from 'react';
import { BenchmarkSelector } from '@/components/sidebar/benchmark-selector';
import { DataSplitSelector } from '@/components/sidebar/datasplit-selector';
import { Separator } from '@/components/ui/separator';
import { ModelSelector } from '@/components/sidebar/model-selector';
import useEvaluationStore from '@/lib/hooks/useEvaluationStore';
import { NestedBenchmark } from '@/types/benchmarks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SelectionState {
  benchmarkId: string;
  splitType: string;
  model: string;
}

const getNewSplit = (
  evaluations: NestedBenchmark[],
  benchmarkId: string,
  oldSplit: string,
) => {
  const availableSplits =
    evaluations
      .find((evaluation) => evaluation.benchmark.id === benchmarkId)
      ?.splits.map((split) => split.split_type) || [];
  return availableSplits.includes(oldSplit) ? oldSplit : availableSplits[0];
};

const getNewModel = (
  evaluations: NestedBenchmark[],
  benchmarkId: string,
  splitType: string,
  oldModel: string,
) => {
  const availableSplits =
    evaluations.find((evaluation) => evaluation.benchmark.id === benchmarkId)
      ?.splits || [];
  const availableModels =
    availableSplits
      .find((split) => split.split_type === splitType)
      ?.evaluations.map((evaluation) => evaluation.model) || [];
  return availableModels.includes(oldModel) ? oldModel : availableModels[0];
};

function useSelectionState(evalautions: NestedBenchmark[]) {
  const { setSelectedEvaluationURL } = useEvaluationStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [selections, setSelections] = useState<SelectionState>(() => {
    const benchmarkId =
      searchParams.get('benchmarkId') || evalautions[0].benchmark.id;
    const splitType = getNewSplit(
      evalautions,
      benchmarkId,
      searchParams.get('splitType') || '',
    );

    return {
      benchmarkId: benchmarkId,
      splitType: splitType,
      model: getNewModel(
        evalautions,
        benchmarkId,
        splitType,
        searchParams.get('model') || '',
      ),
    };
  });

  const availableBenchmarks = evalautions.map(
    (evaluation) => evaluation.benchmark,
  );
  const availableSplits =
    evalautions.find(
      (evaluation) => evaluation.benchmark.id == selections.benchmarkId,
    )?.splits || [];

  const selectedSplit = availableSplits.find(
    (split) => split.split_type === selections.splitType,
  );
  const availableModels =
    selectedSplit?.evaluations.map((evaluation) => evaluation.model) || [];

  const updateBenchmark = (newBenchmarkId: string) => {
    const newSplitType = getNewSplit(
      evalautions,
      newBenchmarkId,
      selections.splitType,
    );
    const newModel = getNewModel(
      evalautions,
      newBenchmarkId,
      newSplitType,
      selections.model,
    );

    setSelections({
      benchmarkId: newBenchmarkId,
      splitType: newSplitType,
      model: newModel,
    });
  };

  const updateSplit = (newSplitType: string) => {
    setSelections((prev) => {
      const newModel = getNewModel(
        evalautions,
        prev.benchmarkId,
        newSplitType,
        prev.model,
      );

      return { ...prev, splitType: newSplitType, model: newModel };
    });
  };

  const updateModel = (newModel: string) => {
    setSelections((prev) => ({ ...prev, model: newModel }));
  };

  useEffect(() => {
    const evaluationURL =
      selectedSplit?.evaluations.find(
        (evaluation) => evaluation.model === selections.model,
      )?.evaluation_url || null;
    setSelectedEvaluationURL(evaluationURL);
  }, [selections]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(selections).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`?${newParams}`);
  }, [selections]);

  return {
    selections,
    availableBenchmarks,
    availableSplits,
    availableModels,
    updateBenchmark,
    updateSplit,
    updateModel,
  };
}

export function EvaluationSelector({
  evaluations,
}: {
  evaluations: NestedBenchmark[];
}) {
  const {
    selections,
    availableBenchmarks,
    availableSplits,
    availableModels,
    updateBenchmark,
    updateSplit,
    updateModel,
  } = useSelectionState(evaluations);

  const selectedBenchmark = evaluations.find(
    (evaluation) => evaluation.benchmark.id === selections.benchmarkId,
  );

  return (
    <div className={'flex flex-col gap-2 mt-2 w-full'}>
      <BenchmarkSelector
        value={selections.benchmarkId || ''}
        benchmarks={availableBenchmarks}
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
