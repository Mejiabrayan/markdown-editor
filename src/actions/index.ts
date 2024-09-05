'use server';

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function aiSuggest(content: string) {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini-2024-07-18'),
      messages: [
        {
          role: 'system',
          content:
            'You are an expert Markdown writer and editor. Your task is to provide helpful suggestions to improve the given Markdown text. Focus on enhancing clarity, structure, and proper use of Markdown syntax.',
        },
        {
          role: 'user',
          content: `Please review the following Markdown text and suggest improvements or continuations. Consider the following aspects:
    1. Proper use of Markdown syntax (headings, lists, links, etc.)
    2. Clarity and organization of ideas
    3. Potential additions or expansions to the content
    4. Any formatting or structural improvements

    Here's the text to review:

    ${content}

    Provide your suggestions in Markdown format, ready to be inserted into the document. Do not explicitly state the changes, but provide the improved text directly. Do not include backticks or code blocks in your suggestions.`,
        },
      ],
      temperature: 0.7,
      maxTokens: 300,
    });

    return text;
  } catch (error) {
    console.error('Error in aiSuggest:', error);
    throw new Error('Failed to generate suggestion');
  }
}
