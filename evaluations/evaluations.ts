export interface Evaluation {
  [key: string]: string;
}

export type SplitType = 'train' | 'test' | 'validation';

export interface Dataset {
  name: string;
  description: string;
  splits: {
    [key in SplitType]?: Evaluation;
  };
}

export const DATASETS: { [datasetName: string]: Dataset } = {
  medmcqa: {
    name: 'MedMCQA',
    description:
      'Multiple-choice questions designed to address real-world medical entrance exam questions like AIIMS & NEET PG. This dataset encompasses over 194k high-quality MCQs spanning 2.4k healthcare topics and 21 medical subjects. Questions are accompanied by an explanation of the correct answer.',
    splits: {
      validation: {
        'gpt-4':
          'https://raw.githubusercontent.com/MaksymPetyak/medplexity-frontend/main/evaluations/medmcqa_gpt-4_evaluation.json?raw=true',
      },
    },
  },
};
