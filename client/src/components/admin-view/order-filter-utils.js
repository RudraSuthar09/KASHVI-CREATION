// Pure search/filter/sort helpers for the admin orders page.
// Operates entirely on the order list already returned by the existing
// GET /api/admin/orders/get endpoint — no extra fetching or invented fields.

export const SORT_OPTIONS = {
  NEWEST: "newest",
  OLDEST: "oldest",
};

export const STATUS_FILTER_ALL = "all";

function safeLower(value) {
  return typeof value === "string" ? value.toLowerCase() : "";
}

export function searchOrders(orders, query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return orders;

  return orders.filter((order) => {
    const id = safeLower(order._id);
    const name = safeLower(order.addressInfo?.name);
    const email = safeLower(order.customerEmail);
    return id.includes(trimmed) || name.includes(trimmed) || email.includes(trimmed);
  });
}

export function filterOrdersByStatus(orders, status) {
  if (!status || status === STATUS_FILTER_ALL) return orders;
  return orders.filter((order) => order.orderStatus === status);
}

export function sortOrders(orders, sortOrder) {
  const withTime = (order) => {
    const t = order.orderDate ? new Date(order.orderDate).getTime() : NaN;
    return Number.isNaN(t) ? 0 : t;
  };

  const sorted = [...orders].sort((a, b) => withTime(a) - withTime(b));
  return sortOrder === SORT_OPTIONS.OLDEST ? sorted : sorted.reverse();
}
