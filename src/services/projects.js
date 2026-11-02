import { fetchAllPages, getApiBase } from './api'

function mediaUrl(path, apiBase) {
  if (!path) return null

  try {
    const value = String(path).trim()
    if (!value) return null
    const url = /^https?:\/\//i.test(value) || value.startsWith('//')
      ? new URL(value, apiBase)
      : new URL(value.replace(/^\/+/, ''), apiBase.origin + '/')
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

function externalUrl(value) {
  if (!value) return null

  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

function mapProject(project, apiBase) {
  return {
    id: project.id ?? project.slug,
    title: project.titulo,
    summary: project.resumo,
    year: project.ano,
    imageUrl: mediaUrl(project.imagem, apiBase),
    technologies: Array.isArray(project.tecnologias)
      ? project.tecnologias
          .filter((technology) => technology && typeof technology === 'object' && technology.nome)
          .map((technology) => ({
            id: technology.id ?? technology.slug ?? technology.nome,
            name: technology.nome,
            icon: technology.icone,
          }))
      : [],
    githubUrl: externalUrl(project.url_github),
    demoUrl: externalUrl(project.url_demo),
  }
}

export async function fetchProjects({ signal } = {}) {
  const apiBase = getApiBase()
  const projects = await fetchAllPages('projetos/', { signal })
  return projects.map((project) => mapProject(project, apiBase))
}
