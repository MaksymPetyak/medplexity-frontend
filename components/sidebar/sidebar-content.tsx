import { EvaluationSelector } from '@/components/sidebar/evaluation-selector';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IconGitHub } from '@/components/ui/icons';
import { NestedBenchmark } from '@/types/benchmarks';

export function SidebarContent({
  evaluations,
}: {
  evaluations: NestedBenchmark[];
}) {
  return (
    <div className="flex flex-col justify-between p-4 overflow-hidden min-h-screen">
      <div>
        <p className={'text-lg font-semibold'}>Medplexity explorer</p>
        <p className={'text-xs font-normal'}>
          Explore performance of LLMs on medical benchmarks.
        </p>
        <EvaluationSelector evaluations={evaluations} />
        <p className={'mt-4 text-sm text-gray-500'}>
          See GitHub for more information on how to run your own evaluations.
        </p>
      </div>
      <div className={'flex flex-col gap-8 justify-center'}>
        <div
          className={
            'bg-yellow-50 text-xs text-gray-700 p-2 md:p-4 border border-yellow-300'
          }
        >
          <p>
            Note, we use just a small collection (~50) of examples from bigger
            datasets. LLM predictions aren&apos;t deterministic, so you may see
            different results each time you run the model. These are meant just
            to help develop an intuition about how models answer, not to make
            any conclusions on the overall performance.
          </p>
        </div>

        <Link
          target="_blank"
          href="https://github.com/MaksymPetyak/medplexity"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="ml-2 flex">GitHub</span>
        </Link>
      </div>
    </div>
  );
}
