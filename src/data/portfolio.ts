import type {
  NavItem,
  Stat,
  Skill,
  Project,
  Experience,
  Certification,
  Language,
  ContactInfo,
  ContactLink,
} from '@/types/portfolio';

// ─── Contact Info ────────────────────────────────────────────
export const contactInfo: ContactInfo = {
  email: 'johnnyalejandroinfo@gmail.com',
  phone: '(21) 97390-4882',
  location: 'Rio de Janeiro, RJ',
  github: 'https://github.com/DionesxD',
  linkedin: 'https://linkedin.com/in/johnnyalejandro',
};

// ─── Navigation ──────────────────────────────────────────────
export const navItems: NavItem[] = [
  { name: 'Sobre', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experiência', href: '#experience' },
  { name: 'Dev', href: '#dev' },
  { name: 'Infra', href: '#infra' },
  { name: 'Certs', href: '#certs' },
  { name: 'Contato', href: '#contact' },
];

// ─── Stats ────────────────────────────────────────────────────
export const stats: Stat[] = [
  { value: '7+', label: 'de Experiência', numericValue: 7, suffix: '+' },
  { value: '10', label: 'Certificações', numericValue: 10 },
  { value: 'SOC', label: 'Foco em Cyber Ops' },
  { value: 'RJ', label: 'Rio de Janeiro' },
];

// ─── Skills (alinhadas ao currículo real) ─────────────────────
export const skills: Skill[] = [
  {
    icon: '🛡️',
    title: 'Segurança Defensiva & SOC',
    description:
      'Monitoramento de segurança com SIEM/Wazuh, análise de logs, investigação e resposta a incidentes, gestão de vulnerabilidades e hardening de sistemas.',
    tags: ['SIEM / Wazuh', 'Análise de Logs', 'Incident Response', 'Endpoint Security', 'Hardening', 'Gestão de Vulnerabilidades'],
  },
  {
    icon: '🖥️',
    title: 'Infraestrutura & Redes',
    description:
      'Administração de Active Directory, Windows Server e Linux (Ubuntu/Debian). Configuração de DNS, DHCP, TCP/IP e servidores de arquivos.',
    tags: ['Active Directory', 'Windows Server', 'Linux', 'TCP/IP', 'DNS / DHCP', 'File Server'],
  },
  {
    icon: '🔥',
    title: 'Segurança de Perímetro',
    description:
      'Gerenciamento avançado de firewall pfSense, implementação de VPNs de alta segurança (WireGuard, OpenVPN) e controle de políticas de acesso.',
    tags: ['pfSense', 'WireGuard', 'OpenVPN', 'Firewall', 'Roteamento', 'Comutação'],
  },
  {
    icon: '☁️',
    title: 'Cloud & Soluções Corporativas',
    description:
      'Administração Microsoft 365, migrações SharePoint Online, AWS Lightsail, virtualização e containers Docker para ambientes isolados.',
    tags: ['Microsoft 365', 'SharePoint Online', 'AWS Lightsail', 'Docker', 'Virtualização', 'TOTVS Protheus'],
  },
  {
    icon: '📊',
    title: 'Processos & Governança de TI',
    description:
      'Metodologia ITSM com foco em SLA, gestão de incidentes via Zammad, documentação técnica de topologias e playbooks de segurança.',
    tags: ['ITSM', 'Zammad', 'SLA', 'Playbooks', 'Documentação Técnica', 'ADVPL / SQL'],
  },
  {
    icon: '💻',
    title: 'Desenvolvimento & Automação',
    description:
      'Scripts de automação em PowerShell e Python, desenvolvimento ADVPL para ERP TOTVS Protheus e projetos front-end com HTML/CSS/JS.',
    tags: ['Python', 'PowerShell', 'ADVPL', 'SQL', 'HTML/CSS/JS', 'Java'],
  },
];

// ─── Dev Projects ─────────────────────────────────────────────
export const devProjects: Project[] = [
  {
    id: '1',
    num: '001',
    title: 'Instalador de Programas Essenciais',
    description:
      'Script PowerShell que automatiza a instalação de programas essenciais no Windows — zero trabalho manual ao configurar uma nova máquina.',
    tags: ['PowerShell', 'Windows', 'Automação'],
    url: 'https://github.com/DionesxD/InstaladorProgramasEssenciais',
    icon: '⚡',
    images: ['/projetos/dev-001-instalador.png',
            '/projetos/dev-001-instalador2.png',
            '/projetos/dev-001-instalador3.png',
            '/projetos/dev-001-instalador4.png',
    ],
  },
  {
    id: '2',
    num: '002',
    title: 'Order Summary Page',
    description:
      'Página de resumo de pedido criada a partir de desafio front-end, com foco em fidelidade ao design, responsividade e boas práticas de CSS.',
    tags: ['HTML', 'CSS', 'Frontend'],
    url: 'https://github.com/DionesxD/Projeto_ResumoPedido',
    icon: '🛒',
    images: ['/projetos/dev-002-ordersummary.png'],
  },
  {
    id: '3',
    num: '003',
    title: 'Sistema de Consulta de CEP',
    description:
      'Sistema que retorna endereço completo a partir de um CEP fornecido, integrando dados externos de forma prática e rápida.',
    tags: ['Pascal', 'API', 'Consulta'],
    url: 'https://github.com/DionesxD/Sistema-de-Consulta-CEP',
    icon: '📍',
    images: ['/projetos/dev-003-consultacep.png',
              '/projetos/dev-003-consultacep2.png',
    ],
  },
  {
    id: '4',
    num: '004',
    title: 'Sistema Financeiro',
    description:
      'Sistema financeiro desktop em Delphi/Pascal com controle de receitas e despesas, desenvolvido com base em videoaulas práticas.',
    tags: ['Delphi', 'Pascal', 'Desktop'],
    url: 'https://github.com/DionesxD/SISTEMA_FINANCEIRO',
    icon: '💰',
    images: ['/projetos/dev-004-sistemafinanceiro.png',
            '/projetos/dev-004-sistemafinanceiro2.png',
            '/projetos/dev-004-sistemafinanceiro3.png',
            '/projetos/dev-004-sistemafinanceiro4.png',
            '/projetos/dev-004-sistemafinanceiro5.png',
            '/projetos/dev-004-sistemafinanceiro6.png',
            '/projetos/dev-004-sistemafinanceiro7.png',
            '/projetos/dev-004-sistemafinanceiro8.png',
            '/projetos/dev-004-sistemafinanceiro9.png',
            '/projetos/dev-004-sistemafinanceiro10.png',
            ],
  },
  {
    id: '5',
    num: '005',
    title: 'Pokédex',
    description:
      'Pokédex interativa em HTML, CSS e JavaScript puro, consumindo a PokéAPI para exibir informações dos Pokémons dinamicamente.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/DionesxD/Pokedex',
    icon: '⚪',
    images: ['/projetos/],
  },
  {
    id: '6',
    num: '006',
    title: 'Gestão de Alunos — Java',
    description:
      'Sistema de cadastro e gerenciamento de alunos em Java, com foco em orientação a objetos e operações CRUD.',
    tags: ['Java', 'OOP', 'CRUD'],
    url: 'https://github.com/DionesxD/GestaodeAlunos_Java',
    icon: '🎓',
    images: ['/projetos/dev-006-gestaoalunosjava.png'],
  },
];

// ─── Infra Projects ───────────────────────────────────────────
export const infraProjects: Project[] = [
  {
    id: '7',
    num: '001',
    title: 'CFTV & Alarme em Lojas',
    description:
      'Implementação completa de sistemas de câmeras e alarmes em ambientes comerciais — instalação, comissionamento e relatórios técnicos.',
    tags: ['CFTV', 'Alarme', 'Cabeamento'],
    url: '#',
    icon: '📹',
  },
  {
    id: '8',
    num: '002',
    title: 'Redes Corporativas',
    description:
      'Configuração de redes com Switches gerenciáveis, Routerboards Mikrotik e Firewalls para ambientes corporativos e educacionais.',
    tags: ['Switches', 'Mikrotik RB', 'Firewall', 'TCP/IP'],
    url: '#',
    icon: '🌐',
  },
  {
    id: '9',
    num: '003',
    title: 'Gestão de Inventário de TI',
    description:
      'Mapeamento, controle e gerenciamento de ativos de TI — hardware, licenças e infraestrutura — com manutenção preventiva e corretiva.',
    tags: ['Inventário', 'Help Desk', 'Manutenção', 'Hardware'],
    url: '#',
    icon: '🗂️',
  },
  {
    id: '10',
    num: '004',
    title: 'Laboratório & Cabeamento',
    description:
      'Gestão de laboratórios de informática, cabeamento estruturado e suporte técnico para turmas de até 30 alunos no IOS.',
    tags: ['Cabeamento', 'Laboratório', 'Redes', 'Suporte'],
    url: '#',
    icon: '🔌',
  },
];

// ─── Experience (do currículo) ────────────────────────────────
export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Assistente de TI — Especialista em Suporte N2/N3 & Infraestrutura',
    company: 'Clima Rio',
    location: 'Rio de Janeiro, RJ',
    period: 'Set 2025 – Presente',
    isCurrent: true,
    bullets: [
      'Liderança técnica no atendimento de 10 a 20 chamados diários de alta complexidade (N2/N3) em infraestrutura, conectividade e ERP TOTVS Protheus via Zammad, mantendo SLA acima de 95%.',
      'Administração ativa e hardening de servidores corporativos baseados em Active Directory, Windows Server e Linux.',
      'Monitoramento contínuo da saúde de ativos com Zabbix, estruturando alertas preditivos para evitar indisponibilidade.',
      'Gerenciamento avançado de regras de firewall pfSense e controle de políticas de acesso internas e externas.',
      'Análise de logs e auditorias para investigação ativa de incidentes e correção de vulnerabilidades estruturais.',
      'Migração de File Server local para SharePoint Online e transição do LibreOffice para Microsoft 365.',
      'Deploy em nuvem de plataforma ITSM escalável utilizando AWS Lightsail e Docker em ambientes isolados.',
    ],
  },
  {
    id: '2',
    role: 'Professor de Tecnologia da Informação & Infraestrutura',
    company: 'IOS — Instituto da Oportunidade Social',
    location: 'Rio de Janeiro, RJ',
    period: 'Mai 2021 – Set 2023',
    bullets: [
      'Instrução técnica em Arquitetura de Redes, Infraestrutura de TI, Manutenção de Sistemas e Suporte Técnico Operacional.',
      'Administração, governança e segurança cibernética dos laboratórios de informática.',
      'Elaboração de material didático voltado a cenários reais de mercado com simulação prática de incidentes.',
    ],
  },
  {
    id: '3',
    role: 'Analista de Infraestrutura de TI (Freelancer)',
    company: 'ANNCLAU 360INFRA',
    location: 'Rio de Janeiro, RJ',
    period: 'Set 2022 – Out 2022',
    bullets: [
      'Desenho técnico, mapeamento físico/lógico e levantamento de vulnerabilidades em topologias de rede corporativas com Cisco Packet Tracer.',
      'Implantação ponta a ponta de CFTV digital, sensores perimetrais e sistemas de alarmes integrados.',
      'Desenvolvimento de projetos customizados de conectividade conforme escopos técnicos rigorosos.',
    ],
  },
  {
    id: '4',
    role: 'Estagiário de Suporte Técnico em Hardware e Redes',
    company: 'Microcamp',
    location: 'Rio de Janeiro, RJ',
    period: 'Mar 2019 – Mar 2020',
    bullets: [
      'Diagnóstico avançado e manutenção corretiva/preventiva de hardware de estações e servidores corporativos.',
      'Suporte técnico ao usuário final, resolvendo falhas de SO, conectividade lógica e acessos a serviços locais.',
      'Criação de guias técnicos e documentações para otimização da resolução de problemas recorrentes.',
    ],
  },
];

