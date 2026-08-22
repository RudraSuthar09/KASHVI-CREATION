import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingBag,
  PackageSearch,
  CheckCircle2,
  Clock,
  XCircle,
  Boxes,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { fetchAllProducts } from "@/store/admin/products-slice";

import DateRangeFilter from "@/components/admin-view/analytics/DateRangeFilter";
import KpiCard from "@/components/admin-view/analytics/KpiCard";
import OrdersOverTimeChart from "@/components/admin-view/analytics/OrdersOverTimeChart";
import OrderStatusChart from "@/components/admin-view/analytics/OrderStatusChart";
import CategoryChart from "@/components/admin-view/analytics/CategoryChart";
import TopSellingProducts from "@/components/admin-view/analytics/TopSellingProducts";
import RecentOrdersTable from "@/components/admin-view/analytics/RecentOrdersTable";
import LowStockAlert from "@/components/admin-view/analytics/LowStockAlert";
import EmptyState from "@/components/admin-view/analytics/EmptyState";
import {
  DATE_RANGES,
  filterOrdersByRange,
  computeKpis,
  computeOrdersOverTime,
  computeOrderStatusDistribution,
  computeTopSellingProducts,
  computeCategoryAnalytics,
  computeRecentOrders,
  computeLowStockProducts,
} from "@/components/admin-view/analytics/analytics-utils";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Skeleton className="h-80 rounded-lg" />
        <Skeleton className="h-80 rounded-lg" />
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}

function AdminAnalytics() {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState(DATE_RANGES.LAST_30_DAYS);
  const [fetchError, setFetchError] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { orderList } = useSelector((state) => state.adminOrder);
  const { productList } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    setFetchError(false);
    Promise.all([
      dispatch(getAllOrdersForAdmin()).unwrap().catch(() => {}),
      dispatch(fetchAllProducts()).unwrap().catch((err) => {
        setFetchError(true);
        throw err;
      }),
    ])
      .catch(() => {})
      .finally(() => setInitialized(true));
  }, [dispatch]);

  const orders = useMemo(() => orderList || [], [orderList]);
  const products = useMemo(() => productList || [], [productList]);

  const filteredOrders = useMemo(
    () => filterOrdersByRange(orders, dateRange),
    [orders, dateRange]
  );

  const kpis = useMemo(() => computeKpis(filteredOrders, products), [filteredOrders, products]);
  const ordersOverTime = useMemo(() => computeOrdersOverTime(filteredOrders), [filteredOrders]);
  const statusDistribution = useMemo(
    () => computeOrderStatusDistribution(filteredOrders),
    [filteredOrders]
  );
  const topProducts = useMemo(
    () => computeTopSellingProducts(filteredOrders, products),
    [filteredOrders, products]
  );
  const categoryAnalytics = useMemo(
    () => computeCategoryAnalytics(filteredOrders, products),
    [filteredOrders, products]
  );
  const recentOrders = useMemo(() => computeRecentOrders(filteredOrders), [filteredOrders]);
  const lowStockProducts = useMemo(() => computeLowStockProducts(products), [products]);

  const isLoading = !initialized;
  const hasNoDataAtAll = initialized && !fetchError && orders.length === 0 && products.length === 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold text-[#0a373b]">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">Loading analytics…</p>
        </div>
        <DashboardSkeleton />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-extrabold text-[#0a373b]">Analytics Dashboard</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-medium text-red-700">Could not load analytics data.</p>
          <p className="text-sm text-red-600 mt-1">
            Please check your connection and try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  if (hasNoDataAtAll) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-extrabold text-[#0a373b]">Analytics Dashboard</h1>
        <EmptyState message="No analytics data available yet." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0a373b]">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your store&apos;s orders, products and inventory.
          </p>
        </div>
        <DateRangeFilter value={dateRange} onChange={setDateRange} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard label="Total Orders" value={kpis.totalOrders} icon={ShoppingBag} accent="#0a373b" />
        <KpiCard label="Total Products" value={kpis.totalProducts} icon={Boxes} accent="#b2966c" />
        <KpiCard label="Items Sold" value={kpis.itemsSold} icon={PackageSearch} accent="#4a90a4" />
        <KpiCard label="Delivered" value={kpis.delivered} icon={CheckCircle2} accent="#2f9e44" />
        <KpiCard label="Pending" value={kpis.pending} icon={Clock} accent="#d68910" />
        <KpiCard label="Rejected" value={kpis.rejected} icon={XCircle} accent="#c0392b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OrdersOverTimeChart data={ordersOverTime} />
        <OrderStatusChart data={statusDistribution} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopSellingProducts data={topProducts} />
        <CategoryChart data={categoryAnalytics} />
      </div>

      <RecentOrdersTable data={recentOrders} />

      <LowStockAlert data={lowStockProducts} />
    </div>
  );
}

export default AdminAnalytics;
