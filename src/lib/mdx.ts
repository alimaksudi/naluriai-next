import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import rehypePrettyCode from 'rehype-pretty-code'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { remarkAdmonitions } from './remark-admonitions'

// Convert Docusaurus-style ":::tip Catatan Pro" → remark-directive ":::tip[Catatan Pro]"
function preprocessAdmonitions(content: string): string {
  return content.replace(/^(:::)(\w+) (.+)$/gm, '$1$2[$3]')
}

export async function renderMDX(source: string) {
  const preprocessed = preprocessAdmonitions(source)

  return compileMDX({
    source: preprocessed,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkDirective, remarkAdmonitions],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rehypePlugins: [[rehypePrettyCode as any, { theme: 'github-light' }]],
      },
    },
  })
}
