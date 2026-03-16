import { GitBranch, Play, CheckCircle, RotateCcw, FileSearch, ArrowDown } from "lucide-react";

export function DeployMonitorPanel() {
  return (
    <div className="w-72 space-y-3">
      <div className="bg-gradient-to-b from-green-50 to-emerald-50 rounded-lg p-5 border-2 border-green-300">
        <h3 className="font-bold text-slate-900 mb-4 text-center border-b border-green-300 pb-2">
          Deploy & Monitor
        </h3>
        
        <div className="space-y-4">
          {/* CI/CD Pipeline */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <GitBranch className="w-4 h-4 text-green-600" />
              <span className="font-bold text-sm text-slate-900">CI/CD Pipeline</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">GitLab / GitHub Actions</span>
              </div>
              <div className="bg-green-100 px-2 py-1 rounded text-xs font-mono text-green-800">
                main branch protected
              </div>
            </div>
          </div>

          {/* Terraform Apply Flow */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-sm text-slate-900">Terraform Apply</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ArrowDown className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-700">Plan validated</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-700">API calls to Snowflake</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-700">Resources created/updated</span>
              </div>
            </div>
          </div>

          {/* Audit Trail */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <FileSearch className="w-4 h-4 text-purple-600" />
              <span className="font-bold text-sm text-slate-900">Change Traceability</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-purple-600" />
                <span className="text-xs text-slate-700">PR → Plan → Apply → Audit</span>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <div className="text-xs font-mono text-purple-900">
                  commit: [REDACTED]
                </div>
                <div className="text-xs text-purple-700 mt-1">
                  Author: [REDACTED]
                </div>
                <div className="text-xs text-purple-700">
                  Applied: 2026-03-16 14:32 UTC
                </div>
              </div>
            </div>
          </div>

          {/* Rollback */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <RotateCcw className="w-4 h-4 text-red-600" />
              <span className="font-bold text-sm text-slate-900">Rollback Available</span>
            </div>
            <div className="bg-red-50 p-3 rounded">
              <div className="text-xs text-slate-700 mb-2">
                If issues detected:
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-red-600">1.</span>
                  <span className="text-slate-700">Git revert commit</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">2.</span>
                  <span className="text-slate-700">Re-run Terraform apply</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">3.</span>
                  <span className="text-slate-700">Verify in Snowflake</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-world Example */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
        <h4 className="font-bold text-xs text-blue-900 mb-3 uppercase tracking-wide">
          Example Grant
        </h4>
        <div className="bg-white rounded p-3 text-xs space-y-2 border border-blue-200">
          <div className="font-bold text-blue-900">Data Engineer Access</div>
          <div className="text-slate-700">
            <span className="font-semibold">Role:</span> KUB_MATCHMERGE_DATA_ENGINEER
          </div>
          <div className="text-slate-700">
            <span className="font-semibold">Database:</span> [DOMAIN_DATABASE]
          </div>
          <div className="text-slate-700">
            <span className="font-semibold">Grants:</span> USAGE, CREATE SCHEMA
          </div>
          <div className="text-slate-700">
            <span className="font-semibold">Warehouse:</span> TRANSFORM_WH
          </div>
        </div>
      </div>
    </div>
  );
}
