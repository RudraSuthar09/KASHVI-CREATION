import { DATE_RANGE_OPTIONS } from "./analytics-utils";

function DateRangeFilter({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {DATE_RANGE_OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              active
                ? "bg-[#0a373b] text-white border-[#0a373b]"
                : "bg-white text-[#0a373b] border-[#b2966c] hover:bg-[#efe7df]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default DateRangeFilter;
