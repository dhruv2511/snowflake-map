import { FileCode, Cog, ShieldCheck, GitPullRequest, ArrowRight, X, Check, Diamond } from "lucide-react";

export function TerraformLayer() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-8 bg-orange-500 rounded"></div>
        <h3 className="text-xl font-bold text-slate-900">Layer 2: Terraform RBAC Engine</h3>
      </div>
      
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 border-2 border-orange-200">
        <div className="flex items-center gap-4">
          {/* Box 4: Multi-file Domain Config */}
          <div className="flex-1 bg-white rounded-lg p-5 shadow-md border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded">
                <FileCode className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-bold text-slate-900">Multi-file Domain Config</h4>
            </div>
            <div className="space-y-1.5">
              {[
                "base/meta.yaml",
                "account/admin-roles.yaml",
                "domains/matchmerge/objects.yaml",
                "domains/matchmerge/roles.yaml",
                "principals/user-bindings.yaml"
              ].map((file) => (
                <div key={file} className="bg-orange-100 p-2 rounded text-sm font-mono flex items-center gap-2">
                  <span className="text-slate-800">{file}</span>
                </div>
              ))}
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-orange-600 flex-shrink-0" />

          {/* Box 5: Terraform Workflow */}
          <div className="flex-1 bg-white rounded-lg p-5 shadow-md border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded">
                <Cog className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-bold text-slate-900">Terraform Workflow</h4>
            </div>
            <div className="space-y-3">
              <div className="border-l-4 border-orange-400 pl-3">
                <div className="font-semibold text-sm text-slate-900">Step 1: Load</div>
                <code className="text-xs text-slate-700">fileset("*.yaml")</code>
              </div>
              <div className="border-l-4 border-orange-400 pl-3">
                <div className="font-semibold text-sm text-slate-900">Step 2: Parse</div>
                <code className="text-xs text-slate-700">yamldecode(file)</code>
              </div>
              <div className="border-l-4 border-orange-400 pl-3">
                <div className="font-semibold text-sm text-slate-900">Step 3: Merge</div>
                <code className="text-xs text-slate-700">layer precedence + merge()/flatten()</code>
              </div>
              <div className="border-l-4 border-orange-400 pl-3">
                <div className="font-semibold text-sm text-slate-900">Step 4: Apply Modules</div>
                <code className="text-xs text-slate-700">account-foundation + domain-access-engine</code>
              </div>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-orange-600 flex-shrink-0" />

          {/* Box 6: Validation Gates */}
          <div className="flex-1 bg-white rounded-lg p-5 shadow-md border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded">
                <ShieldCheck className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-bold text-slate-900">Validation Gates</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-slate-700">Database refs valid?</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-slate-700">Role refs valid?</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-slate-700">Warehouse refs valid?</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-slate-700">Owner role exists?</span>
              </div>
            </div>
          </div>

          {/* Decision Diamond */}
          <div className="flex flex-col items-center gap-2">
            <Diamond className="w-8 h-8 text-orange-600 fill-orange-100" />
            <div className="flex flex-col gap-1 text-xs font-semibold">
              <div className="flex items-center gap-1 text-green-600">
                <Check className="w-3 h-3" />
                <span>Pass</span>
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <X className="w-3 h-3" />
                <span>Fail</span>
              </div>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-green-600 flex-shrink-0" />

          {/* Box 7: Plan & Approval */}
          <div className="flex-1 bg-white rounded-lg p-5 shadow-md border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded">
                <GitPullRequest className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-bold text-slate-900">Plan & Approval</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="bg-slate-100 p-2 rounded font-mono text-xs">
                <div className="text-green-700">+ 3 to add</div>
                <div className="text-yellow-700">~ 1 to change</div>
                <div className="text-red-700">- 0 to destroy</div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-green-700">PR Approved</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Error path (shown below) */}
        <div className="mt-4 flex justify-center">
          <div className="border-2 border-dashed border-red-400 bg-red-50 rounded-lg px-4 py-2 flex items-center gap-3">
            <X className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-red-700">Validation Failed → Pipeline Stops</span>
          </div>
        </div>
      </div>
    </div>
  );
}
