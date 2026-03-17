import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";

type Status = "good" | "risk" | "next";

type Finding = {
  area: string;
  status: Status;
  summary: string;
  evidence: string;
};

const findings: Finding[] = [
  {
    area: "Layered RBAC Migration",
    status: "good",
    summary: "Feature-flagged migration path is in place and active for dev.",
    evidence: "enable_layered_rbac=true and enable_account_level_iam=false in terraform/environments/dev.tfvars.",
  },
  {
    area: "Provider Compatibility",
    status: "risk",
    summary: "Preview feature token may drift from provider-supported names across versions.",
    evidence: "preview_features_enabled is set in terraform/providers.tf and should be validated against pinned provider docs for current version.",
  },
  {
    area: "Environment Readiness",
    status: "risk",
    summary: "UAT and PROD variable files are currently empty.",
    evidence: "terraform/environments/uat.tfvars and terraform/environments/prod.tfvars are present but not populated.",
  },
  {
    area: "S3 Integration Hardening",
    status: "risk",
    summary: "Integration config has TODO placeholders and fixed external ID value.",
    evidence: "terraform/aws-snowflake-integration.tf still contains TODO markers and snowflake_external_id=\"0000\".",
  },
  {
    area: "Pipeline Controls",
    status: "next",
    summary: "Layered RBAC YAML validation is present in CD; equivalent production gate can be expanded.",
    evidence: "cd.yaml runs validate_layered_rbac.py based on dev flag, while pr.yaml remains focused on destroy/test flow.",
  },
];

function badgeClasses(status: Status) {
  if (status === "good") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (status === "risk") {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  return "bg-sky-100 text-sky-700 border-sky-200";
}

function statusIcon(status: Status) {
  if (status === "good") {
    return <CheckCircle2 className="h-4 w-4" />;
  }

  if (status === "risk") {
    return <AlertTriangle className="h-4 w-4" />;
  }

  return <Clock3 className="h-4 w-4" />;
}

export function WhereAreWeTab() {
  return (
    <section className="mt-4 rounded-xl bg-white p-8 shadow-2xl">
      <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">Current Platform Position</h3>
          <p className="mt-2 max-w-4xl text-slate-600">
            Snapshot of Snowflake provisioning maturity based on the current Terraform code and official Snowflake guidance for
            access control and security architecture.
          </p>
        </div>
        <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-700">Review basis: March 2026 repo state</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {findings.map((finding) => (
          <article key={finding.area} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-base font-semibold text-slate-900">{finding.area}</h4>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${badgeClasses(finding.status)}`}>
                {statusIcon(finding.status)}
                {finding.status === "good" ? "Healthy" : finding.status === "risk" ? "Needs Attention" : "Next"}
              </span>
            </div>
            <p className="text-sm text-slate-700">{finding.summary}</p>
            <p className="mt-3 rounded-md bg-white px-3 py-2 text-xs text-slate-600">{finding.evidence}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-5">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-900">Recommended next sprint outcomes</h4>
        <ul className="mt-3 grid gap-2 text-sm text-blue-900 md:grid-cols-2">
          <li>Pin provider version and validate preview feature flags against provider release docs.</li>
          <li>Populate UAT/PROD tfvars with explicit toggles, quotas, and ownership metadata.</li>
          <li>Replace S3 integration placeholders with environment-specific secure inputs.</li>
          <li>Add promotion-time policy checks so non-dev environments cannot run with TODO defaults.</li>
        </ul>
      </div>
    </section>
  );
}
