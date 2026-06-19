const CONFIG = {
  tip: {
    label: 'TIP',
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50',
    title: 'text-emerald-700',
    body: 'text-emerald-900',
  },
  note: {
    label: 'NOTE',
    border: 'border-l-blue-500',
    bg: 'bg-blue-50',
    title: 'text-blue-700',
    body: 'text-blue-900',
  },
  info: {
    label: 'INFO',
    border: 'border-l-sky-500',
    bg: 'bg-sky-50',
    title: 'text-sky-700',
    body: 'text-sky-900',
  },
  warning: {
    label: 'WARNING',
    border: 'border-l-amber-500',
    bg: 'bg-amber-50',
    title: 'text-amber-700',
    body: 'text-amber-900',
  },
  danger: {
    label: 'DANGER',
    border: 'border-l-red-500',
    bg: 'bg-red-50',
    title: 'text-red-700',
    body: 'text-red-900',
  },
  caution: {
    label: 'CAUTION',
    border: 'border-l-orange-500',
    bg: 'bg-orange-50',
    title: 'text-orange-700',
    body: 'text-orange-900',
  },
} as const

type AdmonitionType = keyof typeof CONFIG

export function Admonition({
  type = 'note',
  title,
  children,
}: {
  type?: string
  title?: string
  children: React.ReactNode
}) {
  const cfg = CONFIG[(type as AdmonitionType) in CONFIG ? (type as AdmonitionType) : 'note']
  const displayTitle = title || cfg.label

  return (
    <div
      className={`not-prose my-4 rounded-r-lg border-l-4 ${cfg.border} ${cfg.bg} px-4 py-3`}
    >
      <div className={`mb-1 text-xs font-bold uppercase tracking-wider ${cfg.title}`}>
        {displayTitle}
      </div>
      <div className={`prose prose-sm max-w-none ${cfg.body}`}>{children}</div>
    </div>
  )
}
