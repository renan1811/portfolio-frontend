# Portfolio Frontend

Estrutura inicial do frontend com Vue 3, Vite, Vue Router, Tailwind CSS e lucide-vue-next. A rota `/` contém somente uma página para verificar o ambiente.

## Requisitos

- Node.js 22.18+ ou 24.12+
- npm

## Executar localmente

```powershell
npm install
npm run dev
```

Acesse <http://localhost:5173/>.

## Build de produção

```powershell
npm run build
```

O build é gerado em `dist/`. Tailwind CSS 4 usa o plugin `@tailwindcss/vite` e a diretiva `@import "tailwindcss"` em `src/style.css`.
