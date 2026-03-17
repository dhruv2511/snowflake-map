import { GovernanceLayer } from "./components/GovernanceLayer";
import { TerraformLayer } from "./components/TerraformLayer";
import { SnowflakeLayer } from "./components/SnowflakeLayer";
import { ControlsPanel } from "./components/ControlsPanel";
import { DeployMonitorPanel } from "./components/DeployMonitorPanel";
import { DiagramLegend } from "./components/DiagramLegend";
import { DiagramHeader } from "./components/DiagramHeader";
import { ExportButtons } from "./components/ExportButtons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { WhereAreWeTab } from "./components/WhereAreWeTab";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <ExportButtons />
      <div className="max-w-[1800px] mx-auto">
        <DiagramHeader />

        <Tabs defaultValue="model" className="mt-8">
          <div className="flex justify-center">
            <TabsList className="bg-slate-200/80 p-1.5">
              <TabsTrigger value="model" className="px-6">Operating Model</TabsTrigger>
              <TabsTrigger value="status" className="px-6">Where Are We</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="model">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 mt-4">
              {/* Main Diagram Container */}
              <div className="flex gap-6">
                {/* Left Controls Panel */}
                <div className="flex-shrink-0">
                  <ControlsPanel />
                </div>

                {/* Center: 3 Layers */}
                <div className="flex-1 space-y-8">
                  {/* Layer 1: Governance & Policy */}
                  <GovernanceLayer />

                  {/* Layer 2: Terraform RBAC Engine */}
                  <TerraformLayer />

                  {/* Layer 3: Snowflake Enforcement */}
                  <SnowflakeLayer />
                </div>

                {/* Right: Deploy & Monitor Panel */}
                <div className="flex-shrink-0">
                  <DeployMonitorPanel />
                </div>
              </div>

              {/* Legend at Bottom */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <DiagramLegend />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status">
            <WhereAreWeTab />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-600 text-sm">
          <p>
            For detailed runbook, see <code className="bg-slate-200 px-2 py-1 rounded">snowflake_rbac/README.md</code>
          </p>
        </div>
      </div>
    </div>
  );
}