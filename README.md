# KNJ TUR - Estrutura Multipágina Profissional

Este projeto foi configurado com uma arquitetura física de pastas para garantir URLs limpas e SEO máximo.

## Estrutura de Pastas
- `/`: Home Page
- `/visto-americano/index.html`: Página sobre o visto (Acessível via /visto-americano)
- `/consultoria/index.html`: Página de consultoria (Acessível via /consultoria)
- `/blog/index.html`: Listagem de notícias
- `/blog/ees-passo-a-passo/index.html`: Artigo específico

## Deploy no GitHub Pages

Este projeto está pronto para ser hospedado no GitHub Pages.

### Passos para ativar:
1. Suba o código para o seu repositório no GitHub.
2. No GitHub, vá em **Settings** > **Pages**.
3. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
4. O workflow configurado em `.github/workflows/deploy.yml` fará o deploy automático sempre que você fizer um `push` para a branch `main`.

### URLs Limpas
A estrutura de pastas (`/pasta/index.html`) garante que o site funcione com URLs amigáveis (ex: `knjtur.com.br/visto-americano`) sem a necessidade de extensões `.html`.

## Design
- **Cores:** #0A0A0A (Fundo), #FF8C00 (Destaque Laranja).
- **SEO:** Metatags individuais em cada página.
- **Interatividade:** Botão de WhatsApp fixo e links de alta conversão.
