import { useEffect, useMemo, useState } from "react";
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
import OrdersFilterBar from "./orders-filter-bar";
import { DATE_RANGES, filterOrdersByRange } from "./analytics/analytics-utils";
import {
  STATUS_FILTER_ALL,
  SORT_OPTIONS,
  searchOrders,
  filterOrdersByStatus,
  sortOrders,
} from "./order-filter-utils";

function formatOrderDate(orderDate) {
  if (!orderDate) return "—";
  const d = new Date(orderDate);
  return Number.isNaN(d.getTime()) ? "—" : orderDate.split("T")[0];
}

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(STATUS_FILTER_ALL);
  const [dateRange, setDateRange] = useState(DATE_RANGES.ALL_TIME);
  const [sortOrder, setSortOrder] = useState(SORT_OPTIONS.NEWEST);
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

  const allOrders = useMemo(() => orderList || [], [orderList]);

  const displayedOrders = useMemo(() => {
    const byDate = filterOrdersByRange(allOrders, dateRange);
    const byStatus = filterOrdersByStatus(byDate, status);
    const bySearch = searchOrders(byStatus, search);
    return sortOrders(bySearch, sortOrder);
  }, [allOrders, dateRange, status, search, sortOrder]);

  const hasActiveFilters =
    search.trim() !== "" || status !== STATUS_FILTER_ALL || dateRange !== DATE_RANGES.ALL_TIME || sortOrder !== SORT_OPTIONS.NEWEST;

  function handleClearFilters() {
    setSearch("");
    setStatus(STATUS_FILTER_ALL);
    setDateRange(DATE_RANGES.ALL_TIME);
    setSortOrder(SORT_OPTIONS.NEWEST);
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersFilterBar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            onClear={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
            resultCount={displayedOrders.length}
            totalCount={allOrders.length}
          />
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
                {displayedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      {allOrders.length === 0
                        ? "No orders yet."
                        : "No orders match your search or filters."}
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedOrders.map((orderItem) => (
                      <TableRow key={orderItem._id}>
                        <TableCell>{orderItem._id}</TableCell>
                        <TableCell>{formatOrderDate(orderItem.orderDate)}</TableCell>
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
                            {orderItem.orderStatus || "Unknown"}
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
                                {orderItem.orderStatus || "Unknown"}
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
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrdersView;