import { notFound } from 'next/navigation'
import { LessonLayout } from '@/components/LessonLayout'
import { getLesson, getSidebar, getAllSlugs } from '@/lib/content'
import { renderMDX } from '@/lib/mdx'

export async function generateStaticParams() {
  return getAllSlugs('dl').map((slug) => ({ slug }))
}

export const dynamicParams = false

export default async function DlLessonPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const lesson = getLesson('dl', slug)
  if (!lesson) notFound()

  const { content } = await renderMDX(lesson.rawContent)
  const sidebar = getSidebar('dl')
  const activePath = `/dl/${slug.join('/')}`

  return (
    <LessonLayout sidebar={sidebar} activePath={activePath} title={lesson.title}>
      {content}
    </LessonLayout>
  )
}
