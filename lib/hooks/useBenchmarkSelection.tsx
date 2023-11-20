import { NestedBenchmark } from '@/types/benchmarks';
import useEvaluationStore from '@/lib/hooks/useEvaluationStore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useReducer } from 'react';
import useQueryParams from '@/lib/hooks/useQueryParams';

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
  selectedDatapointId?: string | null;
}

type Action =
  | { type: 'UPDATE_BENCHMARK'; newBenchmarkId: string }
  | { type: 'UPDATE_SPLIT'; newSplitType: string }
  | { type: 'UPDATE_MODEL'; newModel: string };

function reducer(
  state: BenchmarkSelectionState,
  action: Action,
  evaluations: NestedBenchmark[],
) {
  switch (action.type) {
    case 'UPDATE_BENCHMARK': {
      const newSplitType = getNewSplit(
        evaluations,
        action.newBenchmarkId,
        state.splitType,
      );
      const newModel = getNewModel(
        evaluations,
        action.newBenchmarkId,
        newSplitType,
        state.model,
      );
      return {
        ...state,
        benchmarkId: action.newBenchmarkId,
        splitType: newSplitType,
        model: newModel,
      };
    }
    case 'UPDATE_SPLIT': {
      const newModel = getNewModel(
        evaluations,
        state.benchmarkId,
        action.newSplitType,
        state.model,
      );
      return { ...state, splitType: action.newSplitType, model: newModel };
    }
    case 'UPDATE_MODEL':
      return { ...state, model: action.newModel };
    default:
      return state;
  }
}

function getDefaults(
  searchParams: URLSearchParams,
  evalautions: NestedBenchmark[],
): BenchmarkSelectionState {
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
}

export function useBenchmarkSelection(evaluations: NestedBenchmark[]) {
  const { selectedDatapointId, setSelectedEvaluationURL } =
    useEvaluationStore();
  const searchParams = useSearchParams()!;

  const { setQueryParams } = useQueryParams<BenchmarkSelectionState>();

  const [selections, dispatch] = useReducer(
    (state: BenchmarkSelectionState, action: Action) =>
      reducer(state, action, evaluations),
    getDefaults(searchParams, evaluations),
  );

  const availableBenchmarks = evaluations.map(
    (evaluation) => evaluation.benchmark,
  );
  const availableSplits =
    evaluations.find(
      (evaluation) => evaluation.benchmark.id == selections.benchmarkId,
    )?.splits || [];

  const selectedSplit = availableSplits.find(
    (split) => split.split_type === selections.splitType,
  );
  const availableModels =
    selectedSplit?.evaluations.map((evaluation) => evaluation.model) || [];

  const updateBenchmark = (newBenchmarkId: string) => {
    dispatch({ type: 'UPDATE_BENCHMARK', newBenchmarkId });
  };

  const updateSplit = (newSplitType: string) => {
    dispatch({ type: 'UPDATE_SPLIT', newSplitType });
  };

  const updateModel = (newModel: string) => {
    dispatch({ type: 'UPDATE_MODEL', newModel });
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
    setQueryParams({ ...selections, selectedDatapointId: selectedDatapointId });
  }, [selections, selectedDatapointId]);

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
