import { Project, Skill, TimelineItem, Education } from '@/types'

export const defaultProjects: Project[] = [
  { id: '1', title: 'Proyecto Web', description: 'Aplicación web con React, diseño responsive y API integrada.', icon: '🌐', tags: ['React','CSS3','API REST'], demo_url: '#', github_url: '#', order: 1 },
  { id: '2', title: 'Landing Page', description: 'Página de aterrizaje optimizada con animaciones CSS y alta conversión.', icon: '📱', tags: ['HTML','CSS','JavaScript'], demo_url: '#', github_url: '#', order: 2 },
  { id: '3', title: 'Dashboard Admin', description: 'Panel de administración con gráficas, tablas dinámicas y modo oscuro.', icon: '⚡', tags: ['React','Node.js','Chart.js'], demo_url: '#', github_url: '#', order: 3 },
]

export const defaultSkills: Skill[] = [
  { id: '1', name: 'HTML / CSS',    percentage: 95, category: 'frontend' },
  { id: '2', name: 'JavaScript',    percentage: 90, category: 'frontend' },
  { id: '3', name: 'React',         percentage: 85, category: 'frontend' },
  { id: '4', name: 'Git / GitHub',  percentage: 88, category: 'tools' },
  { id: '5', name: 'Figma / UI-UX', percentage: 80, category: 'tools' },
  { id: '6', name: 'Node.js',       percentage: 70, category: 'tools' },
]

export const defaultTimeline: TimelineItem[] = [
  { id: '1', company: 'UABCS',      role: 'Desarrollador', period: '2024-25', description: '"SEAES" Desarrollo de sistema SEAES, participé en Diseño UI y QA.', order: 1 },
  { id: '2', company: 'FreeLancer', role: 'Desarrollador', period: '2025-26', description: '"AccesPoint" Desarrollo de sistema de control de acceso y diseño UI.', order: 2 },
  { id: '3', company: 'FreeLancer', role: 'Desarrollador', period: '2026',    description: '"Gestor de Archivos" desarrollo de interfaces, diseño UI, Frontend.', order: 3 },
]

export const defaultEducation: Education[] = [
  { id: '1', title: 'Ingeniería en Desarrollo de Software (2024)', description: 'Especialidad en tecnologías web y móvil, desarrollo de software.', year: '2024', icon: '🎓' },
  { id: '2', title: 'Certificación — Plataforma (2026)',           description: 'Certificación en desarrollo web moderno.', year: '2026', icon: '📜' },
]
