import Link from 'next/link'
import type { SidebarSection } from '@/lib/content'

interface SidebarProps {
  sections: SidebarSection[]
  activePath: string
}

export function Sidebar({ sections, activePath }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-gray-50">
      <nav className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {section.title}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded px-2 py-1.5 text-sm ${
                      item.href === activePath
                        ? 'bg-blue-100 font-medium text-blue-700'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
