import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import AdminOrderDetailsView from "@/components/admin-view/order-details";
import {
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { ORDER_STATUS_META } from "./analytics-utils";
import EmptyState from "./EmptyState";

function RecentOrdersTable({ data }) {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleViewOrder(id) {
    dispatch(getOrderDetailsForAdmin(id));
    setOpenDetailsDialog(true);
  }

  return (
    <Card className="border-[#efe7df]">
      <CardHeader>
        <CardTitle className="text-lg">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message="No orders in this period yet." />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((order) => {
                  const meta = ORDER_STATUS_META[order.orderStatus];
                  const itemCount = (order.cartItems || []).reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0
                  );
                  return (
                    <TableRow
                      key={order._id}
                      className="cursor-pointer hover:bg-[#f8f4f0]"
                      onClick={() => handleViewOrder(order._id)}
                    >
                      <TableCell className="font-mono text-xs">
                        {order._id.slice(-8)}
                      </TableCell>
                      <TableCell>{order.addressInfo?.name || "—"}</TableCell>
                      <TableCell>
                        {order.orderDate ? order.orderDate.split("T")[0] : "—"}
                      </TableCell>
                      <TableCell className="text-right">{itemCount}</TableCell>
                      <TableCell>
                        <Badge style={{ backgroundColor: meta?.color || "#333" }}>
                          {meta?.label || order.orderStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        <Dialog
          open={openDetailsDialog}
          onOpenChange={(open) => {
            setOpenDetailsDialog(open);
            if (!open) dispatch(resetOrderDetails());
          }}
        >
          {orderDetails ? <AdminOrderDetailsView orderDetails={orderDetails} /> : null}
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default RecentOrdersTable;
