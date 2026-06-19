import { Admonition } from './Admonition'

export const mdxComponents = {
  admonition: ({
    type,
    title,
    children,
  }: {
    type?: string
    title?: string
    children: React.ReactNode
  }) => (
    <Admonition type={type} title={title}>
      {children}
    </Admonition>
  ),
}
