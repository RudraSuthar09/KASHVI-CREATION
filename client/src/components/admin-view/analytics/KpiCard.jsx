import { Card, CardContent } from "@/components/ui/card";

function KpiCard({ label, value, icon: Icon, accent = "#0a373b" }) {
  return (
    <Card className="border-[#efe7df] shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">{label}</p>
          <p className="text-2xl md:text-3xl font-extrabold mt-1" style={{ color: accent }}>
            {value}
          </p>
        </div>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${accent}1a` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
      </CardContent>
    </Card>
  );
}

export default KpiCard;
