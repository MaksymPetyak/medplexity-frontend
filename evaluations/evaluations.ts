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
          'https://raw.githubusercontent.com/MaksymPetyak/medplexity-frontend/main/evaluations/medmcqa_validation(50)_gpt4_evaluation.json',
      },
    },
  },
  medqa: {
    name: 'MedQA',
    description:
      'Multiple-choice questions based on the United States Medical License Exams (USMLE). It covers 3 languages, but here we only look at the English subset.' +
      'Original paper: What Disease does this Patient Have? A Large-scale Open Domain Question Answering Dataset from Medical Exams\n' +
      '28 Sep 2020 · Di Jin, Eileen Pan, Nassim Oufattole, Wei-Hung Weng, Hanyi Fang, Peter Szolovits \n' +
      'https://arxiv.org/abs/2009.13081',
    splits: {
      validation: {
        'gpt-4':
          'https://raw.githubusercontent.com/MaksymPetyak/medplexity-frontend/main/evaluations/medqa_validation(50)_gpt4_evaluation.json',
      },
    },
  },
  healthsearchqa: {
    name: 'HealthSearchQA',
    description:
      'Dataset of consumer health questions released by Google for the Med-PaLM paper. This HealthSearchQA dataset consists of 3,173 commonly searched consumer health questions. These questions were curated using seed medical conditions and their associated symptoms, reflecting real-world consumer concerns in the healthcare domain.\n' +
      'Paper: Large Language Models Encode Clinical Knowledge\n' +
      '2022 * Singhal, K., Azizi, S., Tu, T. et al. https://arxiv.org/abs/2212.13138',
    splits: {
      train: {
        'gpt-4':
          'https://raw.githubusercontent.com/MaksymPetyak/medplexity-frontend/main/evaluations/healthsearchqa_train(50)_gpt4_evaluation.json',
        'llama-2-70b-chat-hf':
          'https://raw.githubusercontent.com/MaksymPetyak/medplexity-frontend/main/evaluations/healthsearchqa_train(50)_llama-2-70b-chat-hf_evaluation.json',
        'mistral-7b-instruct':
          'https://raw.githubusercontent.com/MaksymPetyak/medplexity-frontend/main/evaluations/healthsearchqa_train(50)_mistral-7b-instruct.json',
      },
    },
  },
};
