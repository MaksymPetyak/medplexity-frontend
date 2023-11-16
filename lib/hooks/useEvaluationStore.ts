import create from 'zustand';

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
