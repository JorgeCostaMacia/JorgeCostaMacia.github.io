import type { ImageMetadata } from 'astro';
import { projectIcon } from '../lib/project-icon';

export interface Project {
  name: string;
  icon: ImageMetadata;
  description: string;
  repo: string;
  link?: { label: string; href: string };
}

export interface Profile {
  label: string;
  href: string;
}

const nuget = (id: string) => `https://www.nuget.org/packages/${id}`;
const github = (repo: string) => `https://github.com/JorgeCostaMacia/${repo}`;

export const profiles: Profile[] = [
  { label: 'GitHub', href: 'https://github.com/JorgeCostaMacia' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jorge-costa-macia-842817164/' },
  { label: 'NuGet', href: 'https://www.nuget.org/profiles/JorgeCostaMacia' },
  { label: 'VS Code Marketplace', href: 'https://marketplace.visualstudio.com/publishers/JorgeCostaMacia' },
];

export const person = {
  name: 'Jorge Costa Maciá',
  role: 'Software engineer',
  tagline: 'I build software end to end, from the domain model to the servers it runs on.',
};

export const stack: [string, string][] = [
  [
    'Design',
    'DDD, hexagonal / clean architecture, CQRS, event-driven systems, SOLID, TDD with xUnit and Testcontainers',
  ],
  ['Backend', '.NET / C#, EF Core, PHP / Symfony, messaging (Kafka, RabbitMQ)'],
  ['Identity', 'Keycloak, OAuth 2.0 / OpenID Connect, JWT'],
  ['Frontend', 'JavaScript, TypeScript, HTML / CSS, Angular, Angular Material, Sass / SCSS'],
  ['Data', 'PostgreSQL, MySQL, data pipelines and warehousing'],
  ['Ops', 'Linux, Docker, Kubernetes, Nginx / Apache, Git / GitFlow, CI/CD with GitHub Actions'],
  ['Observability', 'Grafana, Prometheus, Loki'],
  ['AI', 'agent-assisted development with Claude Code, authoring agent skills'],
];

export const libraries: Project[] = [
  {
    name: 'ddd-dotnet',
    icon: projectIcon('ddd-dotnet.svg'),
    description:
      'DDD building blocks: value objects with their validators, aggregates, entities, domain events and a domain exception hierarchy.',
    repo: github('ddd-dotnet'),
    link: { label: 'NuGet', href: 'https://www.nuget.org/packages?q=JorgeCostaMacia.DDD' },
  },
  {
    name: 'bus-dotnet',
    icon: projectIcon('bus-dotnet.svg'),
    description:
      'Transport-agnostic messaging contracts: messages, message contexts and the send / publish bus the transports build on.',
    repo: github('bus-dotnet'),
    link: { label: 'NuGet', href: nuget('JorgeCostaMacia.Bus') },
  },
  {
    name: 'bus-kafka-dotnet',
    icon: projectIcon('bus-kafka-dotnet.svg'),
    description: 'The command / event bus over Kafka, with Quartz-backed delayed retry and health checks.',
    repo: github('bus-kafka-dotnet'),
    link: { label: 'NuGet', href: nuget('JorgeCostaMacia.Bus.Kafka') },
  },
  {
    name: 'bus-rabbitmq-dotnet',
    icon: projectIcon('bus-rabbitmq-dotnet.svg'),
    description: 'The command / event bus over RabbitMQ, with Quartz-backed delayed retry and health checks.',
    repo: github('bus-rabbitmq-dotnet'),
    link: { label: 'NuGet', href: nuget('JorgeCostaMacia.Bus.RabbitMQ') },
  },
  {
    name: 'http-dotnet',
    icon: projectIcon('http-dotnet.svg'),
    description:
      'ASP.NET Core defaults: ProblemDetails with domain metadata, the exception handler, request logging, versioning, OpenAPI.',
    repo: github('http-dotnet'),
    link: { label: 'NuGet', href: nuget('JorgeCostaMacia.Http') },
  },
  {
    name: 'quartz-dotnet',
    icon: projectIcon('quartz-dotnet.svg'),
    description:
      'Quartz.NET extensions: job-execution trace correlation, clustered Postgres store defaults and Serilog listeners.',
    repo: github('quartz-dotnet'),
    link: { label: 'NuGet', href: nuget('JorgeCostaMacia.Quartz') },
  },
  {
    name: 'serilog-dotnet',
    icon: projectIcon('serilog-dotnet.svg'),
    description:
      'A Serilog baseline in one call: log context, thread, process and exception enrichers, the application name and version.',
    repo: github('serilog-dotnet'),
    link: { label: 'NuGet', href: nuget('JorgeCostaMacia.Serilog') },
  },
];

export const tools: Project[] = [
  {
    name: 'gitflow-vscode',
    icon: projectIcon('gitflow-vscode.png'),
    description:
      'GitFlow for VS Code on pure git: features, bugfixes, releases and hotfixes, SemVer tags and a transactional finish.',
    repo: github('gitflow-vscode'),
    link: {
      label: 'Marketplace',
      href: 'https://marketplace.visualstudio.com/items?itemName=JorgeCostaMacia.gitflow-vscode',
    },
  },
  {
    name: 'skills',
    icon: projectIcon('skills.svg'),
    description:
      'Agent skills for AI coding agents: GitFlow, SOLID, clean architecture, DDD, testing and .NET, as a Claude Code marketplace.',
    repo: github('skills'),
  },
];
