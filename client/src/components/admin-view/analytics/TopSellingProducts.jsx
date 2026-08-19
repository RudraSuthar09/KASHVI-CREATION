import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import EmptyState from "./EmptyState";

function TopSellingProducts({ data }) {
  return (
    <Card className="border-[#efe7df]">
      <CardHeader>
        <CardTitle className="text-lg">Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No product sales recorded yet." />
        ) : (
          <ul className="divide-y divide-[#efe7df]">
            {data.map((item, index) => (
              <li key={item.productId} className="flex items-center gap-3 py-3">
                <span className="w-5 text-sm font-semibold text-[#b2966c]">{index + 1}</span>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-10 w-10 rounded-md object-cover border border-[#efe7df]"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-md bg-[#f8f4f0] flex items-center justify-center border border-[#efe7df]">
                    <Package className="h-5 w-5 text-[#b2966c]" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0a373b]">{item.quantity}</p>
                  <p className="text-xs text-muted-foreground">sold</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export default TopSellingProducts;
