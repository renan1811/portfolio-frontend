export function getApiBase() {
  const configuredUrl = import.meta.env.VITE_API_URL

  if (!configuredUrl) {
    throw new Error('VITE_API_URL não está configurada. Consulte o arquivo .env.example.')
  }

  try {
    const url = new URL(configuredUrl)
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
    return new URL(`${url.pathname.replace(/\/?$/, '/')}`, url.origin)
  } catch {
    throw new Error('VITE_API_URL precisa ser uma URL absoluta válida.')
  }
}

export async function fetchAllPages(endpoint, { signal } = {}) {
  let pageUrl = new URL(endpoint, getApiBase())
  const visited = new Set()
  const entries = []

  while (pageUrl) {
    if (visited.has(pageUrl.href)) {
      throw new Error('A paginação da API retornou uma página repetida.')
    }
    visited.add(pageUrl.href)

    const response = await fetch(pageUrl, { signal, headers: { Accept: 'application/json' } })
    if (!response.ok) {
      throw new Error(`A API retornou HTTP ${response.status} ao carregar ${endpoint}.`)
    }

    const payload = await response.json()
    const pageEntries = Array.isArray(payload) ? payload : payload?.results
    if (!Array.isArray(pageEntries)) {
      throw new Error(`A resposta da API de ${endpoint} tem um formato inesperado.`)
    }
    entries.push(...pageEntries)

    if (Array.isArray(payload)) {
      pageUrl = null
    } else if (payload.next) {
      pageUrl = new URL(payload.next, pageUrl)
    } else if (Number(payload.total_pages) > Number(payload.page)) {
      const nextPage = new URL(pageUrl)
      nextPage.searchParams.set('page', String(Number(payload.page) + 1))
      pageUrl = nextPage
    } else {
      pageUrl = null
    }
  }

  return entries
}
