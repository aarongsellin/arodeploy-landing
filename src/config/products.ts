export interface ProductHighlight {
  title: string;
  body: string;
}

export interface ProductStep {
  title: string;
  body: string;
}

export interface ProductSpec {
  property: string;
  trial: string;
  pro: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Raw SVG child elements (paths, rects, etc.) rendered inside viewBox="0 0 34 34" */
  iconPaths: string;
  highlights: ProductHighlight[];
  howItWorks: {
    intro: string;
    steps: ProductStep[];
  };
  specs: ProductSpec[];
}

export const products: Product[] = [
  {
    slug: 'deployments',
    name: 'Deployments',
    tagline: 'Zero-downtime releases with automatic rollback.',
    description:
      'Blue/green deployments spin up a new instance, pass your custom health checks, and then cut traffic — keeping the previous version live until the switch is confirmed. Roll back to any prior release in a single action.',
    iconPaths:
      '<rect x="5" y="13" width="11" height="11" stroke="currentColor" stroke-width="1.5"/>' +
      '<rect x="18" y="13" width="11" height="11" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M10.5 13V10M23.5 13V10M10.5 24v3M23.5 24v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>' +
      '<path d="M16 18.5h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>',
    highlights: [
      {
        title: 'Blue / Green Releases',
        body: 'When you push, AroDeploy builds a fresh image and starts a new container alongside the current live one. Traffic stays on the old container until the new one is confirmed healthy. The old container is kept warm for one minute after cutover — so a rollback is instant, not a rebuild.',
      },
      {
        title: 'Custom Health Checks',
        body: 'Configure an HTTP endpoint, a TCP port probe, or a shell command as your health check. Set the polling interval, timeout, and the number of consecutive passes required before traffic is cut over. Deployments that never pass are automatically cancelled and the previous release stays live.',
      },
      {
        title: 'Instant Rollback',
        body: 'Every release is preserved in the release log. Roll back to any previous version from the console or via the CLI with a single command. The same blue/green process runs in reverse — the old image is re-promoted without a rebuild, so rollback completes in seconds.',
      },
      {
        title: 'Release History',
        body: 'The console shows a full log of every deployment: commit SHA, author, branch, timestamp, build duration, health check outcome, and the reason for any failure. Releases are retained for 90 days on Trial and indefinitely on Pro.',
      },
    ],
    howItWorks: {
      intro:
        'Every push to a tracked branch triggers the full deployment pipeline. The process is fully automatic — no manual promotion steps, no SSH, no scripts to maintain.',
      steps: [
        {
          title: 'Push to git',
          body: 'AroDeploy watches your connected repository via webhook. Any push to a tracked branch — or a manual trigger from the console or CLI — starts the pipeline.',
        },
        {
          title: 'Build & image',
          body: 'The build pipeline compiles your code, runs your defined build steps, and packages the output as a container image. Cached layers from prior builds are reused where possible.',
        },
        {
          title: 'Health check',
          body: 'The new container starts alongside the live one. AroDeploy polls your configured health endpoint on the defined interval until it returns success for the required number of consecutive passes.',
        },
        {
          title: 'Atomic traffic cutover',
          body: 'Once healthy, the load balancer atomically switches all traffic to the new container. The previous container remains warm for 60 seconds — available for instant rollback — then shuts down cleanly.',
        },
      ],
    },
    specs: [
      { property: 'Health check interval', trial: '5 s (configurable)', pro: '5 s (configurable)' },
      { property: 'Consecutive passes required', trial: '3 (configurable)', pro: '3 (configurable)' },
      { property: 'Deployment timeout', trial: '10 min', pro: '30 min' },
      { property: 'Concurrent deployments per service', trial: '1', pro: '1' },
      { property: 'Release history retention', trial: '90 days', pro: 'Indefinite' },
      { property: 'Rollback to any prior release', trial: '✓', pro: '✓' },
    ],
  },
  {
    slug: 'preview-environments',
    name: 'Preview Environments',
    tagline: 'A live URL for every push, every branch.',
    description:
      'Every push to any branch creates an isolated preview environment with a unique subdomain. Test, review, and share changes before they ever touch production — with separate credentials and config.',
    iconPaths:
      '<path d="M5 24l8-9 5 5 5-7 6 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>' +
      '<rect x="5" y="7" width="24" height="3" stroke="currentColor" stroke-width="1.5"/>',
    highlights: [
      {
        title: 'Automatic Subdomain',
        body: 'Every branch push creates a preview at a unique subdomain — generated from the branch name and sanitised automatically. Subdomains are provisioned with a TLS certificate within seconds and ready to share before your colleague has even refreshed Slack.',
      },
      {
        title: 'Isolated Credentials',
        body: 'Each preview environment gets its own copy of your environment variables. Override individual values per environment from the console — for example, point a preview at a staging database rather than production. Secrets are never shared across previews.',
      },
      {
        title: 'Ephemeral Lifecycle',
        body: 'Preview environments are automatically torn down when the branch is deleted or the associated PR is closed. On Pro, you can pin any preview to keep it alive indefinitely — useful for long-lived staging or demo environments.',
      },
      {
        title: 'Share & Review',
        body: 'Preview URLs are posted as commit statuses to your git provider (GitHub, GitLab, Gitea) and appear in the console. By default URLs are publicly accessible; Pro users can restrict access to AroDeploy team members or protect with a password.',
      },
    ],
    howItWorks: {
      intro:
        'Preview environments are created automatically — no configuration required. Push a branch and a live environment appears, wired up and ready.',
      steps: [
        {
          title: 'Push to a branch',
          body: 'Any push to a branch that is not your designated production branch triggers a preview build. This includes feature branches, fix branches, and forks.',
        },
        {
          title: 'Build runs',
          body: 'The same build pipeline as production runs against the pushed commit. The preview output is built identically to what will eventually ship, so what you test is what you deploy.',
        },
        {
          title: 'Environment provisioned',
          body: 'A new isolated environment is created: unique subdomain, TLS certificate, copied environment variables (with any per-environment overrides applied), and optionally an ephemeral database.',
        },
        {
          title: 'URL published',
          body: 'AroDeploy posts the preview URL as a commit status to your git provider and to the console. It is live and accessible immediately — no extra steps, no DNS propagation wait.',
        },
      ],
    },
    specs: [
      { property: 'Preview environments', trial: '3', pro: 'Unlimited' },
      { property: 'Subdomain format', trial: '<branch>.<project>.arodeploy.app', pro: 'Custom domain supported' },
      { property: 'Auto TLS certificate', trial: '✓', pro: '✓' },
      { property: 'Ephemeral database per preview', trial: '—', pro: '✓' },
      { property: 'Pin preview (prevent teardown)', trial: '—', pro: '✓' },
      { property: 'Access control (password / team)', trial: '—', pro: '✓' },
      { property: 'Auto-teardown on branch delete', trial: '✓', pro: '✓' },
    ],
  },
  {
    slug: 'multi-service-projects',
    name: 'Multi-Service Projects',
    tagline: 'Your entire stack in one project on a shared private network.',
    description:
      'Group your frontend, API, workers, and databases into a single project. Services communicate privately without leaving the deployment network, with shared env management and independent scaling.',
    iconPaths:
      '<rect x="5" y="8" width="14" height="9" stroke="currentColor" stroke-width="1.5"/>' +
      '<rect x="5" y="21" width="14" height="6" stroke="currentColor" stroke-width="1.5"/>' +
      '<rect x="22" y="8" width="7" height="19" stroke="currentColor" stroke-width="1.5"/>',
    highlights: [
      {
        title: 'Private Networking',
        body: 'Services within the same project share an isolated private network and can reach each other by service name — e.g. http://api:3000. No traffic between services leaves the internal network and no extra ports need to be exposed publicly. Private network bandwidth is unmetered.',
      },
      {
        title: 'Shared Environment',
        body: 'Define environment variables at the project level and inherit them across all services automatically. Override any variable per service where needed. All values are encrypted at rest and never written to build logs or surfaced through the API.',
      },
      {
        title: 'Service Dependencies',
        body: 'Declare startup dependencies in your project configuration so AroDeploy starts your database before your API, and your API before your frontend. Readiness probes gate each step — if a dependency fails to start, dependent services are held until it recovers.',
      },
      {
        title: 'Independent Scaling',
        body: 'Each service has its own CPU and RAM allocation that you can adjust without touching any other service in the project. Scale your API up for a traffic spike while your frontend container stays unchanged. Resizing applies in-place without a full redeployment.',
      },
    ],
    howItWorks: {
      intro:
        'A project is the top-level unit in AroDeploy. Everything in a project shares a private network, a common environment, and a unified deploy lifecycle.',
      steps: [
        {
          title: 'Define your services',
          body: 'Add services to a project from the console or by committing an aro.json. Each service points to a repository (or a path within a monorepo), a build config, and a resource size.',
        },
        {
          title: 'Configure networking',
          body: 'Mark which services are public — they receive a domain and sit behind the load balancer — and which are internal-only. Internal services are reachable by name within the project network and have no public surface.',
        },
        {
          title: 'Set shared environment',
          body: "Add project-level variables once. Override per service where needed. All values are encrypted and injected into each container at start time. No service can read another service's secrets.",
        },
        {
          title: 'Deploy together',
          body: "AroDeploy builds each service in parallel and starts them in dependency order. Deployments are atomic — if any service fails its health check, the whole project rolls back to the previous known-good state.",
        },
      ],
    },
    specs: [
      { property: 'Services per project', trial: '3', pro: '20' },
      { property: 'Private network bandwidth', trial: 'Unmetered', pro: 'Unmetered' },
      { property: 'Project-level variables', trial: '50', pro: '200' },
      { property: 'Per-service variable overrides', trial: '25', pro: '100' },
      { property: 'Service dependency ordering', trial: '✓', pro: '✓' },
      { property: 'Atomic multi-service rollback', trial: '✓', pro: '✓' },
    ],
  },
  {
    slug: 'build-system',
    name: 'Build System',
    tagline: 'Auto-detected, zero-config builds with smart layer caching.',
    description:
      'AroDeploy detects your project type and selects the right build pipeline automatically. Drop in a Dockerfile or custom build script when you need full control. Builds are cached per layer — only changed layers rebuild.',
    iconPaths:
      '<path d="M5 29V12l12-7 12 7v17" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>' +
      '<rect x="12" y="20" width="10" height="9" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M17 20v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>',
    highlights: [
      {
        title: 'Automatic Detection',
        body: 'AroDeploy inspects your repository and selects the right build pipeline automatically. Supported runtimes include Node.js, Bun, Deno, Python, Go, Ruby, PHP, Rust, Java, and .NET. Static sites and any project with a Dockerfile are also handled. No config file required for standard project layouts.',
      },
      {
        title: 'Custom Build Config',
        body: 'Need more control? Supply a Dockerfile for full ownership of the build environment, or drop an aro.build.json to customise install commands, build commands, and output directories without writing a Dockerfile. Both approaches are supported side by side.',
      },
      {
        title: 'Layer Caching',
        body: 'Build layers are cached and keyed to the content of their inputs. Only layers whose inputs have changed since the last build are re-executed. For a typical Node.js app with unchanged dependencies, only the application layer rebuilds — cutting build times by 4–8× compared to a cold build.',
      },
      {
        title: 'Build Logs & Streaming',
        body: 'Every build streams logs in real time to the console and to the CLI via aro logs --build. Logs are stored for 30 days on Trial and indefinitely on Pro. Failed builds retain the full log including the exact command and exit code that caused the failure.',
      },
    ],
    howItWorks: {
      intro:
        'The build system is triggered automatically on every push and runs entirely on AroDeploy infrastructure — no CI runners to provision, no build minutes to buy.',
      steps: [
        {
          title: 'Trigger',
          body: 'A push to a tracked branch, a manual dispatch from the console, or a call to the deploy API starts a build. Concurrent builds for the same service are queued.',
        },
        {
          title: 'Detection & configuration',
          body: 'AroDeploy resolves your build config: auto-detected pipeline, a Dockerfile at the repo root, or an aro.build.json. The base image and build environment are selected based on the detected runtime and version.',
        },
        {
          title: 'Build with cache',
          body: 'Dependencies are installed and your build command runs. Each layer is compared to the cache store. Unchanged layers are pulled from cache; only changed layers execute.',
        },
        {
          title: 'Image push',
          body: "The final image is pushed to AroDeploy's private container registry, tagged with the commit SHA and a sequential build number, then handed to the deployment pipeline.",
        },
      ],
    },
    specs: [
      { property: 'Build timeout', trial: '15 min', pro: '60 min' },
      { property: 'Concurrent builds per service', trial: '1 (queued)', pro: '5 (parallel)' },
      { property: 'Build cache retention', trial: '7 days', pro: '30 days' },
      { property: 'Build log retention', trial: '30 days', pro: 'Indefinite' },
      { property: 'Dockerfile support', trial: '✓', pro: '✓' },
      { property: 'Custom build commands (aro.build.json)', trial: '✓', pro: '✓' },
      { property: 'Private registry included', trial: '✓', pro: '✓' },
    ],
  },
  {
    slug: 'databases',
    name: 'Databases & Storage',
    tagline: 'Open-source databases, persistent volumes, and automated backups.',
    description:
      'Deploy Postgres, Redis, Meilisearch and more as one-click add-ons on the same private network as your services. Automated backups ship to object storage on a schedule you control. IOPS and disk usage metrics are surfaced per service.',
    iconPaths:
      '<ellipse cx="17" cy="9" rx="11" ry="3.5" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M6 9v6c0 1.93 4.92 3.5 11 3.5S28 16.93 28 15V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>' +
      '<path d="M6 15v6c0 1.93 4.92 3.5 11 3.5S28 22.93 28 21v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>',
    highlights: [
      {
        title: 'One-Click Add-Ons',
        body: 'Add Postgres 15/16, Redis 7, or Meilisearch 1.x to any project from the console. The database spins up on the same private network as your services within seconds. Connection strings are automatically added to your environment variables — no manual wiring required.',
      },
      {
        title: 'Automated Backups',
        body: 'Set a backup schedule (hourly, daily, or weekly) and a retention period from the console. Backups are compressed and shipped to S3-compatible object storage. Restore to any available snapshot with two clicks — or via the CLI for scripted disaster recovery workflows.',
      },
      {
        title: 'Persistent Volumes',
        body: 'Attach persistent volumes to any service on Pro. Volumes survive container restarts, redeployments, and node migrations. Storage is backed by replicated block storage with a durability guarantee. Volumes can be resized online without downtime.',
      },
      {
        title: 'IOPS & Disk Metrics',
        body: 'The console surfaces IOPS read/write throughput, storage utilisation percentage, and active connection count per database service. Set alert thresholds on any metric to get notified before you approach a limit.',
      },
    ],
    howItWorks: {
      intro:
        'Databases are first-class services in AroDeploy — provisioned, networked, and backed up the same way as your application containers.',
      steps: [
        {
          title: 'Add a database',
          body: 'From the project console, click "Add service" and select your database type and version. The instance starts within seconds on the project\'s private network.',
        },
        {
          title: 'Credentials injected',
          body: 'Connection strings (host, port, user, password, database name) are automatically added to your project environment variables. Services on the same private network can connect immediately using the service name as the hostname.',
        },
        {
          title: 'Configure backups',
          body: 'Set your preferred backup schedule and retention window. AroDeploy begins snapshotting on schedule and stores compressed archives in off-site object storage. Each backup is verified with a checksum.',
        },
        {
          title: 'Monitor & restore',
          body: 'Watch IOPS, disk usage, and connection metrics in the console dashboard. Trigger a point-in-time restore to any available snapshot from the console or the CLI.',
        },
      ],
    },
    specs: [
      { property: 'Postgres', trial: '—', pro: '15, 16' },
      { property: 'Redis', trial: '—', pro: '7.x' },
      { property: 'Meilisearch', trial: '—', pro: '1.x' },
      { property: 'Persistent volumes', trial: '—', pro: 'Up to 200 GB per volume' },
      { property: 'Backup schedule', trial: '—', pro: 'Hourly / Daily / Weekly' },
      { property: 'Backup retention', trial: '—', pro: '30 days' },
      { property: 'Point-in-time restore', trial: '—', pro: '✓' },
      { property: 'IOPS & disk metrics', trial: '—', pro: '✓' },
    ],
  },
  {
    slug: 'security',
    name: 'Security',
    tagline: 'Firewall management, IPS, and hardened environments — out of the box.',
    description:
      'AroDeploy manages firewall rules, installs intrusion prevention, and locks down each deployment environment automatically. Every deployment runs isolated with no shared kernel surfaces between tenants.',
    iconPaths:
      '<path d="M5 27V16l6-9h12l6 9v11" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>' +
      '<path d="M5 20h24" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>' +
      '<path d="M14 27v-7h6v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>',
    highlights: [
      {
        title: 'Managed Firewall',
        body: 'Every deployment gets a dedicated firewall profile. Inbound rules allow only the ports your services declare. Outbound rules block all traffic except your configured egress allowlist. Rules are applied automatically on deploy and can be reviewed in the console.',
      },
      {
        title: 'Intrusion Prevention',
        body: 'A host-based IPS runs on every node, monitoring inbound traffic for known attack patterns: port scans, brute-force credential attempts, and common exploit payloads. Detected threats are dropped in real time and incident summaries appear in the console security log. Signatures are updated daily without any action required.',
      },
      {
        title: 'Environment Isolation',
        body: 'Each deployment runs in its own container with no shared filesystem, no shared kernel namespaces, and no shared process tree between tenants. Network traffic between projects is blocked at the hypervisor level — not just the OS level — so there is no path for lateral movement between customers.',
      },
      {
        title: 'TLS & Secrets',
        body: "Every custom domain and arodeploy.app subdomain gets a free, auto-renewed TLS certificate. Secrets are encrypted at rest with AES-256 and decrypted in-memory inside the container at startup. They are never written to logs, never returned by the API, and never exposed in the console.",
      },
    ],
    howItWorks: {
      intro:
        'Security is applied automatically at every stage of the deployment lifecycle — no configuration required, no plugins to install.',
      steps: [
        {
          title: 'Deploy triggers hardening',
          body: 'As soon as a deployment is created, AroDeploy provisions a dedicated firewall profile and attaches it to the container. Only declared service ports are opened. All other inbound ports remain closed.',
        },
        {
          title: 'IPS activated',
          body: 'The intrusion prevention system begins monitoring inbound traffic as soon as the container starts. Signatures are updated daily in the background — no maintenance window, no action required from you.',
        },
        {
          title: 'Secrets injected securely',
          body: "Environment variables marked as secrets are decrypted in-memory at container start using your project's per-tenant key. They are never written to disk, never logged, and never accessible via the container metadata API.",
        },
        {
          title: 'Continuous monitoring',
          body: 'The security log in the console records firewall events, IPS incidents, and certificate renewals. Set up webhook notifications to pipe security events into your alerting pipeline.',
        },
      ],
    },
    specs: [
      { property: "Auto TLS (Let's Encrypt)", trial: '✓', pro: '✓' },
      { property: 'Auto certificate renewal', trial: '✓', pro: '✓' },
      { property: 'Managed firewall', trial: '✓', pro: '✓' },
      { property: 'Intrusion prevention system', trial: '✓', pro: '✓' },
      { property: 'Secrets encryption (at rest)', trial: 'AES-256', pro: 'AES-256' },
      { property: 'Tenant isolation level', trial: 'Container', pro: 'Container' },
      { property: 'Security event log retention', trial: '30 days', pro: 'Indefinite' },
      { property: 'Webhook security alerts', trial: '—', pro: '✓' },
    ],
  },
];
