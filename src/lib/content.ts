import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface SidebarItem {
  title: string
  href: string
}

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

export interface LessonData {
  title: string
  rawContent: string
}

// "00-setup" → "setup", "01_pengenalan_python" → "pengenalan-python"
function slugify(name: string): string {
  return name
    .replace(/^\d{2}[-_]/, '')
    .replace(/_/g, '-')
    .toLowerCase()
}

// "00-setup" → "M0 – Setup"
function formatSectionTitle(dirName: string): string {
  const match = dirName.match(/^(\d{2})[-_](.+)/)
  if (match) {
    const num = parseInt(match[1], 10)
    const label = match[2]
      .replace(/[-_]/g, ' ')
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    return `M${num} – ${label}`
  }
  return dirName
}

function findFileBySlug(dir: string, slug: string): string | null {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isFile() && /\.(mdx|md)$/.test(entry.name)) {
      const base = path.basename(entry.name, path.extname(entry.name))
      if (slugify(base) === slug) return path.join(dir, entry.name)
    }
  }
  return null
}

function findDirBySlug(parentDir: string, slug: string): string | null {
  const entries = fs.readdirSync(parentDir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory() && slugify(entry.name) === slug) {
      return path.join(parentDir, entry.name)
    }
  }
  return null
}

export function getSidebar(track: string): SidebarSection[] {
  const trackDir = path.join(CONTENT_DIR, track)
  if (!fs.existsSync(trackDir)) return []

  const entries = fs.readdirSync(trackDir, { withFileTypes: true })
  const dirs = entries.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))

  if (dirs.length === 0) {
    // Flat track (e.g. math with intro.mdx only)
    const files = entries
      .filter((e) => e.isFile() && /\.(mdx|md)$/.test(e.name))
      .sort((a, b) => a.name.localeCompare(b.name))

    const items: SidebarItem[] = files.map((f) => {
      const filePath = path.join(trackDir, f.name)
      const { data } = matter(fs.readFileSync(filePath, 'utf8'))
      const fileSlug = slugify(path.basename(f.name, path.extname(f.name)))
      return { title: String(data.title || fileSlug), href: `/${track}/${fileSlug}` }
    })

    return [{ title: track.charAt(0).toUpperCase() + track.slice(1), items }]
  }

  return dirs.map((dir) => {
    const dirPath = path.join(trackDir, dir.name)
    const sectionSlug = slugify(dir.name)
    const files = fs
      .readdirSync(dirPath)
      .filter((f) => /\.(mdx|md)$/.test(f))
      .sort()

    const items: SidebarItem[] = files.map((file) => {
      const filePath = path.join(dirPath, file)
      const { data } = matter(fs.readFileSync(filePath, 'utf8'))
      const fileSlug = slugify(path.basename(file, path.extname(file)))
      return {
        title: String(data.title || fileSlug),
        href: `/${track}/${sectionSlug}/${fileSlug}`,
      }
    })

    return { title: formatSectionTitle(dir.name), items }
  })
}

export function getAllSlugs(track: string): string[][] {
  const trackDir = path.join(CONTENT_DIR, track)
  if (!fs.existsSync(trackDir)) return []

  const slugs: string[][] = []
  const entries = fs.readdirSync(trackDir, { withFileTypes: true })
  const dirs = entries.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))

  if (dirs.length === 0) {
    entries
      .filter((e) => e.isFile() && /\.(mdx|md)$/.test(e.name))
      .forEach((f) => {
        slugs.push([slugify(path.basename(f.name, path.extname(f.name)))])
      })
    return slugs
  }

  for (const dir of dirs) {
    const sectionSlug = slugify(dir.name)
    const dirPath = path.join(trackDir, dir.name)
    fs.readdirSync(dirPath)
      .filter((f) => /\.(mdx|md)$/.test(f))
      .sort()
      .forEach((file) => {
        const fileSlug = slugify(path.basename(file, path.extname(file)))
        slugs.push([sectionSlug, fileSlug])
      })
  }

  return slugs
}

export function getLesson(track: string, slug: string[]): LessonData | null {
  const trackDir = path.join(CONTENT_DIR, track)
  if (!fs.existsSync(trackDir)) return null

  let filePath: string | null = null

  if (slug.length === 1) {
    filePath = findFileBySlug(trackDir, slug[0])
  } else if (slug.length === 2) {
    const sectionDir = findDirBySlug(trackDir, slug[0])
    if (sectionDir) filePath = findFileBySlug(sectionDir, slug[1])
  }

  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    title: String(data.title || slug[slug.length - 1]),
    rawContent: content,
  }
}
