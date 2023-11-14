import create from 'zustand';
import { NestedBenchmark } from '@/types/benchmarks';

interface EvaluationState {
  selectedEvaluationURL: string | null;
  setSelectedEvaluationURL: (path: string | null) => void;
}

const useEvaluationStore = create<EvaluationState>((set) => ({
  selectedEvaluationURL: null,
  setSelectedEvaluationURL: (path: string | null) =>
    set({ selectedEvaluationURL: path }),
}));

export default useEvaluationStore;
