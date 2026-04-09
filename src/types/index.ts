export interface Project {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
  demo_url?: string
  github_url?: string
  order: number
}

export interface Skill {
  id: string
  name: string
  percentage: number
  category: 'frontend' | 'tools'
}

export interface TimelineItem {
  id: string
  company: string
  role: string
  period: string
  description: string
  order: number
}

export interface Education {
  id: string
  title: string
  description: string
  year: string
  icon: string
}

export interface Contact {
  id: string
  email: string
  linkedin_url: string
  github_url: string
  intro: string
}

export interface SiteData {
  projects: Project[]
  skills: Skill[]
  timeline: TimelineItem[]
  education: Education[]
  contact: Contact | null
}
