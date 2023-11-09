import { EvaluationSelector } from '@/components/sidebar/evaluation-selector';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IconGitHub } from '@/components/ui/icons';

export function SidebarContent() {
  return (
    <div className="flex flex-col justify-between p-4 overflow-hidden min-h-screen">
      <div>
        <p className={'text-lg font-semibold'}>Medplexity explorer</p>
        <p className={'text-xs font-normal'}>
          Explore LLM performance on medical benchmarks.
        </p>
        <EvaluationSelector />
        <p className={'mt-4 text-sm text-gray-500'}>
          More datasets and models coming soon!
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
            datasets. LLM predictions aren't deterministic, so you may see
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
