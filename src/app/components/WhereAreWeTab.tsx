import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type CapabilityStatus = "implemented" | "partial" | "not-started";

type Capability = {
  capability: string;
  pillar: string;
  status: CapabilityStatus;
  deploymentState: string;
  evidence: string;
  currentGap: string;
  nextMilestone: string;
};

type BestPractice = {
  area: string;
  guidance: string;
  source: string;
  currentState: string;
  alignment: "aligned" | "partial" | "gap";
};

const capabilities: Capability[] = [
  {
    capability: "Layered RBAC rollout",
    pillar: "Access Control",
    status: "implemented",
    deploymentState: "Enabled for DEV using feature flags and layered YAML merge.",
    evidence: "terraform/main.tf wires layered modules, and dev.tfvars sets enable_layered_rbac=true with enable_account_level_iam=false.",
    currentGap: "Promotion criteria and parity for UAT/PROD are not codified yet.",
    nextMilestone: "Define promotion gates and environment-specific layered override packs.",
  },
  {
    capability: "Network policies in Snowflake",
    pillar: "Security",
    status: "implemented",
    deploymentState: "Network policy resources are implemented in both account-level and layered account-foundation modules.",
    evidence: "snowflake_network_policy resources exist in terraform/modules/account_level_iam/main.tf and terraform/modules/layered-rbac/account-foundation/main.tf.",
    currentGap: "No clear non-dev deployment profile is currently configured from root env files.",
    nextMilestone: "Attach environment-specific policy sets and enforce via non-dev tfvars/pipeline checks.",
  },
  {
    capability: "Private connectivity / VPC integration",
    pillar: "Network",
    status: "not-started",
    deploymentState: "No Terraform-managed VPC, endpoint, or private connectivity topology found in snowflake_provisioning.",
    evidence: "Only use_privatelink_endpoint=true appears on S3 storage integration resource; no aws_vpc/aws_vpc_endpoint resources are present.",
    currentGap: "Account-level network transport still depends on external infrastructure not represented in this repo.",
    nextMilestone: "Add a dedicated connectivity module covering endpoint strategy, routing, and account-level private access assumptions.",
  },
  {
    capability: "Identity federation and lifecycle (SSO/SCIM)",
    pillar: "Identity",
    status: "not-started",
    deploymentState: "No SAML/OAuth/SCIM security integration resources are wired in provisioning.",
    evidence: "No snowflake_security_integration/snowflake_authentication_policy resources found under terraform root modules.",
    currentGap: "Identity governance likely handled outside this deployment code, limiting end-to-end deployment status visibility.",
    nextMilestone: "Add integration placeholders and verification checks for IdP metadata, SCIM sync, and role-mapping coverage.",
  },
  {
    capability: "Data platform baseline (warehouses and databases)",
    pillar: "Platform",
    status: "partial",
    deploymentState: "Warehouse module is active in DEV; database module exists but is not enabled in dev.tfvars.",
    evidence: "main.tf wires modules for warehouses/databases, dev.tfvars enables warehouses and leaves enable_databases commented.",
    currentGap: "Database baseline and schema grants are not fully promoted via root environment config.",
    nextMilestone: "Enable database rollout with managed access defaults and controlled grants sequence.",
  },
  {
    capability: "S3 storage integration hardening",
    pillar: "Data Access",
    status: "partial",
    deploymentState: "Storage integration path exists but currently contains placeholder values and incomplete path parameterization.",
    evidence: "terraform/aws-snowflake-integration.tf sets snowflake_external_id=\"0000\" and retains path TODO placeholders.",
    currentGap: "Trust policy hardening and path-level scoping are not production-ready.",
    nextMilestone: "Inject secure external ID, split read/write paths by environment, and add policy lint in CI.",
  },
  {
    capability: "Pipeline governance",
    pillar: "Delivery",
    status: "partial",
    deploymentState: "CD validates layered YAML for DEV; PR flow focuses on destroy/test lifecycle.",
    evidence: "cd.yaml runs validate_layered_rbac.py for dev flag, while pr.yaml stages are TF_DESTROY_FEATURE and TF_TEST_DEV.",
    currentGap: "No explicit policy gate for non-dev completeness (for example empty tfvars or placeholder secrets).",
    nextMilestone: "Add policy-as-code checks for env completeness and forbidden placeholder patterns before promotion.",
  },
  {
    capability: "Environment readiness (UAT/PROD)",
    pillar: "Operations",
    status: "not-started",
    deploymentState: "UAT and PROD tfvars files exist but are currently empty.",
    evidence: "terraform/environments/uat.tfvars and terraform/environments/prod.tfvars are empty in current state.",
    currentGap: "Promotion pipeline cannot assert deterministic environment behavior without config baselines.",
    nextMilestone: "Populate non-dev tfvars with module toggles, owner metadata, quotas, and connectivity assumptions.",
  },
];

