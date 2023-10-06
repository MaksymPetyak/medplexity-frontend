import { EvaluationViewer } from '@/components/evaluation-viewer/evaluation-viewer';
import { mockEvaluationSummary } from '@/lib/mocks/mockEvaluationSummary';
import { Sidebar } from '@/components/sidebar/sidebar';

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow w-full p-8">
        <EvaluationViewer />
      </div>
    </main>
  );
}
