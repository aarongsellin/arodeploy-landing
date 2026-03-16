# Arodeploy

The point of Arodeploy is to give the deployment eaze of Vercel, but the cost optimization of working on "bare-metal". Therefor the goal of this project is to create a full deployment engine in Golang and deploy it on Hetzner. The napkin math for this project is a cost optimization of around 60-70% compared to hosting on AWS.

### Interesting features to reduce server anxiety

**Duplicate Migrations**

We allow clients to host duplicates of their applications in multiple regions.

**Zero Downtime Deployment (blue/green)**

Integrate Caddy, and when a new build is ready we spin up a new container, run a health check and then update the proxy routing table when we are sure that the new version is good enough.

**Preview Deployments**

For each new deployment, we create a unique web domain via subdomains. We-ll integrate with Hetzner DNS API to create like `new-feature-x.domain.com`. We allow preview, testing and production environments.

**Automated hardening and security**

We need to handle security as well, since bare-metal means we are responsible for the OS.
Auto-Firewall: Hetzner Cloud API to automatically configure Firewalls (only allowing 80, 443, and ssh)
Fail2Ban / CrowdSec: Automatically install and configure on the host during setup.

**Log streaming and metrics**

We stream the raw stdout/stderr from the docker containers directly to the UI in their raw form. This allows for total transparency. We can use BubbleTea, and also show CPU/RAM.

**Bring your own DB**

We can have add-ons that are just Docker templates for PostgresSQL, Redis, or Meilisearch. Then we can add automated backups to Hetzner Object Storage.

**Smart builds**

Not everyone wants to write Dockerfiles. The feature is integrating cloud native buildpakcs. So if the user does not have a Dockerfile configured in the repository, we should detect which type of project it is and then build the image accordingly.

**Custom Health Checks**

When we boot up a new instance with the clients webserver, they should be able to configure custom routes that we hit to allow a roll-over.

**Observability**

We should, for starters, monitor RAM, CPU, LCP and Memory usage and tell the client if their deployment was better machine was than their earlier one. Implementing push notifications for important events, like RAM hitting 100% and CPU usage alerts.

**IoT automation esc**

We should allow users to setup "phone-home" systems so that they can deploy software to raw computers

**Hot CPU/Memory auto-scaling**

Allow users to get their applications auto-scaled depending on CPU and Memory requirements

**CPU/Memory testing suite**

Give users a quick rundown of the load their server will have at x amount of users doing y amount of interactions with z things.

**Whitelist**

Make it easy for users to create custom IP or domain whitelists for access to their website

**Projects (unlike vercel)**

Instead of a project just being a single domain and single deployment like vercel, allow users to merge multiple web services into a single thing. Sort of like a private-network of applications. Everything from databases and multiple deployments should be able to be in the same "project"

**Quality of life things**

Vercel for example has the ability to add a site-wide password block, though this requires Pro tier which is silly.

**A lot of help**

We should treat most users as babies, many people deploying for the first time will not know how DNS routing works. Therefor we should make help boxes, and questionmarks apparant, but not intruisve. Giving helpful on ex, how to setup DNS from a third party provider. Lets say they purchased their domain on vercel, but want to start using it on Arodeploy today, how would they do that? Well change the name servers, but not everybody knows that and we want to make it simple for them.

**Monorepos**

A user should be abel to configure it so different apps in their mono-repo go to differnet seperate applications. So they can choose to have completely seperate apps for different parts of their applicaiton.
