import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "./EmptyState";

function formatDateLabel(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function OrdersOverTimeChart({ data }) {
  return (
    <Card className="border-[#efe7df]">
      <CardHeader>
        <CardTitle className="text-lg">Orders Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No orders in this period yet." />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0a373b" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0a373b" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#efe7df" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDateLabel}
                tick={{ fontSize: 12 }}
                stroke="#8a8a8a"
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#8a8a8a" />
              <Tooltip
                labelFormatter={(v) => formatDateLabel(v)}
                formatter={(value) => [value, "Orders"]}
                contentStyle={{ borderRadius: 8, borderColor: "#b2966c" }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#0a373b"
                strokeWidth={2}
                fill="url(#ordersFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default OrdersOverTimeChart;
