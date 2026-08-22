// Pure aggregation helpers for the admin analytics dashboard.
// Everything here derives numbers from the real orders/products arrays
// already fetched via the existing admin APIs — nothing is invented.

export const DATE_RANGES = {
  TODAY: "today",
  LAST_7_DAYS: "last7",
  LAST_30_DAYS: "last30",
  ALL_TIME: "all",
};

export const DATE_RANGE_OPTIONS = [
  { value: DATE_RANGES.TODAY, label: "Today" },
  { value: DATE_RANGES.LAST_7_DAYS, label: "Last 7 Days" },
  { value: DATE_RANGES.LAST_30_DAYS, label: "Last 30 Days" },
  { value: DATE_RANGES.ALL_TIME, label: "All Time" },
];

export const ORDER_STATUS_META = {
  pending: { label: "Pending", color: "#b2966c" },
  inProcess: { label: "In Process", color: "#0a373b" },
  inShipping: { label: "In Shipping", color: "#4a90a4" },
  delivered: { label: "Delivered", color: "#2f9e44" },
  rejected: { label: "Rejected", color: "#c0392b" },
};

// Orders in these statuses represent a genuine, still-live sale.
// Rejected orders never converted, so they're excluded from
// "items sold" / "top products" / "category" calculations.
const LIVE_SALE_STATUSES = ["pending", "inProcess", "inShipping", "delivered"];

const LOW_STOCK_THRESHOLD = 5;

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function filterOrdersByRange(orders, range) {
  if (!Array.isArray(orders)) return [];
  if (range === DATE_RANGES.ALL_TIME) return orders;

  const now = new Date();
  let cutoff;
  if (range === DATE_RANGES.TODAY) {
    cutoff = startOfToday();
  } else if (range === DATE_RANGES.LAST_7_DAYS) {
    cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (range === DATE_RANGES.LAST_30_DAYS) {
    cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  } else {
    return orders;
  }

  return orders.filter((order) => {
    const orderDate = order?.orderDate ? new Date(order.orderDate) : null;
    return orderDate && !Number.isNaN(orderDate.getTime()) && orderDate >= cutoff;
  });
}

export function computeKpis(orders, products) {
  const totalOrders = orders.length;
  const delivered = orders.filter((o) => o.orderStatus === "delivered").length;
  const pending = orders.filter((o) => o.orderStatus === "pending").length;
  const rejected = orders.filter((o) => o.orderStatus === "rejected").length;
  const itemsSold = orders
    .filter((o) => LIVE_SALE_STATUSES.includes(o.orderStatus))
    .reduce(
      (sum, order) =>
        sum + (order.cartItems || []).reduce((s, item) => s + (item.quantity || 0), 0),
      0
    );

  return {
    totalOrders,
    totalProducts: products.length,
    delivered,
    pending,
    rejected,
    itemsSold,
  };
}

export function computeOrdersOverTime(orders) {
  const counts = new Map();
  orders.forEach((order) => {
    if (!order.orderDate) return;
    const d = new Date(order.orderDate);
    if (Number.isNaN(d.getTime())) return;
    const key = d.toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return Array.from(counts.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, orders]) => ({ date, orders }));
}

export function computeOrderStatusDistribution(orders) {
  const counts = {};
  orders.forEach((order) => {
    const status = order.orderStatus || "unknown";
    counts[status] = (counts[status] || 0) + 1;
  });

  return Object.entries(counts).map(([status, count]) => ({
    status,
    label: ORDER_STATUS_META[status]?.label || status,
    color: ORDER_STATUS_META[status]?.color || "#999999",
    count,
  }));
}

export function computeTopSellingProducts(orders, products, limit = 8) {
  const productById = new Map(products.map((p) => [String(p._id), p]));
  const soldQty = new Map();

  orders
    .filter((o) => LIVE_SALE_STATUSES.includes(o.orderStatus))
    .forEach((order) => {
      (order.cartItems || []).forEach((item) => {
        const key = String(item.productId);
        soldQty.set(key, (soldQty.get(key) || 0) + (item.quantity || 0));
      });
    });

  return Array.from(soldQty.entries())
    .map(([productId, quantity]) => {
      const product = productById.get(productId);
      return {
        productId,
        quantity,
        title: product?.title || "Unknown product",
        image: product?.media?.[0] || null,
        category: product?.category || "Uncategorized",
      };
    })
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
}

export function computeCategoryAnalytics(orders, products) {
  const productById = new Map(products.map((p) => [String(p._id), p]));
  const counts = new Map();

  orders
    .filter((o) => LIVE_SALE_STATUSES.includes(o.orderStatus))
    .forEach((order) => {
      (order.cartItems || []).forEach((item) => {
        const product = productById.get(String(item.productId));
        const category = product?.category || "Uncategorized";
        counts.set(category, (counts.get(category) || 0) + (item.quantity || 0));
      });
    });

  return Array.from(counts.entries())
    .map(([category, quantity]) => ({ category, quantity }))
    .sort((a, b) => b.quantity - a.quantity);
}

export function computeRecentOrders(orders, limit = 10) {
  return [...orders]
    .sort((a, b) => new Date(b.orderDate || 0) - new Date(a.orderDate || 0))
    .slice(0, limit);
}

export function computeLowStockProducts(products, threshold = LOW_STOCK_THRESHOLD) {
  return products
    .filter((p) => typeof p.totalStock === "number" && p.totalStock <= threshold)
    .sort((a, b) => a.totalStock - b.totalStock);
}

export { LOW_STOCK_THRESHOLD, LIVE_SALE_STATUSES };
