import create from 'zustand';

interface EvaluationState {
  evaluationPath: string | null;
  setEvaluationPath: (path: string | null) => void;
}

const useEvaluationStore = create<EvaluationState>((set) => ({
  evaluationPath: null,
  setEvaluationPath: (path: string | null) => set({ evaluationPath: path }),
}));

export default useEvaluationStore;
