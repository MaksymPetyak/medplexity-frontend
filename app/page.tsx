import { EvaluationViewer } from '@/components/evaluation-viewer/evaluation-viewer';
import SidebarLayout from '@/components/sidebar/sidebar-layout';

export default function Home() {
  return (
    <SidebarLayout>
      <div className="flex-grow w-full p-2 sm:p-4 md:p-8 ">
        <EvaluationViewer />
      </div>
    </SidebarLayout>
  );
}
