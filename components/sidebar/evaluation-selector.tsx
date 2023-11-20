'use client';

import { DatasetDescription } from '@/components/sidebar/dataset-description';
import { BenchmarkSelector } from '@/components/sidebar/benchmark-selector';
import { DataSplitSelector } from '@/components/sidebar/datasplit-selector';
import { Separator } from '@/components/ui/separator';
import { ModelSelector } from '@/components/sidebar/model-selector';
import { NestedBenchmark } from '@/types/benchmarks';
import { useBenchmarkSelection } from '@/lib/hooks/useBenchmarkSelection';

export function EvaluationSelector({
  evaluations,
}: {
  evaluations: NestedBenchmark[];
}) {
  const {
    selections,
    availableBenchmarks,
    availableSplits,
    availableModels,
    updateBenchmark,
    updateSplit,
    updateModel,
  } = useBenchmarkSelection(evaluations);

  const selectedBenchmark = evaluations.find(
    (evaluation) => evaluation.benchmark.id === selections.benchmarkId,
  );

  return (
    <div className={'flex flex-col gap-2 mt-2 w-full'}>
      <BenchmarkSelector
        value={selections.benchmarkId || ''}
        benchmarks={availableBenchmarks}
        onValueChange={updateBenchmark}
      />
      <DataSplitSelector
        value={selections.splitType}
        options={availableSplits.map((split) => split.split_type)}
        onValueChange={updateSplit}
      />
      <DatasetDescription
        description={selectedBenchmark?.benchmark.description || ''}
      />
      <Separator className={'my-2 bg-gray-300'} />
      <ModelSelector
        value={selections.model}
        options={availableModels}
        onValueChange={updateModel}
      />
    </div>
  );
}
