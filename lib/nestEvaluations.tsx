import { Evaluation, NestedBenchmark } from '@/types/benchmarks';

export function nestEvaluations(evaluations: Evaluation[]): NestedBenchmark[] {
  const benchmarksMap: { [benchmarkId: string]: NestedBenchmark } = {};

  evaluations.forEach((evaluation) => {
    const datasetConfig = evaluation.dataset_config;
    const benchmark = datasetConfig.benchmark;
    const splitType = datasetConfig.split_type;
    const subtype = datasetConfig.subtype;

    if (!benchmarksMap[benchmark.id]) {
      benchmarksMap[benchmark.id] = {
        benchmark: benchmark,
        splits: [],
      };
    }

    let split = benchmarksMap[benchmark.id].splits.find(
      (s) => s.split_type === splitType,
    );

    if (!split) {
      split = {
        split_type: splitType,
        subtype: subtype,
        evaluations: [],
      };
      benchmarksMap[benchmark.id].splits.push(split);
    }

    split.evaluations.push({
      model: evaluation.model,
      evaluation_url: evaluation.evaluation_url,
    });
  });

  return Object.values(benchmarksMap);
}
