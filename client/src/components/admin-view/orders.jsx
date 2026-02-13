import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead className="hidden md:table-cell">Order Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    <span className="sr-only">Details</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList && orderList.length > 0
                  ? orderList.map((orderItem) => (
                      <TableRow key={orderItem._id}>
                        <TableCell>{orderItem._id}</TableCell>
                        <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            className={`py-1 px-3 ${
                              orderItem.orderStatus === "confirmed"
                                ? "bg-green-500"
                                : orderItem.orderStatus === "rejected"
                                ? "bg-red-600"
                                : "bg-black"
                            }`}
                          >
                            {orderItem.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Dialog
                            open={openDetailsDialog}
                            onOpenChange={() => {
                              setOpenDetailsDialog(false);
                              dispatch(resetOrderDetails());
                            }}
                          >
                            <Button
                              onClick={() => handleFetchOrderDetails(orderItem._id)}
                              style={{ backgroundColor: '#0a373b', color: 'white' }}
                            >
                              View Details
                            </Button>
                            <AdminOrderDetailsView orderDetails={orderDetails} />
                          </Dialog>
                        </TableCell>
                        <TableCell className="md:hidden">
                          <div className="flex flex-col space-y-2">
                            <div>
                              <Badge
                                className={`py-1 px-3 ${
                                  orderItem.orderStatus === "confirmed"
                                    ? "bg-green-500"
                                    : orderItem.orderStatus === "rejected"
                                    ? "bg-red-600"
                                    : "bg-black"
                                }`}
                              >
                                {orderItem.orderStatus}
                              </Badge>
                            </div>
                            <div>
                              <Dialog
                                open={openDetailsDialog}
                                onOpenChange={() => {
                                  setOpenDetailsDialog(false);
                                  dispatch(resetOrderDetails());
                                }}
                              >
                                <Button
                                  onClick={() => handleFetchOrderDetails(orderItem._id)}
                                  style={{ backgroundColor: '#0a373b', color: 'white' }}
                                >
                                  View Details
                                </Button>
                                <AdminOrderDetailsView orderDetails={orderDetails} />
                              </Dialog>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrdersView;