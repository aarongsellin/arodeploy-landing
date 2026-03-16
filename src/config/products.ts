export interface ProductHighlight {
  title: string;
  body: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Raw SVG child elements (paths, rects, etc.) rendered inside viewBox="0 0 34 34" */
  iconPaths: string;
  highlights: ProductHighlight[];
}

export const products: Product[] = [
  {
    slug: "deployments",
    name: "Deployments",
    tagline: "Zero-downtime releases with automatic rollback.",
    description:
      "Blue/green deployments spin up a new instance, pass your custom health checks, and then cut traffic — keeping the previous version live until the switch is confirmed. Roll back to any prior release in a single action.",
    iconPaths:
      '<rect x="5" y="13" width="11" height="11" stroke="currentColor" stroke-width="1.5"/>' +
      '<rect x="18" y="13" width="11" height="11" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M10.5 13V10M23.5 13V10M10.5 24v3M23.5 24v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>' +
      '<path d="M16 18.5h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>',
    highlights: [
      {
        title: "Blue / Green Releases",
        body: "Replace this with a detailed explanation of how zero-downtime blue/green deploys work on AroDeploy.",
      },
      {
        title: "Custom Health Checks",
        body: "Describe how to configure health check endpoints and the pass/fail criteria that control traffic cutover.",
      },
      {
        title: "Instant Rollback",
        body: "Explain how users can roll back to any previous release with a single action and what state is preserved.",
      },
      {
        title: "Release History",
        body: "Detail the release log — what metadata is stored per deployment and how long history is retained.",
      },
    ],
  },
  {
    slug: "preview-environments",
    name: "Preview Environments",
    tagline: "A live URL for every push, every branch.",
    description:
      "Every push to any branch creates an isolated preview environment with a unique subdomain. Test, review, and share changes before they ever touch production — with separate credentials and config.",
    iconPaths:
      '<path d="M5 24l8-9 5 5 5-7 6 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>' +
      '<rect x="5" y="7" width="24" height="3" stroke="currentColor" stroke-width="1.5"/>',
    highlights: [
      {
        title: "Automatic Subdomain",
        body: "Replace this with detail on how preview subdomains are generated (branch name, PR number, etc.) and managed.",
      },
      {
        title: "Isolated Credentials",
        body: "Explain how each preview environment gets its own env vars, secrets, and optionally a fresh database.",
      },
      {
        title: "Ephemeral Lifecycle",
        body: "Describe the auto-teardown policy when a branch is deleted or a PR is merged, and how to pin environments.",
      },
      {
        title: "Share & Review",
        body: "Detail the URL-sharing model, access controls, and how reviewers can interact with a preview deployment.",
      },
    ],
  },
  {
    slug: "multi-service-projects",
    name: "Multi-Service Projects",
    tagline: "Your entire stack in one project on a shared private network.",
    description:
      "Group your frontend, API, workers, and databases into a single project. Services communicate privately without leaving the deployment network, with shared env management and independent scaling.",
    iconPaths:
      '<rect x="5" y="8" width="14" height="9" stroke="currentColor" stroke-width="1.5"/>' +
      '<rect x="5" y="21" width="14" height="6" stroke="currentColor" stroke-width="1.5"/>' +
      '<rect x="22" y="8" width="7" height="19" stroke="currentColor" stroke-width="1.5"/>',
    highlights: [
      {
        title: "Private Networking",
        body: "Replace this with detail on the private network that connects services within a project, with no public exposure between them.",
      },
      {
        title: "Shared Environment",
        body: "Describe how environment variables and secrets can be scoped at project level or overridden per service.",
      },
      {
        title: "Service Dependencies",
        body: "Explain how services can declare startup order and wait on dependencies before accepting traffic.",
      },
      {
        title: "Independent Scaling",
        body: "Detail how each service can be resized individually without affecting other services in the project.",
      },
    ],
  },
  {
    slug: "build-system",
    name: "Build System",
    tagline: "Auto-detected, zero-config builds with smart layer caching.",
    description:
      "AroDeploy detects your project type and selects the right build pipeline automatically. Drop in a Dockerfile or custom build script when you need full control. Builds are cached per layer — only changed layers rebuild.",
    iconPaths:
      '<path d="M5 29V12l12-7 12 7v17" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>' +
      '<rect x="12" y="20" width="10" height="9" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M17 20v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>',
    highlights: [
      {
        title: "Automatic Detection",
        body: "Replace this with a list of which runtimes, frameworks, and project structures are auto-detected.",
      },
      {
        title: "Custom Build Config",
        body: "Explain how users can supply a Dockerfile, Nixpacks config, or build script for full control over the pipeline.",
      },
      {
        title: "Layer Caching",
        body: "Detail the caching model — how layers are stored, invalidated, and how it affects typical build times.",
      },
      {
        title: "Build Logs & Streaming",
        body: "Describe the build log viewer, real-time streaming, and log retention policy.",
      },
    ],
  },
  {
    slug: "databases",
    name: "Databases & Storage",
    tagline:
      "Open-source databases, persistent volumes, and automated backups.",
    description:
      "Deploy Postgres, Redis, Meilisearch and more as one-click add-ons on the same private network as your services. Automated backups ship to object storage on a schedule you control. IOPS and disk usage metrics are surfaced per service.",
    iconPaths:
      '<ellipse cx="17" cy="9" rx="11" ry="3.5" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M6 9v6c0 1.93 4.92 3.5 11 3.5S28 16.93 28 15V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>' +
      '<path d="M6 15v6c0 1.93 4.92 3.5 11 3.5S28 22.93 28 21v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>',
    highlights: [
      {
        title: "One-Click Add-Ons",
        body: "Replace this with the full list of supported databases and how to add them to any project from the console.",
      },
      {
        title: "Automated Backups",
        body: "Describe the backup schedule options, retention periods, storage destination, and how to trigger a restore.",
      },
      {
        title: "Persistent Volumes",
        body: "Explain how persistent volumes attach to services, size limits per plan, and data durability guarantees.",
      },
      {
        title: "IOPS & Disk Metrics",
        body: "Detail the IOPS throughput metrics, disk usage graphs, and alerting thresholds available per service.",
      },
    ],
  },
  {
    slug: "security",
    name: "Security",
    tagline:
      "Firewall management, IPS, and hardened environments — out of the box.",
    description:
      "AroDeploy manages firewall rules, installs intrusion prevention, and locks down each deployment environment automatically. Every deployment runs isolated with no shared kernel surfaces between tenants.",
    iconPaths:
      '<path d="M5 27V16l6-9h12l6 9v11" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>' +
      '<path d="M5 20h24" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>' +
      '<path d="M14 27v-7h6v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>',
    highlights: [
      {
        title: "Managed Firewall",
        body: "Replace this with detail on the default firewall rules AroDeploy applies and how users can customise ingress/egress.",
      },
      {
        title: "Intrusion Prevention",
        body: "Detail the IPS system, what attack patterns it blocks, and how incidents are surfaced in the console.",
      },
      {
        title: "Environment Isolation",
        body: "Explain the isolation model between tenants — no shared kernel, no shared filesystem, no side-channel risk.",
      },
      {
        title: "TLS & Secrets",
        body: "Describe automatic TLS provisioning for all domains, and the secrets management model (encryption at rest, access scoping).",
      },
    ],
  },
];
