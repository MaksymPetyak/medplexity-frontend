import create from 'zustand';

interface EvaluationState {
  evaluationURL: string | null;
  setEvaluationURL: (path: string | null) => void;
}

const useEvaluationStore = create<EvaluationState>((set) => ({
  evaluationURL: null,
  setEvaluationURL: (path: string | null) => set({ evaluationURL: path }),
}));

export default useEvaluationStore;
