import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Python', href: '/python/setup/pengenalan-python' },
  { label: 'Math', href: '/math/intro' },
  { label: 'Machine Learning', href: '/ml/intro' },
  { label: 'Deep Learning', href: '/dl/intro' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-6 px-4">
        <Link href="/" className="font-bold text-gray-900">
          NaluriAI
        </Link>
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
