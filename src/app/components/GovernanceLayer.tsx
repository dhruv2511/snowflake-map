import { Users, ClipboardCheck, FolderKanban, ArrowRight } from "lucide-react";

export function GovernanceLayer() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-8 bg-blue-500 rounded"></div>
        <h3 className="text-xl font-bold text-slate-900">Layer 1: Governance & Policy</h3>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-center justify-between gap-4">
          {/* Box 1: Access Request */}
          <div className="flex-1 bg-white rounded-xl p-5 shadow-md border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900">Access Request</h4>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Users/teams request data access</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Business justification required</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Defined access scope & duration</span>
              </div>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-blue-600 flex-shrink-0" />

          {/* Box 2: RBAC Policy Review */}
          <div className="flex-1 bg-white rounded-xl p-5 shadow-md border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClipboardCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900">RBAC Policy Review</h4>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Governance board approval</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Security team review</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Compliance verification</span>
              </div>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-blue-600 flex-shrink-0" />

          {/* Box 3: Config Ownership Assignment */}
          <div className="flex-1 bg-white rounded-xl p-5 shadow-md border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderKanban className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900">Config Ownership</h4>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="bg-blue-50 p-2 rounded">
                <span className="font-semibold">Platform Team:</span> account/admin-roles.yaml
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <span className="font-semibold">Security Team:</span> domains/*/roles.yaml
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <span className="font-semibold">Request Team:</span> principals/user-bindings.yaml
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
