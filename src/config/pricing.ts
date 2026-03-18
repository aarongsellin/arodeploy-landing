/**
 * pricing.ts — Comparison calculator configuration
 *
 * Edit the numbers here to update the pricing comparison section on the landing page.
 * No other file needs to be touched.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SOURCES & METHODOLOGY
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * VERCEL
 *   Source: https://vercel.com/pricing  (Fluid Compute tab)
 *   Model used:
 *     - Pro plan base:              $20 / month
 *     - Included Fluid Compute:     1,000 GB-hours / month
 *     - Overage rate:               $0.18 / GB-hour beyond the included 1,000
 *     - Assumed average utilization: 50%  (Vercel charges for active compute
 *       time, not wall-clock time; 50% is a commonly cited mid-range estimate
 *       for a typical always-on web service)
 *     - Hours per month:            730  (= 24 × 365 / 12)
 *   Formula:
 *     gbHr  = vCPU × RAM_GB × hoursPerMonth × avgUtilization
 *     total = basePlan + max(0, gbHr − includedGbHr) × overageRate
 *   Note: Vercel's actual bill depends heavily on real traffic patterns.
 *   These figures are illustrative, not a guarantee.
 *
 * RAILWAY
 *   Source: https://railway.app/pricing  (Usage-based section)
 *   Model used:
 *     - Hobby base fee:             $5 / month
 *     - CPU rate:                   $0.000463 / vCPU / minute
 *     - RAM rate:                   $0.000231 / GB  / minute
 *     Derived monthly multipliers (24/7, 30-day month = 43,200 min):
 *       CPU:  $0.000463 × 43,200 ≈ $20 / vCPU / month
 *       RAM:  $0.000231 × 43,200 ≈ $10 / GB  / month
 *   Formula:
 *     total = baseFee + vCPU × cpuMonthly + RAM_GB × ramMonthly
 *   Note: Railway bills per-minute; the monthly figures above assume 100%
 *   uptime. Actual bills will differ if containers are idle.
 *
 * ARODEPLOY
 *   Flat monthly rate — set your own numbers below.
 *   Formula:
 *     total = baseFee + vCPU × cpuRate + RAM_GB × ramRate
 *
 * BANDWIDTH
 *   AroDeploy:
 *     Trial (30 days): 100 GB/month included per deployment.
 *     Pro  plan: 10 TB (10,000 GB)/month included per deployment.
 *     Overage rate (both plans): €10/TB ≈ $0.012/GB.
 *     Underlying infrastructure bandwidth costs are absorbed into the flat rate
 *     up to the included limit; overage reflects the platform surcharge to the user.
 *
 *   Railway:
 *     Hobby plan includes 100 GB/month outbound; $0.10/GB overage.
 *     Source: https://railway.app/pricing (Bandwidth section)
 *
 *   Vercel:
 *     Pro plan includes 1,000 GB/month; $0.15/GB overage.
 *     Source: https://vercel.com/pricing (Bandwidth section)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const pricing = {
  /** Slider defaults shown when the page first loads */
  defaults: {
    vcpu: 2,
    ram: 4,
    bandwidth: 100,
  },

  /** Slider range limits */
  sliders: {
    vcpu: { min: 1, max: 8, step: 1 },
    ram: { min: 1, max: 16, step: 1 },
    /** Bandwidth in GB/month */
    bandwidth: { min: 0, max: 2000, step: 50 },
  },

  /** Hetzner Cloud server instances for Custom tier */
  hetznerServers: [
    {
      name: "CPX11",
      vcpu: 2,
      ram: 4,
      ssd: 40,
      bandwidth: 20, // TB included
      monthlyUsd: 6.99,
      monthlyEur: 6.49,
      tier: "cost-optimized",
    },
    {
      name: "CPX21",
      vcpu: 3,
      ram: 8,
      ssd: 80,
      bandwidth: 20,
      monthlyUsd: 12.99,
      monthlyEur: 11.99,
      tier: "cost-optimized",
    },
    {
      name: "CPX31",
      vcpu: 4,
      ram: 16,
      ssd: 160,
      bandwidth: 20,
      monthlyUsd: 25.99,
      monthlyEur: 23.99,
      tier: "general-purpose",
    },
    {
      name: "CPX41",
      vcpu: 8,
      ram: 32,
      ssd: 320,
      bandwidth: 20,
      monthlyUsd: 51.99,
      monthlyEur: 47.99,
      tier: "general-purpose",
    },
    {
      name: "CPX51",
      vcpu: 16,
      ram: 64,
      ssd: 640,
      bandwidth: 20,
      monthlyUsd: 103.99,
      monthlyEur: 95.99,
      tier: "general-purpose",
    },
  ],

  /** Custom tier data pricing */
  customTier: {
    /** 20TB of bandwidth included per Hetzner server */
    includedDataTb: 20,
    /** Data pricing breakdown:
     * - 0-15TB: included in base price (€0)
     * - 15-30TB: €2/month per TB overage
     * - 30TB+: €1.50/month per TB overage
     */
  },

  aro: {
    /** Flat base fee per month ($) */
    baseFee: 2,
    /** Per vCPU per month ($) */
    cpuRate: 3.5,
    /** Per GB RAM per month ($) */
    ramRate: 1.5,
    /**
     * Per-seat license fee for the Pro plan.
     * Trial: 1 project, 1 user, no teams — 30 days free, no seat fee.
     * Pro plan: unlimited projects, team collaboration — €10/seat/month (~$11 USD).
     * Every person on the team (including the owner) needs a Pro seat.
     */
    seatRate: 11,
    /**
     * AroDeploy bandwidth tiers.
     * Switch the plan toggle in the calculator to compare Free vs Pro.
     * Overage rate is the same on both plans: €10/TB ≈ $0.012/GB.
     */
    bandwidth: {
      free: {
        /** GB included per month on the Free plan */
        includedGb: 100,
        /** Rate per GB overage — €10/TB ≈ $0.012/GB */
        overageRate: 0.012,
      },
      pro: {
        /** GB included per month on the Pro plan (10 TB) */
        includedGb: 10_000,
        /** Rate per GB overage — €10/TB ≈ $0.012/GB */
        overageRate: 0.012,
      },
    },
  },

  railway: {
    /** Hobby plan base fee per month ($) */
    baseFee: 5,
    /**
     * Derived from $0.000463/vCPU/min × 43,200 min/month.
     * Update the per-minute rate at railway.app/pricing, then recalculate:
     *   cpuMonthly = perMinuteRate × 60 × 24 × 30
     */
    cpuMonthlyRate: 20,
    /** Derived from $0.000231/GB/min × 43,200 min/month */
    ramMonthlyRate: 10 /** GB of outbound bandwidth included per month in Hobby plan */,
    bandwidthIncludedGb: 100,
    /** Rate per GB beyond included ($) — source: railway.app/pricing */
    bandwidthOverageRate: 0.1,
  },

  /**
   * Plan limits — drives the Plans & Rates section on the landing page.
   * Edit these values here; the page template will update automatically.
   * Use null for "Unlimited" on any numeric field.
   */
  plans: {
    free: {
      /** Monthly base price ($) */
      priceMo: 0,
      /** Max concurrent projects */
      projects: 1,
      /** Max services per project */
      servicesPerProject: 5,
      /** Max vCPU allocated per service */
      maxVcpuPerService: 2,
      /** Max RAM (GB) allocated per service */
      maxRamGbPerService: 4,
      /** Ephemeral disk per service (GB) */
      ephemeralDiskGb: 5,
      /** Persistent volume storage — false = not available */
      volumes: false,
      /** Max custom domains across all projects */
      customDomains: 2,
      /** Max cron jobs per project */
      cronJobsPerProject: 2,
      /** Outbound bandwidth included per month (GB) — mirrors aro.bandwidth.free.includedGb */
      bandwidthIncludedGb: 100,
    },
    pro: {
      /** Per-seat monthly price in USD (~€10) */
      priceMo: 11,
      /** null = Unlimited */
      projects: null,
      servicesPerProject: 50,
      maxVcpuPerService: 32,
      maxRamGbPerService: 64,
      ephemeralDiskGb: 50,
      volumes: true,
      /** null = Unlimited */
      customDomains: null,
      cronJobsPerProject: 25,
      /** Outbound bandwidth included per month (GB) — mirrors aro.bandwidth.pro.includedGb */
      bandwidthIncludedGb: 10_000,
    },
  },

  vercel: {
    /** Pro plan base fee per month ($) */
    basePlan: 20,
    /** GB-hours included in the Pro plan before overage kicks in */
    includedGbHr: 1000,
    /** Overage rate per GB-hour beyond the included allocation ($) */
    overageRate: 0.18,
    /**
     * Assumed average CPU utilization (0–1).
     * Vercel charges only for active compute time, not wall-clock time.
     * 0.5 = 50% — reasonable for a busy-but-not-saturated service.
     * Lower this for services that mostly idle; raise it for heavy workloads.
     */
    avgUtilization: 0.5,
    /** Average hours per calendar month (24 × 365 / 12) */
    hoursPerMonth: 730,
    /** GB of outbound bandwidth included per month in Pro plan */
    bandwidthIncludedGb: 1000,
    /** Rate per GB beyond included ($) — source: vercel.com/pricing */
    bandwidthOverageRate: 0.15,
  },
};
