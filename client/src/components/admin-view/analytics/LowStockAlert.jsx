import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import EmptyState from "./EmptyState";
import { LOW_STOCK_THRESHOLD } from "./analytics-utils";

function LowStockAlert({ data }) {
  return (
    <Card className="border-[#efe7df]">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <CardTitle className="text-lg">
          Low Stock Alert <span className="text-sm font-normal text-muted-foreground">(≤ {LOW_STOCK_THRESHOLD} units)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No products are low on stock right now." />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium max-w-[180px] truncate">
                      {product.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.category || "—"}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {product.totalStock}
                    </TableCell>
                    <TableCell>
                      <Badge className={product.totalStock === 0 ? "bg-red-600" : "bg-amber-500"}>
                        {product.totalStock === 0 ? "Out of stock" : "Low stock"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default LowStockAlert;
