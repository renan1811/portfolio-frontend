import { fetchAllPages } from './api'

function year(value) {
  const match = String(value ?? '').match(/^\d{4}/)
  return match?.[0] ?? ''
}

function period(item) {
  if (item.periodo) return String(item.periodo)
  if (item.ano) return String(item.ano)

  const start = year(item.data_inicio ?? item.ano_inicio ?? item.inicio)
  const end = year(item.data_fim ?? item.ano_fim ?? item.fim)
  const ongoing = item.atual === true || item.em_andamento === true

  if (ongoing && start) return `${start} — Atual`
  if (start && end && start !== end) return `${start} — ${end}`
  return start || end
}

function readable(value) {
  if (typeof value !== 'string') return ''
  const label = value.trim().replace(/_/g, ' ')
  return label ? label.charAt(0).toUpperCase() + label.slice(1) : ''
}

export async function fetchExperiences({ signal } = {}) {
  const entries = await fetchAllPages('experiencias/', { signal })
  return entries.map((item) => ({
    id: item.id ?? item.slug,
    period: period(item),
    title: item.titulo ?? item.cargo ?? item.funcao ?? '',
    organization: item.organizacao ?? item.empresa ?? item.instituicao ?? '',
    description: item.descricao ?? item.resumo ?? '',
    type: readable(item.tipo),
  }))
}

export async function fetchFormations({ signal } = {}) {
  const entries = await fetchAllPages('formacoes/', { signal })
  return entries.map((item) => ({
    id: item.id ?? item.slug,
    period: period(item),
    course: item.curso ?? item.titulo ?? '',
    institution: item.instituicao ?? item.organizacao ?? '',
    description: item.descricao ?? '',
    status: readable(item.situacao ?? item.status) || (item.em_andamento === true ? 'Em andamento' : ''),
  }))
}

export async function fetchTechnologies({ signal } = {}) {
  const entries = await fetchAllPages('tecnologias/', { signal })
  return entries.map((item) => ({
    id: item.id ?? item.slug ?? item.nome,
    name: item.nome ?? '',
    icon: item.icone ?? '',
  }))
}
