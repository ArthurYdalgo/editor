/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { SandpackConfig, MDXEditor, JsxComponentDescriptor } from '../index'
import dataCode from './assets/dataCode.ts?raw'
import { ViewMode } from '../types/ViewMode'
import { GenericJsxEditor } from '../jsx-editors/GenericJsxEditor'

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

export const virtuosoSampleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    },
    {
      label: 'Virtuoso',
      name: 'virtuoso',
      meta: 'live virtuoso',
      sandpackTemplate: 'react-ts',
      sandpackTheme: 'light',
      snippetFileName: '/App.tsx',
      initialSnippetContent: defaultSnippetContent,
      dependencies: {
        'react-virtuoso': 'latest',
        '@ngneat/falso': 'latest'
      },
      files: {
        '/data.ts': dataCode
      }
    }
  ]
}

export const jsxDescriptors: JsxComponentDescriptor[] = [
  {
    name: 'MyLeaf',
    kind: 'text',
    source: './external',
    props: [
      { name: 'foo', type: 'string' },
      { name: 'bar', type: 'string' }
    ],
    Editor: GenericJsxEditor
  },
  {
    name: 'BlockNode',
    kind: 'flow',
    source: './external',
    props: [],
    Editor: GenericJsxEditor
  }
]

interface WrappedEditorProps {
  markdown: string
  onChange?: (markdown: string) => void
  viewMode?: ViewMode
  className?: string
  imageUploadHandler?: (image: File) => Promise<string>
}

async function expressImageUploadHandler(image: File) {
  const formData = new FormData()
  formData.append('image', image)
  const response = await fetch('/uploads/new', { method: 'POST', body: formData })
  const json = (await response.json()) as { url: string }
  return json.url
}

export const WrappedLexicalEditor: React.FC<WrappedEditorProps> = ({
  viewMode,
  markdown,
  onChange,
  className,
  imageUploadHandler = expressImageUploadHandler
}) => {
  return (
    <MDXEditor
      markdown={markdown}
      viewMode={viewMode}
      headMarkdown={markdown}
      sandpackConfig={virtuosoSampleSandpackConfig}
      jsxComponentDescriptors={jsxDescriptors}
      className={className}
      onChange={onChange}
      linkAutocompleteSuggestions={['https://google.com/', 'https://news.ycombinator.com/', 'https://reddit.com/']}
      imageAutoCompleteSuggestions={['https://picsum.photos/200', 'https://picsum.photos/201']}
      imageUploadHandler={imageUploadHandler}
    />
  )
}
