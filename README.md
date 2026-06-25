# DionesxD — Cyber Security Portfolio

<p align="center">
  <strong>Portfolio interativo estilo terminal Kali Linux</strong><br>
  Next.js 16 · TypeScript · Tailwind CSS 4 · Framer Motion · Lenis
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-purple?logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Zustand-5-orange?logo=data%3Aimage%2Fsvg%2Bxml" alt="Zustand" />
</p>

---

## Sobre

Portfolio de **Johnny Alejandro (DionesxD)** — profissional de TI com 6+ anos de experiência focado em **SOC & Cyber Operations**, infraestrutura de redes e desenvolvimento.

A experiência principal é um **terminal interativo** no estilo Kali Linux, onde o visitante digita comandos para revelar as seções do portfólio uma a uma. Para usuários não-técnicos, existe o botão **"Modo Visual"** que revela tudo de uma vez.

## Como Funciona

### Terminal Interativo

Ao abrir o site, o visitante vê um terminal funcional com prompt `┌──(DionesxD㉿kali)-[~]`. Comandos disponíveis:

| Comando | Ação |
|---|---|
| `help` | Lista todos os comandos |
| `about` | Revela seção Sobre Mim |
| `skills` | Revela seção Skills & Competências |
| `experience` | Revela seção Experiência Profissional |
| `projects` | Revela seção Projetos de Desenvolvimento |
| `infra` | Revela seção Projetos de Infraestrutura |
| `certs` | Revela seção Certificações |
| `contact` | Revela seção Contato |
| `all` | Revela todas as seções de uma vez |
| `neofetch` | System info estilo Linux |
| `whoami` | Informações rápidas |
| `social` | Links para GitHub e LinkedIn |
| `download` | Baixar currículo PDF |

**Comandos simulados (easter eggs):** `nmap`, `ping`, `docker`, `top`/`htop`, `ifconfig`, `git`, `history`, `fact`, `matrix`, `fortune`, `cowsay`, `coffee`, `banner`, `ls`, `pwd`, `uname`, `date`, e mais.

Tentativas como `sudo`, `rm -rf`, `cat /etc/passwd`, `ssh`, `exit` e `hack` retornam mensagens divertidas.

### Modo Visual

Botão no painel lateral para usuários que preferem ver o portfólio completo sem interagir com o terminal.

## Seções do Portfólio

- **Sobre** — Bio profissional com contadores animados e card de idiomas
- **Skills** — Grid de competências técnicas categorizadas (SOC, Infra, Cloud, Dev)
- **Experiência** — Timeline interativa com expand/collapse por vaga
- **Projetos Dev** — Cards com hover effects e lightbox
- **Projetos Infra** — Cards com estilo diferenciado e lightbox
- **Certificações** — Grid com destaque para formação em andamento
- **Contato** — Disponibilidade para trabalhos remotos e presenciais, links e info

