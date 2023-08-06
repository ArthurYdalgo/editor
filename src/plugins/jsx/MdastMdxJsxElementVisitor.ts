import { ElementNode } from 'lexical'
import { MdxJsxTextElement } from 'mdast-util-mdx'
import { $createLexicalJsxNode } from './LexicalJsxNode'
import { MdastImportVisitor } from '../../importMarkdownToLexical'

export const MdastMdxJsxElementVisitor: MdastImportVisitor<MdxJsxTextElement> = {
  testNode: (node) => {
    return (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') && node.name !== 'img'
  },
  visitNode({ lexicalParent, mdastNode }) {
    ;(lexicalParent as ElementNode).append($createLexicalJsxNode(mdastNode))
  }
}
