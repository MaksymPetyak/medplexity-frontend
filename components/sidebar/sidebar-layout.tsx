'use client';

import { useState } from 'react';
import { SidebarContent } from '@/components/sidebar/sidebar-content';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NestedBenchmark } from '@/types/benchmarks';

export default function SidebarLayout({
  evaluations,
  children,
}: {
  evaluations: NestedBenchmark[];
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side={'left'} className={'p-0'}>
            <div className="flex grow flex-col overflow-y-auto bg-gray-100 border-r border border-gray-300">
              <SidebarContent evaluations={evaluations} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col overflow-y-auto bg-gray-100 border-r border border-gray-300">
            <SidebarContent evaluations={evaluations} />
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="flex justify-between lg:hidden sticky top-0 z-40 h-16 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 bg-gray-100 border-r border border-gray-300">
            Medplexity
            <Button
              variant={'outline'}
              className="text-sm font-normal"
              onClick={() => setSidebarOpen(true)}
            >
              Select a dataset
            </Button>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
