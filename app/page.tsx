import { EvaluationViewer } from '@/components/evaluation-viewer/evaluation-viewer';
import SidebarLayout from '@/components/sidebar/sidebar-layout';
import { nestEvaluations } from '@/lib/nestEvaluations';
import { getEvaluations } from '@/lib/getEvaluations';

export const revalidate = 0;

export default async function Home() {
  const data = await getEvaluations();

  if (data.error || !data.data) {
    return <div>Error</div>;
  }

  // @ts-ignore
  const evaluations = nestEvaluations(data.data);

  return (
    <SidebarLayout evaluations={evaluations}>
      <div className="flex-grow w-full p-2 sm:p-4 md:p-8">
        <EvaluationViewer />
      </div>
    </SidebarLayout>
  );
}
