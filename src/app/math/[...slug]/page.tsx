import { notFound } from 'next/navigation'
import { LessonLayout } from '@/components/LessonLayout'
import { getLesson, getSidebar, getAllSlugs } from '@/lib/content'
import { renderMDX } from '@/lib/mdx'

export async function generateStaticParams() {
  return getAllSlugs('math').map((slug) => ({ slug }))
}

export const dynamicParams = false

export default async function MathLessonPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const lesson = getLesson('math', slug)
  if (!lesson) notFound()

  const { content } = await renderMDX(lesson.rawContent)
  const sidebar = getSidebar('math')
  const activePath = `/math/${slug.join('/')}`

  return (
    <LessonLayout sidebar={sidebar} activePath={activePath} title={lesson.title}>
      {content}
    </LessonLayout>
  )
}
