import { EvaluationSelector } from '@/components/sidebar/evaluation-selector';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IconGitHub } from '@/components/ui/icons';

export function Sidebar() {
  return (
    <div className="flex h-screen sticky top-0 flex-col justify-between w-[300px] md:w-1/3 overflow-hidden bg-gray-100 p-4 border-r border border-gray-300">
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
      <div className={'flex justify-center'}>
        <Link
          target="_blank"
          href="https://github.com/MaksymPetyak/medplexity"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="hidden ml-2 md:flex">GitHub</span>
        </Link>
      </div>
    </div>
  );
}
