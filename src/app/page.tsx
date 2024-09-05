import Editor from '@/components/editor';
import { ModeToggle } from '@/components/toggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-end mb-6">
          <ModeToggle />
        </div>
        <Editor />
      </div>
    </main>
  );
}