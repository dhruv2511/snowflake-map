import { Printer, Download } from "lucide-react";
import { Button } from "./ui/button";

export function ExportButtons() {
  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // Trigger browser's save as PDF functionality
    window.print();
  };

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50 no-print">
      <Button
        onClick={handlePrint}
        variant="outline"
        className="bg-white shadow-lg hover:shadow-xl"
      >
        <Printer className="w-4 h-4 mr-2" />
        Print
      </Button>
      <Button
        onClick={handleExport}
        className="bg-blue-600 text-white shadow-lg hover:shadow-xl hover:bg-blue-700"
      >
        <Download className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
    </div>
  );
}
