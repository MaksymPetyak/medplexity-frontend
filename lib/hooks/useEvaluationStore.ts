import create from 'zustand';

interface EvaluationState {
  selectedEvaluationURL: string | null;
  selectedDatapointId: string | null;
  setSelectedDatapointId: (id: string | null) => void;
  setSelectedEvaluationURL: (path: string | null) => void;
}

const useEvaluationStore = create<EvaluationState>((set) => ({
  selectedEvaluationURL: null,
  selectedDatapointId: null,
  setSelectedDatapointId: (id: string | null) =>
    set({ selectedDatapointId: id }),
  setSelectedEvaluationURL: (path: string | null) =>
    set({ selectedEvaluationURL: path }),
}));

export default useEvaluationStore;
