import Link from 'next/link'

const TRACKS = [
  {
    title: 'Python',
    description: 'Zero to Hero — 63 pelajaran dari setup sampai API dan data science.',
    href: '/python/setup/pengenalan-python',
    badge: '63 Pelajaran',
    color: 'border-blue-200 hover:border-blue-400',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Math untuk AI',
    description: 'Aljabar linear, kalkulus, statistik — fondasi matematis machine learning.',
    href: '/math/intro',
    badge: 'Segera',
    color: 'border-purple-200 hover:border-purple-400',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    title: 'Machine Learning',
    description: 'Algoritma klasik hingga ensemble methods, dari teori ke praktik.',
    href: '/ml/intro',
    badge: 'Segera',
    color: 'border-green-200 hover:border-green-400',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    title: 'Deep Learning',
    description: 'Neural networks, CNN, RNN, Transformer — arsitektur modern AI.',
    href: '/dl/intro',
    badge: 'Segera',
    color: 'border-orange-200 hover:border-orange-400',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
]

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Belajar AI dari Nol</h1>
        <p className="mx-auto max-w-xl text-lg text-gray-600">
          Kurikulum terstruktur berbahasa Indonesia. Dari Python dasar sampai Deep Learning —
          gratis, terbuka, dan langsung bisa dipraktikkan.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {TRACKS.map((track) => (
          <Link
            key={track.href}
            href={track.href}
            className={`group rounded-xl border-2 bg-white p-6 transition-colors ${track.color}`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{track.title}</h2>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${track.badgeColor}`}>
                {track.badge}
              </span>
            </div>
            <p className="text-sm text-gray-600">{track.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
