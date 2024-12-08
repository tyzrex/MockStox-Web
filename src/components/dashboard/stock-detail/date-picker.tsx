"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const years = Array.from({ length: 13 }, (_, i) => 2012 + i);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DateSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get("year") || ""
  );
  const [selectedMonth, setSelectedMonth] = useState(
    searchParams.get("month") || ""
  );

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);
    if (selectedYear) params.set("year", selectedYear);
    if (selectedMonth) params.set("month", selectedMonth);
    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSelectedYear("");
    setSelectedMonth("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap- w-full justify-between">
      <div className="flex flex-col sm:flex-row gap-4 py-4">
        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMonth} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem
                key={month}
                value={(index + 1).toString().padStart(2, "0")}
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-center gap-3 ">
        <Button
          onClick={() => {
            handleClear();
          }}
          variant={"outline"}
          className="w-full"
        >
          Clear
        </Button>

        <Button
          onClick={() => {
            handleApply();
          }}
          className="w-full text-black bg-gradient-to-r from-purple-300 to-orange-200"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
