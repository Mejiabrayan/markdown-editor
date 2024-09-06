'use client';

import { useRouter } from 'next/navigation';
import Editor from '@/components/Editor';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/hooks/use-editor';
import { useEffect } from 'react';

export default function EditorPage() {
  const router = useRouter();
  const { setMode } = useEditor();

  useEffect(() => {
    setMode('normal');
  }, [setMode]);

  const enterZenMode = () => {
    router.push('/editor/zen');
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Markdown Editor</h1>
        <Button onClick={enterZenMode}>Enter Zen Mode</Button>
      </div>
      <Editor />
    </div>
  );
}