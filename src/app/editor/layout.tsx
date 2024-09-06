// src/app/editor/layout.tsx

import React from 'react';

export default function EditorLayout({
  children,
  zen
}: {
  children: React.ReactNode;
  zen: React.ReactNode;
}) {
  return (
    <div className="editor-layout relative">
      {children}
      {zen}
    </div>
  );
}