import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'

const ADMONITION_TYPES = ['tip', 'note', 'warning', 'danger', 'info', 'caution']

export const remarkAdmonitions: Plugin = () => (tree: any) => {
  visit(tree, 'containerDirective', (node: any) => {
    if (!ADMONITION_TYPES.includes(node.name)) return

    node.data = node.data || {}
    node.data.hName = 'admonition'
    node.data.hProperties = {
      type: node.name,
      title: node.label || undefined,
    }
  })
}
