import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ORDER_STATUS_META, DATE_RANGE_OPTIONS } from "./analytics/analytics-utils";
import { STATUS_FILTER_ALL, SORT_OPTIONS } from "./order-filter-utils";

const STATUS_OPTIONS = [
  { value: STATUS_FILTER_ALL, label: "All" },
  ...Object.entries(ORDER_STATUS_META).map(([value, meta]) => ({ value, label: meta.label })),
];

const selectTriggerClass =
  "w-full sm:w-[170px] rounded-md border border-[#b2966c] px-4 py-2 text-gray-700 focus:border-[#b2966c] focus:ring-2 focus:ring-[#b2966c]";
const selectContentClass = "rounded-md border border-[#b2966c] bg-white shadow-md";

function OrdersFilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  sortOrder,
  onSortOrderChange,
  onClear,
  hasActiveFilters,
  resultCount,
  totalCount,
}) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Order ID, customer name or email"
            className="pl-9 border-[#b2966c] focus-visible:ring-[#b2966c]"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              {DATE_RANGE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={onSortOrderChange}>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem value={SORT_OPTIONS.NEWEST}>Newest first</SelectItem>
              <SelectItem value={SORT_OPTIONS.OLDEST}>Oldest first</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={onClear}
              className="border-[#b2966c] text-[#0a373b] hover:bg-[#efe7df]"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {resultCount} of {totalCount} orders
      </p>
    </div>
  );
}

export default OrdersFilterBar;
