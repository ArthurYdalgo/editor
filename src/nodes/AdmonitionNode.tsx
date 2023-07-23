import { addClassNamesToElement } from '@lexical/utils'
import {
  $applyNodeReplacement,
  $createParagraphNode,
  ElementNode,
  LexicalNode,
  NodeKey,
  RangeSelection,
  SerializedElementNode,
  Spread,
  AdmonitionKind,
  EditorConfig
} from 'lexical'

export { AdmonitionKind }

/**
 * A serialized representation of an {@link AdmonitionNode}.
 */
export type SerializedAdmonitionNode = Spread<
  {
    type: 'admonition'
    kind: AdmonitionKind
    version: 1
  },
  SerializedElementNode
>

/**
 * A lexical node that represents the markdown directives (better known as admonitions, thanks to Docusaurus). Use {@link "$createAdmonitionNode"} to construct one.
 *
 * @remarks
 *
 * An admonition in markdown looks like this:
 *
 * ```md
 * :::tip
 * Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
 * :::
 * ```
 */
export class AdmonitionNode extends ElementNode {
  __kind: AdmonitionKind
  static getType(): string {
    return 'admonition'
  }

  getKind(): AdmonitionKind {
    return this.getLatest().__kind
  }

  setKind(kind: AdmonitionKind): void {
    if (kind !== this.getKind()) {
      this.getWritable().__kind = kind
    }
  }

  static clone(node: AdmonitionNode): AdmonitionNode {
    return new AdmonitionNode(node.__kind, node.__key)
  }

  constructor(kind?: AdmonitionKind, key?: NodeKey) {
    super(key)
    this.__kind = kind || 'note'
  }

  // View

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement('div')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    addClassNamesToElement(element, config.theme.admonition[this.__kind])

    return element
  }

  updateDOM(_prevNode: AdmonitionNode, _dom: HTMLElement): boolean {
    return false
  }

  // TODO:
  // static importDOM(): DOMConversionMap | null {
  //   return {
  //     blockquote: (node: Node) => ({
  //       conversion: convertBlockquoteElement,
  //       priority: 0,
  //     }),
  //   }
  // }

  static importJSON(serializedNode: SerializedAdmonitionNode): AdmonitionNode {
    const node = $createAdmonitionNode(serializedNode.kind)
    return node
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: 'admonition'
    }
  }

  // Mutation
  insertNewAfter(_: RangeSelection, restoreSelection?: boolean): AdmonitionNode {
    const newBlock = $createAdmonitionNode()
    this.insertAfter(newBlock, restoreSelection)
    return newBlock
  }

  collapseAtStart(): true {
    const paragraph = $createParagraphNode()
    const children = this.getChildren()
    children.forEach((child) => paragraph.append(child))
    this.replace(paragraph)
    return true
  }
}

/**
 * Creates an {@link AdmonitionNode}.
 * @param kind - The kind of admonition to create. Accepts `'note' | 'tip' | 'danger' | 'info' | 'caution'`
 */
export function $createAdmonitionNode(kind?: AdmonitionKind): AdmonitionNode {
  return $applyNodeReplacement(new AdmonitionNode(kind))
}

/**
 * Returns `true` if the given node is an {@link AdmonitionNode}.
 */
export function $isAdmonitionNode(node: LexicalNode | null | undefined): node is AdmonitionNode {
  return node instanceof AdmonitionNode
}