const bestPractices: BestPractice[] = [
  {
    area: "RBAC role hierarchy",
    guidance: "Align object access roles to business functions and use role hierarchy inheritance.",
    source: "Snowflake Access Control Best Practices",
    currentState: "Layered domain-access engine and account-foundation modules implement role hierarchy and grants, currently rolled out in DEV.",
    alignment: "partial",
  },
  {
    area: "Limit ACCOUNTADMIN use",
    guidance: "Avoid using ACCOUNTADMIN for day-to-day object creation and automation.",
    source: "Snowflake Access Control Best Practices",
    currentState: "Service role usage is configured for Terraform, but policy checks to prevent privileged misuse are not yet codified in pipeline gates.",
    alignment: "partial",
  },
  {
    area: "Service-to-service auth",
    guidance: "Prefer Workload Identity Federation (WIF) for workloads over long-lived credentials.",
    source: "Snowflake Workload Identity Federation",
    currentState: "Service users are created, but no Terraform-managed WIF/authentication policy resources are present.",
    alignment: "gap",
  },
  {
    area: "Private connectivity",
    guidance: "Use PrivateLink/Private Service Connect for inbound private access where required.",
    source: "Snowflake Private Connectivity (Inbound)",
    currentState: "No VPC/VNet endpoint topology is represented in current provisioning code; only storage integration sets use_privatelink_endpoint=true.",
    alignment: "gap",
  },
  {
    area: "Warehouse governance",
    guidance: "Use auto-suspend/resume and sizing strategy to control cost/performance.",
    source: "Snowflake Warehouses Overview",
    currentState: "Compute strategy and warehouse modules are active in DEV with default suspend/timeout controls.",
    alignment: "aligned",
  },
  {
    area: "Cost controls",
    guidance: "Use resource monitors with thresholds and actions for account/warehouse governance.",
    source: "Snowflake Resource Monitors",
    currentState: "Variables for quota and recipients exist, but no resource monitor resource/module is currently wired in root deployment.",
    alignment: "gap",
  },
];

