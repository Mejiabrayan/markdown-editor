import React from 'react';

interface MarkdownComponentProps {
  node?: any;
  [key: string]: any;
}

export const MarkdownComponents: Record<
  string,
  React.FC<MarkdownComponentProps>
> = {
  h1: ({ node, ...props }) => (
    <h1 className='text-4xl font-bold mt-6 mb-4 font-sans' {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className='text-3xl font-bold mt-5 mb-3 font-sans' {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className='text-2xl font-bold mt-4 mb-2 font-sans' {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className='text-xl font-bold mt-3 mb-2 font-sans' {...props} />
  ),
  h5: ({ node, ...props }) => (
    <h5 className='text-lg font-bold mt-3 mb-2 font-sans' {...props} />
  ),
  h6: ({ node, ...props }) => (
    <h6 className='text-base font-bold mt-3 mb-2 font-sans' {...props} />
  ),
  p: ({ node, ...props }) => <p className='mb-4 font-mono' {...props} />,
  ul: ({ node, ...props }) => (
    <ul className='list-disc pl-6 mb-4 font-sans' {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className='list-decimal pl-6 mb-4 font-sans' {...props} />
  ),
  li: ({ node, ...props }) => <li className='mb-1 font-mono' {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      className='border-l-4 border-gray-300 pl-4 italic my-4 font-sans'
      {...props}
    />
  ),
  a: ({ node, ...props }) => (
    <a className='text-blue-500 hover:underline font-sans' {...props} />
  ),
  img: ({ node, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className='max-w-full h-auto my-4' {...props} />
  ),
  pre: ({ node, ...props }) => (
    <pre
      className='dark:bg-zinc-900 rounded p-4 overflow-x-auto my-4 font-mono'
      {...props}
    />
  ),
  code: ({ node, inline, ...props }) =>
    inline ? (
      <code className='bg-gray-100 rounded px-1 font-mono' {...props} />
    ) : (
      <code className='font-mono' {...props} />
    ),
  table: ({ node, ...props }) => (
    <table
      className='min-w-full border-collapse border border-gray-300 my-4'
      {...props}
    />
  ),
  thead: ({ node, ...props }) => (
    <thead
      className='dark:bg-transparent border border-black/10 dark:border-white/10'
      {...props}
    />
  ),
  tbody: ({ node, ...props }) => <tbody className='font-mono' {...props} />,
  tr: ({ node, ...props }) => <tr {...props} />,
  th: ({ node, ...props }) => (
    <th
      className='border border-gray-300 px-4 py-2 text-left font-semibold'
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td className='border border-gray-300 px-4 py-2' {...props} />
  ),
};
