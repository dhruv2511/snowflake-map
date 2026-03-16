import { Database, Shield, Workflow } from "lucide-react";

export function DiagramHeader() {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div className="p-3 bg-blue-600 rounded-lg">
          <Database className="w-8 h-8 text-white" />
        </div>
        <div className="p-3 bg-orange-600 rounded-lg">
          <Workflow className="w-8 h-8 text-white" />
        </div>
        <div className="p-3 bg-slate-900 rounded-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-slate-900">
        Snowflake RBAC Operating Model
      </h1>
      <h2 className="text-2xl text-slate-700">
        Multi-File Terraform Governance
      </h2>
      <p className="text-slate-600 max-w-3xl mx-auto">
        Enterprise architecture diagram showing how Snowflake RBAC is managed, governed, validated, 
        and enforced end-to-end with policy intent, technical controls, and business outcomes.
      </p>
      <p className="text-sm text-slate-500">As of March 2026</p>
    </div>
  );
}