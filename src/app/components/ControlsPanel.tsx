import { Lock, Shield, FileText, Search, RotateCcw } from "lucide-react";

export function ControlsPanel() {
  const controls = [
    {
      icon: Lock,
      label: "Least Privilege",
      description: "Only grant necessary privileges",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Shield,
      label: "Segregation of Duties",
      description: "Owner, engineer, analyst roles separated",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: FileText,
      label: "Code Review",
      description: "All changes via PR",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Search,
      label: "Auditability",
      description: "All actions logged and versioned",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: RotateCcw,
      label: "Rollback",
      description: "Revert via git/Terraform",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="w-64 space-y-3">
      <div className="bg-gradient-to-b from-slate-100 to-slate-50 rounded-lg p-4 border-2 border-slate-300">
        <h3 className="font-bold text-slate-900 mb-4 text-center border-b border-slate-300 pb-2">
          Controls Panel
        </h3>
        <div className="space-y-3">
          {controls.map((control, idx) => {
            const Icon = control.icon;
            return (
              <div 
                key={idx}
                className={`${control.bgColor} rounded-lg p-3 border border-slate-200 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Icon className={`w-5 h-5 ${control.color}`} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 mb-1">
                      {control.label}
                    </div>
                    <div className="text-xs text-slate-600">
                      {control.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audience Callouts */}
      <div className="bg-white rounded-lg p-4 border-2 border-slate-200 shadow-sm">
        <h4 className="font-bold text-xs text-slate-500 mb-3 uppercase tracking-wide">
          Audience Focus
        </h4>
        <div className="space-y-2 text-xs">
          <div className="border-l-4 border-blue-500 pl-2">
            <div className="font-bold text-blue-700">Executives</div>
            <div className="text-slate-600">Layer 1 + Controls</div>
          </div>
          <div className="border-l-4 border-orange-500 pl-2">
            <div className="font-bold text-orange-700">Engineers</div>
            <div className="text-slate-600">Layer 2 + Layer 3</div>
          </div>
          <div className="border-l-4 border-purple-500 pl-2">
            <div className="font-bold text-purple-700">Auditors</div>
            <div className="text-slate-600">Deploy & Monitor</div>
          </div>
        </div>
      </div>
    </div>
  );
}
