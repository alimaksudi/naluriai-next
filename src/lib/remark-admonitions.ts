import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'

const ADMONITION_TYPES = ['tip', 'note', 'warning', 'danger', 'info', 'caution']

export const remarkAdmonitions: Plugin = () => (tree: any) => {
  visit(tree, 'containerDirective', (node: any) => {
    if (!ADMONITION_TYPES.includes(node.name)) return

    // In remark-directive v3, [Label] is stored as first child with data.directiveLabel: true
    let title: string | undefined
    if (node.children?.[0]?.data?.directiveLabel) {
      const labelNode = node.children[0]
      title = labelNode.children?.map((c: any) => c.value ?? '').join('') || undefined
      node.children = node.children.slice(1)
    }

    node.data = node.data || {}
    node.data.hName = 'admonition'
    node.data.hProperties = { type: node.name, title }
  })
}
