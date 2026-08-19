import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "./EmptyState";

const PALETTE = ["#0a373b", "#b2966c", "#4a90a4", "#2f9e44", "#c0392b", "#8e6bb2", "#d68910"];

function CategoryChart({ data }) {
  return (
    <Card className="border-[#efe7df]">
      <CardHeader>
        <CardTitle className="text-lg">Sales by Category</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No category sales data available yet." />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#efe7df" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="#8a8a8a" />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#8a8a8a" />
              <Tooltip
                formatter={(value) => [value, "Units sold"]}
                contentStyle={{ borderRadius: 8, borderColor: "#b2966c" }}
              />
              <Bar dataKey="quantity" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={entry.category} fill={PALETTE[index % PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default CategoryChart;
