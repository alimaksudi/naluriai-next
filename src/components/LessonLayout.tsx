import { Sidebar } from './Sidebar'
import type { SidebarSection } from '@/lib/content'

interface LessonLayoutProps {
  sidebar: SidebarSection[]
  activePath: string
  title: string
  children: React.ReactNode
}

export function LessonLayout({ sidebar, activePath, title, children }: LessonLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar sections={sidebar} activePath={activePath} />
      <main className="min-w-0 flex-1 px-8 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">{title}</h1>
          <article className="prose prose-gray max-w-none">{children}</article>
        </div>
      </main>
    </div>
  )
}
