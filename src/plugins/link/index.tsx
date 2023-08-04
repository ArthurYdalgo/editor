import React from 'react'
import { realmPlugin, system } from '../../gurx'
import { coreSystem } from '../core'
import { MdastLinkVisitor } from './MdastLinkVisitor'
import { LexicalLinkVisitor } from './LexicalLinkVisitor'
import { LinkNode } from '@lexical/link'
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'

/**
 * @internal
 */
export const linkSystem = system((_) => ({}), [coreSystem])

/**
 * @internal
 */
export const [linkPlugin] = realmPlugin({
  id: 'link',
  systemSpec: linkSystem,

  init: (realm, params: { validateUrl: React.ComponentProps<typeof LexicalLinkPlugin>['validateUrl'] }) => {
    realm.pubKey('addImportVisitor', MdastLinkVisitor)
    realm.pubKey('addLexicalNode', LinkNode)
    realm.pubKey('addExportVisitor', LexicalLinkVisitor)
    const linkPluginProps = params?.validateUrl ? { validateUrl: params.validateUrl } : {}
    realm.pubKey('addComposerChild', () => <LexicalLinkPlugin {...linkPluginProps} />)
  }
})
