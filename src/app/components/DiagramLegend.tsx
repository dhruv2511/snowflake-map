import { Info, ArrowRight, X } from "lucide-react";

export function DiagramLegend() {
  return (
    <div className="space-y-6">
      <h3 className="font-bold text-slate-900 flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-600" />
        Legend & Key Concepts
      </h3>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Naming Convention */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h4 className="font-bold text-sm text-slate-900 mb-3">Naming Convention</h4>
          <div className="bg-white p-3 rounded border border-slate-300 font-mono text-xs">
            <div className="text-blue-700 mb-2">{"{ENVIRONMENT}_{DOMAIN}_{ROLE_SUFFIX}"}</div>
            <div className="text-slate-600">Example:</div>
            <div className="text-green-700 mt-1">PROD_MATCHMERGE_OWNER</div>
          </div>
        </div>

        {/* File Ordering */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h4 className="font-bold text-sm text-slate-900 mb-3">File Ordering Rule</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-orange-700 font-mono">base/</span>
              <span className="text-slate-700">Global defaults</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-orange-700 font-mono">account/</span>
              <span className="text-slate-700">Account foundation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-orange-700 font-mono">domains/</span>
              <span className="text-slate-700">Domain objects + role policy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-orange-700 font-mono">principals/</span>
              <span className="text-slate-700">User bindings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-orange-700 font-mono">overrides/&lt;env&gt;/</span>
              <span className="text-slate-700">Environment exceptions (last)</span>
            </div>
          </div>
        </div>

        {/* Merge Behavior */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h4 className="font-bold text-sm text-slate-900 mb-3">Merge Behavior</h4>
          <div className="space-y-2 text-xs">
            <div className="bg-yellow-100 border border-yellow-300 p-2 rounded">
              <span className="font-semibold text-yellow-900">Last-wins</span> for duplicate keys
            </div>
            <div className="text-slate-600">
              Later layers override earlier layers; numbering is optional
            </div>
          </div>
        </div>
      </div>

      {/* Arrow Legend */}
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <h4 className="font-bold text-sm text-slate-900 mb-3">Flow Indicators</h4>
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-green-600" />
            <span className="text-xs text-slate-700">Happy path (validation passed)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="border-2 border-dashed border-red-500 px-3 py-1 rounded">
              <X className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-xs text-slate-700">Error/rejection path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <span className="text-xs text-slate-700">Checkpoint/approval gate</span>
          </div>
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg p-4 border-2 border-slate-300">
        <h4 className="font-bold text-sm text-slate-900 mb-4">Before/After: Single-file vs Multi-file</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-red-50 rounded-lg p-4 border-2 border-red-300">
            <div className="font-bold text-sm text-red-900 mb-3 flex items-center gap-2">
              <X className="w-4 h-4" />
              Before: Single File
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div>❌ One massive YAML file</div>
              <div>❌ Merge conflicts frequent</div>
              <div>❌ No team ownership separation</div>
              <div>❌ Hard to review changes</div>
              <div>❌ Risky deployments</div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
            <div className="font-bold text-sm text-green-900 mb-3 flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              After: Multi-file Domain Model
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div>✅ Modular YAML files by domain</div>
              <div>✅ Minimal merge conflicts</div>
              <div>✅ Clear team ownership</div>
              <div>✅ Easy to review & audit</div>
              <div>✅ Safe, incremental deploys</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200">
        <h4 className="font-bold text-sm text-slate-900 mb-4">Typical Timeline</h4>
        <div className="flex items-center justify-between">
          {[
            { day: "Day 1", label: "Access Request", color: "bg-blue-500" },
            { day: "Day 2", label: "Governance Review", color: "bg-orange-500" },
            { day: "Day 3", label: "Deploy via Terraform", color: "bg-green-500" },
            { day: "Day 4", label: "Audit Confirmation", color: "bg-purple-500" }
          ].map((stage, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="text-center">
                <div className={`${stage.color} text-white px-4 py-2 rounded-lg font-bold text-sm`}>
                  {stage.day}
                </div>
                <div className="text-xs text-slate-700 mt-2 max-w-[120px]">
                  {stage.label}
                </div>
              </div>
              {idx < 3 && <ArrowRight className="w-5 h-5 text-slate-400" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
