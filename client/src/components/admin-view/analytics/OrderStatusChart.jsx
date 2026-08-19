import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "./EmptyState";

function OrderStatusChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card className="border-[#efe7df]">
      <CardHeader>
        <CardTitle className="text-lg">Orders by Status</CardTitle>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <EmptyState message="No orders in this period yet." />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.status} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} orders`, name]}
                contentStyle={{ borderRadius: 8, borderColor: "#b2966c" }}
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderStatusChart;
