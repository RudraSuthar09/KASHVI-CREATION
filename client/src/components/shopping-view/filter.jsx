import { filterOptions } from "@/config";
import { Fragment, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

function ProductFilter({ filters, handleFilter }) {
  const [expandedSections, setExpandedSections] = useState(
    Object.keys(filterOptions).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  );

  const [isOpen, setIsOpen] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(
    Object.keys(filterOptions).reduce((acc, key) => {
      acc[key] = 7;
      return acc;
    }, {})
  );

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleShowMore = (key) => {
    setVisibleOptions((prev) => ({
      ...prev,
      [key]: filterOptions[key].length,
    }));
  };

  const FilterContent = () => (
    <div className="space-y-2 text-gray-800">
      {Object.keys(filterOptions).map((keyItem, index) => (
        <Fragment key={keyItem}>
          <div className="transition-colors duration-200">
            <button
              onClick={() => toggleSection(keyItem)}
              className="w-full flex justify-between items-center py-2 px-4 font-medium"
            >
              <h3 className="text-sm font-semibold">{keyItem}</h3>
              {expandedSections[keyItem] ? (
                <ChevronUp className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              )}
            </button>
            {expandedSections[keyItem] && (
              <div className="grid gap-1 px-4 pb-2">
                {filterOptions[keyItem].slice(0, visibleOptions[keyItem]).map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-[#efe7df] px-2 py-1 rounded"
                  >
                    <Checkbox
                      checked={
                        filters?.[keyItem]?.includes(option.id)
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="h-4 w-4 rounded border-gray-400 focus:ring-gray-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </Label>
                ))}
                {filterOptions[keyItem].length > 7 && visibleOptions[keyItem] === 7 && (
                  <div className="pl-4 pt-1">
                    <span
                      onClick={() => handleShowMore(keyItem)}
                      className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      See more +
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          {index < Object.keys(filterOptions).length - 1 && <Separator className="bg-gray-200" />}
        </Fragment>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-400 text-gray-600 bg-white hover:bg-gray-100"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-4 bg-white overflow-y-auto max-h-[100vh]">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Filters</h2>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
      {/* Desktop Filter */}
      <div className="hidden md:block bg-white border border-gray-200 w-64  p-4 h-auto">
        <h2 className="text-sm font-semibold text-gray-700 pb-2 border-b">Filters</h2>
        <FilterContent />
      </div>
    </>
  );
}

export default ProductFilter;
