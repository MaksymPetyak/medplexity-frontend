export interface Benchmark {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface DatasetConfig {
  id: string;
  benchmark: Benchmark;
  split_type: string;
  subtype: string | null;
}

export interface Evaluation {
  id: string;
  dataset_config: DatasetConfig;
  model: string;
  evaluation_url: string;
}

export interface NestedBenchmark {
  benchmark: Benchmark;
  splits: {
    split_type: string;
    subtype: string | null;
    evaluations: {
      model: string;
      evaluation_url: string;
    }[];
  }[];
}