// ─── Certifications (completas do currículo) ─────────────────
export const certifications: Certification[] = [
  {
    name: 'Certified Red Team Operations Management (CRTOM)',
    issuer: 'Red Team Leaders',
    date: 'DEZ 2025',
  },
  {
    name: 'Cyber Academy 2ª Edição',
    issuer: 'FEBRABAN Cyber Lab',
    date: 'DEZ 2025',
  },
  {
    name: 'CyberSecurity Career Start Certification',
    issuer: 'Hack & Fix',
    date: 'JAN 2026',
  },
  {
    name: 'Fundamentos de Cibersegurança',
    issuer: 'Cisco Networking Academy',
    date: '2025',
  },
  {
    name: 'Segurança de Endpoints (Endpoint Security)',
    issuer: 'Cisco Networking Academy',
    date: '2025',
  },
  {
    name: 'Fundamentos de Redes de Computadores',
    issuer: 'Cisco Networking Academy',
    date: '2025',
  },
  {
    name: 'Bootcamp TOTVS — Eng. de Dados & Machine Learning',
    issuer: 'DIO / TOTVS',
    date: 'MAR 2026',
  },
  {
    name: 'Análise de Dados e Big Data',
    issuer: 'Centro Universitário IBMR',
    date: 'ABR 2025',
  },
  {
    name: 'Introduction to Cyber Attacks — NYU',
    issuer: 'Coursera',
    date: 'JUL 2021',
  },
  {
    name: 'Ciência da Computação (Bacharelado)',
    issuer: 'Centro Universitário IBMR',
    date: '2022 – DEZ 2026 (em andamento)',
    highlight: true,
  },
  {
    name: 'Formação Técnica em Informática e Hardware',
    issuer: 'Microcamp',
    date: 'Concluído JAN 2020',
  },
];

// ─── Languages ────────────────────────────────────────────────
export const languages: Language[] = [
  { name: 'Português', level: 'Nativo', flag: '🇧🇷' },
  { name: 'Inglês', level: 'Intermediário Alto', flag: '🇺🇸' },
  { name: 'Espanhol', level: 'Básico', flag: '🇪🇸' },
];

// ─── Contact Links ───────────────────────────────────────────
export const contactLinks: ContactLink[] = [
  { name: 'GitHub', href: 'https://github.com/DionesxD', icon: 'github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/johnnyalejandro', icon: 'linkedin' },
];