## Tech Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | Framework React com App Router |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilização utility-first |
| [shadcn/ui](https://ui.shadcn.com/) | — | Componentes de UI (New York style) |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Animações e transições |
| [Lenis](https://lenis.darkroom.engineering/) | 1.3 | Smooth scroll com easing customizado |
| [Zustand](https://zustand.docs.pmnd.rs/) | 5 | Estado das seções reveladas |
| [Lucide React](https://lucide.dev/) | — | Ícones vetoriais |

## Features

- **Terminal Interativo** — Prompt Kali Linux funcional com ~30 comandos
- **Revelação Progressiva** — Seções aparecem conforme o visitante explora
- **Modo Visual** — Botão para visualização completa sem terminal
- **ASCII Art** — Banner personalizado "DionesxD" no terminal
- **ANSI Renderer** — Parser de códigos de cor ANSI para JSX
- **Histórico de Comandos** — Navegação com setas ↑/↓
- **Preloader** — Tela de carregamento animada
- **Smooth Scroll** — Scroll suave via Lenis
- **Contadores Animados** — Números animam ao entrar na viewport
- **Lightbox de Projetos** — Modal para imagens e GIFs
- **Timeline Expandível** — Experiência com "Ver mais" por vaga
- **100% Responsivo** — Mobile-first com layout adaptativo
- **Tema Dark** — Paleta purple/cyber (#0a0710, #b97aff)
- **Cursor Customizado** — Cursor com spring physics (desktop only)
- **Navbar Dinâmica** — Aparece após primeira interação com o terminal

## Pré-requisitos

- **[Bun](https://bun.sh/)** v1.0+ (runtime e gerenciador de pacotes)

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows (via PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/DionesxD/portfolio.git
cd portfolio

# 2. Instalar dependências
bun install

# 3. Rodar em modo desenvolvimento
bun run dev
```

Acesse **http://localhost:3000** no navegador.

## Scripts

| Comando | Descrição |
|---|---|
| `bun run dev` | Servidor de desenvolvimento (porta 3000) |
| `bun run lint` | Verificar qualidade do código (ESLint) |

## Estrutura do Projeto

```
portfolio/
├── public/
│   ├── logo.svg                # Logo SVG
│   └── robots.txt              # SEO robots
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz (fontes, metadata, tema)
│   │   ├── page.tsx            # Página principal
│   │   └── globals.css         # Estilos globais + tema dark
│   ├── components/
│   │   ├── portfolio/
│   │   │   ├── PortfolioShell.tsx    # Wrapper (Lenis, preloader, seções condicionais)
│   │   │   ├── Navbar.tsx            # Navegação (aparece após interação)
│   │   │   ├── Hero.tsx              # Terminal interativo + painel lateral
│   │   │   ├── About.tsx             # Sobre + contadores animados
│   │   │   ├── AnimatedCounter.tsx   # Contador numérico
│   │   │   ├── Skills.tsx            # Grid de skills
│   │   │   ├── Experience.tsx        # Timeline de experiência
│   │   │   ├── Projects.tsx          # Projetos de Dev
│   │   │   ├── InfraProjects.tsx     # Projetos de Infra
│   │   │   ├── ProjectModal.tsx      # Lightbox de projetos
│   │   │   ├── Certifications.tsx    # Grid de certificações
│   │   │   ├── ContactSection.tsx    # Seção de contato
│   │   │   ├── Footer.tsx            # Rodapé
│   │   │   ├── BackToTop.tsx         # Botão voltar ao topo
│   │   │   ├── ScrollProgress.tsx    # Barra de progresso
│   │   │   ├── Preloader.tsx         # Tela de carregamento
│   │   │   └── CustomCursor.tsx      # Cursor customizado
│   │   └── ui/                       # Componentes shadcn/ui
│   ├── data/
│   │   └── portfolio.ts              # Todos os dados do portfolio
│   ├── types/
│   │   └── portfolio.ts              # Interfaces TypeScript
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   └── use-mobile.ts
│   └── lib/
│       ├── terminal-store.ts         # Zustand store (seções reveladas)
│       ├── db.ts                     # Cliente Prisma
│       └── utils.ts                  # Utilitários (cn, etc.)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

## Personalização

### Dados do Portfolio

Todos os dados pessoais ficam em **`src/data/portfolio.ts`**:

```typescript
contactInfo       // Email, telefone, localização
navItems          // Links do menu
stats             // Números (anos, certificações, foco, local)
skills            // Competências com ícone, título e tags
devProjects       // Projetos de desenvolvimento
infraProjects     // Projetos de infraestrutura
experiences       // Timeline profissional
certifications    // Lista de certificações (highlight para "Em andamento")
languages         // Idiomas
contactLinks      // GitHub, LinkedIn
```

### Adicionar/Remover Comandos do Terminal

Os comandos estão em **`src/components/portfolio/Hero.tsx`** dentro da função `useCommandHandler()`. Cada comando é um bloco `if (base === 'comando')` que chama `addLine()`.

### Paleta de Cores

| Cor | Hex | Uso |
|---|---|---|
| Background | `#0a0710` | Fundo principal |
| Accent | `#b97aff` | Destaques, hover, bordas, CTAs |
| Border | `#1e1630` | Bordas de cards e seções |
| Muted Text | `#6b5f80` | Texto secundário |
| Card Alt | `#110d1a` | Fundo alternativo de cards |

## Deploy

### Vercel (Recomendado)

1. Faça push do projeto para o GitHub
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório
3. O framework **Next.js** será detectado automaticamente
4. Clique em **Deploy**

## Licença

Este projeto é de uso pessoal. Sinta-se livre para usar como inspiração ou template para o seu próprio portfolio.

---

<p align="center">
  Feito com 💜 por <strong>Johnny Alejandro</strong><br>
  <a href="https://github.com/DionesxD">GitHub</a> ·
  <a href="https://linkedin.com/in/johnnyalejandro">LinkedIn</a>
</p>