function statusMeta(status: CapabilityStatus) {
  if (status === "implemented") {
    return {
      icon: <CheckCircle2 className="h-4 w-4" />,
      label: "Implemented",
      chip: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
  }

  if (status === "partial") {
    return {
      icon: <Clock3 className="h-4 w-4" />,
      label: "Partial",
      chip: "bg-sky-100 text-sky-700 border-sky-200",
    };
  }

  return {
    icon: <AlertTriangle className="h-4 w-4" />,
    label: "Not Started",
    chip: "bg-amber-100 text-amber-700 border-amber-200",
  };
}

const implementedCount = capabilities.filter((item) => item.status === "implemented").length;
const partialCount = capabilities.filter((item) => item.status === "partial").length;
const notStartedCount = capabilities.filter((item) => item.status === "not-started").length;

const accessSecurity = capabilities.filter((item) => ["Access Control", "Security", "Identity", "Data Access"].includes(item.pillar));
const connectivity = capabilities.filter((item) => ["Network", "Platform"].includes(item.pillar));
const deliveryOps = capabilities.filter((item) => ["Delivery", "Operations"].includes(item.pillar));

function renderCapabilityList(items: Capability[]) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const meta = statusMeta(item.status);
        return (
          <article key={item.capability} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h4 className="text-base font-semibold text-slate-900">{item.capability}</h4>
                <p className="text-xs uppercase tracking-wide text-slate-500">{item.pillar}</p>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${meta.chip}`}>
                {meta.icon}
                {meta.label}
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Deployment State</p>
                <p className="mt-1 text-sm text-slate-700">{item.deploymentState}</p>
              </div>
              <div className="rounded-md bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence</p>
                <p className="mt-1 text-sm text-slate-700">{item.evidence}</p>
              </div>
              <div className="rounded-md bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Gap</p>
                <p className="mt-1 text-sm text-slate-700">{item.currentGap}</p>
              </div>
              <div className="rounded-md bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next Milestone</p>
                <p className="mt-1 text-sm text-slate-700">{item.nextMilestone}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function bestPracticeMeta(alignment: BestPractice["alignment"]) {
  if (alignment === "aligned") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (alignment === "partial") {
    return "bg-sky-100 text-sky-700 border-sky-200";
  }

  return "bg-amber-100 text-amber-700 border-amber-200";
}

export function WhereAreWeTab() {
  return (
    <section className="mt-4 rounded-xl bg-white p-8 shadow-2xl">
      <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">Current Platform Position</h3>
          <p className="mt-2 max-w-4xl text-slate-600">
            Detailed deployment status review for snowflake_provisioning, structured as a platform capability matrix with concrete
            implementation evidence and explicit rollout gaps.
          </p>
        </div>
        <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-700">Review basis: March 2026 repo state</div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Implemented</p>
          <p className="mt-2 text-3xl font-bold text-emerald-800">{implementedCount}</p>
          <p className="mt-1 text-sm text-emerald-700">Capabilities fully wired in current code path.</p>
        </article>
        <article className="rounded-lg border border-sky-200 bg-sky-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Partial</p>
          <p className="mt-2 text-3xl font-bold text-sky-800">{partialCount}</p>
          <p className="mt-1 text-sm text-sky-700">Capabilities present but requiring hardening or promotion controls.</p>
        </article>
        <article className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Not Started</p>
          <p className="mt-2 text-3xl font-bold text-amber-800">{notStartedCount}</p>
          <p className="mt-1 text-sm text-amber-700">Capabilities not yet represented in deployment code.</p>
        </article>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="h-auto flex-wrap bg-slate-200/80 p-1.5">
          <TabsTrigger value="all" className="px-4 py-1.5">All Capabilities</TabsTrigger>
          <TabsTrigger value="access" className="px-4 py-1.5">Access and Security</TabsTrigger>
          <TabsTrigger value="connectivity" className="px-4 py-1.5">Connectivity and Platform</TabsTrigger>
          <TabsTrigger value="delivery" className="px-4 py-1.5">Delivery and Environments</TabsTrigger>
          <TabsTrigger value="best-practices" className="px-4 py-1.5">Best Practice Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {renderCapabilityList(capabilities)}
        </TabsContent>

        <TabsContent value="access" className="mt-4">
          {renderCapabilityList(accessSecurity)}
        </TabsContent>

        <TabsContent value="connectivity" className="mt-4">
          {renderCapabilityList(connectivity)}
        </TabsContent>

        <TabsContent value="delivery" className="mt-4">
          {renderCapabilityList(deliveryOps)}
        </TabsContent>

        <TabsContent value="best-practices" className="mt-4">
          <div className="space-y-4">
            {bestPractices.map((item) => (
              <article key={item.area} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <h4 className="text-base font-semibold text-slate-900">{item.area}</h4>
                  <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${bestPracticeMeta(item.alignment)}`}>
                    {item.alignment === "aligned" ? "Aligned" : item.alignment === "partial" ? "Partially Aligned" : "Gap"}
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-md bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Snowflake Guidance</p>
                    <p className="mt-1 text-sm text-slate-700">{item.guidance}</p>
                  </div>
                  <div className="rounded-md bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current State</p>
                    <p className="mt-1 text-sm text-slate-700">{item.currentState}</p>
                  </div>
                  <div className="rounded-md bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reference</p>
                    <p className="mt-1 text-sm text-slate-700">{item.source}</p>
                  </div>
                </div>
              </article>
            ))}

            <article className="rounded-lg border border-slate-200 bg-white p-5">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Official Snowflake References Used</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>https://docs.snowflake.com/en/user-guide/security-access-control-considerations</li>
                <li>https://docs.snowflake.com/en/guides-overview-secure</li>
                <li>https://docs.snowflake.com/en/user-guide/private-connectivity-inbound</li>
                <li>https://docs.snowflake.com/en/user-guide/workload-identity-federation</li>
                <li>https://docs.snowflake.com/en/user-guide/warehouses-overview</li>
                <li>https://docs.snowflake.com/en/user-guide/resource-monitors</li>
              </ul>
            </article>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-5">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-900">Priority delivery focus</h4>
        <p className="mt-2 text-sm text-blue-900">
          Focus first on connectivity and environment readiness: implement private connectivity topology, then enforce non-dev
          configuration completeness and security integration controls before promoting layered RBAC beyond DEV.
        </p>
      </div>
    </section>
  );
}
