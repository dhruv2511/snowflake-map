import { Network, Lock, Zap, UserCog, ArrowRight, ArrowDown } from "lucide-react";

export function SnowflakeLayer() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-8 bg-blue-900 rounded"></div>
        <h3 className="text-xl font-bold text-slate-900">Layer 3: Snowflake Enforcement</h3>
      </div>
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 border-2 border-blue-700">
        <div className="flex items-start gap-4">
          {/* Box 8: Snowflake Roles */}
          <div className="flex-1 bg-white rounded-xl p-5 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Network className="w-5 h-5 text-blue-900" />
              </div>
              <h4 className="font-bold text-slate-900">Snowflake Roles</h4>
            </div>
            <div className="space-y-3">
              {/* Role Hierarchy Tree */}
              <div className="border-l-4 border-blue-900 pl-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
                  <span className="font-bold text-slate-900">OWNER</span>
                  <span className="text-xs bg-blue-100 px-2 py-0.5 rounded">apex</span>
                </div>
                <div className="ml-6 border-l-2 border-blue-400 pl-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <ArrowDown className="w-3 h-3 text-blue-600" />
                    <span className="font-semibold text-slate-800">DATA_ENGINEER</span>
                  </div>
                  <div className="ml-6 border-l-2 border-blue-300 pl-4">
                    <div className="flex items-center gap-2">
                      <ArrowDown className="w-3 h-3 text-blue-500" />
                      <span className="text-slate-700">ANALYST</span>
                    </div>
                    <div className="ml-6 mt-2">
                      <div className="flex items-center gap-2">
                        <ArrowDown className="w-3 h-3 text-blue-400" />
                        <span className="text-slate-600 text-sm">STEWARD</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-6 border-l-2 border-green-400 pl-4">
                  <div className="flex items-center gap-2">
                    <ArrowDown className="w-3 h-3 text-green-600" />
                    <span className="font-semibold text-slate-800">INGEST</span>
                    <span className="text-xs bg-green-100 px-2 py-0.5 rounded">parallel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-white flex-shrink-0 mt-8" />

          {/* Box 9: Grants Engine */}
          <div className="flex-1 bg-white rounded-xl p-5 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="w-5 h-5 text-blue-900" />
              </div>
              <h4 className="font-bold text-slate-900">Grants Engine</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-semibold text-sm text-blue-900 mb-2">Database Grants</div>
                <div className="flex flex-wrap gap-1">
                  {["USAGE", "CREATE SCHEMA"].map(grant => (
                    <span key={grant} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                      {grant}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="font-semibold text-sm text-green-900 mb-2">Schema Grants</div>
                <div className="flex flex-wrap gap-1">
                  {["USAGE", "CREATE TABLE", "CREATE VIEW"].map(grant => (
                    <span key={grant} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                      {grant}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="font-semibold text-sm text-purple-900 mb-2">Future Table/View Grants</div>
                <div className="flex flex-wrap gap-1">
                  {["SELECT", "INSERT", "UPDATE", "DELETE"].map(grant => (
                    <span key={grant} className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">
                      {grant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-white flex-shrink-0 mt-8" />

          {/* Box 10: Warehouse Usage */}
          <div className="flex-1 bg-white rounded-xl p-5 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-5 h-5 text-blue-900" />
              </div>
              <h4 className="font-bold text-slate-900">Warehouse Usage</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                <span className="font-mono text-xs">LOADING_WH</span>
                <span className="text-xs text-slate-600">INGEST</span>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                <span className="font-mono text-xs">TRANSFORM_WH</span>
                <span className="text-xs text-slate-600">DATA_ENGINEER</span>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                <span className="font-mono text-xs">QUERY_WH</span>
                <span className="text-xs text-slate-600">ANALYST</span>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                <span className="font-mono text-xs">ADMIN_WH</span>
                <span className="text-xs text-slate-600">OWNER</span>
              </div>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-white flex-shrink-0 mt-8" />

          {/* Box 11: Service Users */}
          <div className="flex-1 bg-white rounded-xl p-5 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCog className="w-5 h-5 text-blue-900" />
              </div>
              <h4 className="font-bold text-slate-900">Service Users</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-3 rounded-lg border border-blue-200">
                <div className="font-mono text-xs font-bold text-blue-900 mb-1">SVC_INGEST_USER</div>
                <div className="text-xs text-slate-600">🔑 Key-pair auth</div>
                <div className="text-xs text-slate-600">→ INGEST role</div>
                <div className="text-xs text-slate-600">→ LOADING_WH</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-slate-50 p-3 rounded-lg border border-green-200">
                <div className="font-mono text-xs font-bold text-green-900 mb-1">SVC_TRANSFORM_USER</div>
                <div className="text-xs text-slate-600">🔑 Key-pair auth</div>
                <div className="text-xs text-slate-600">→ DATA_ENGINEER role</div>
                <div className="text-xs text-slate-600">→ TRANSFORM_WH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
