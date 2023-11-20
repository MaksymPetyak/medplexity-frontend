import { NestedBenchmark } from '@/types/benchmarks';
import useEvaluationStore from '@/lib/hooks/useEvaluationStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

interface BenchmarkSelectionState {
  benchmarkId: string;
  splitType: string;
  model: string;
}

export function useBenchmarkSelection(evalautions: NestedBenchmark[]) {
  const { setSelectedEvaluationURL } = useEvaluationStore();
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const [selections, setSelections] = useState<BenchmarkSelectionState>(() => {
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

  // Updates the query parameters when the selections change
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
