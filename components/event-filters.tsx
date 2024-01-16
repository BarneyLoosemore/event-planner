"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useOptimistic, useTransition } from "react";

const filterTypes = ["all", "past", "upcoming"] as const;
export type FilterType = (typeof filterTypes)[number];

export const EventFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const activeFilter = searchParams.get("filter") as FilterType | null;
  const [optimisticFilter, setOptimisticFilter] = useOptimistic(activeFilter);

  const handleFilterChange =
    (filterType: FilterType) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      startTransition(() => setOptimisticFilter(filterType));
      const params = new URLSearchParams(searchParams);
      params.set("filter", filterType);
      replace(`${pathname}?${params.toString()}`);
    };

  return (
    <ul className="mb-2 flex gap-4" aria-label="Filter events">
      {filterTypes.map((filterType) => (
        <li key={filterType}>
          <Link
            href={{
              search: `?filter=${filterType}`,
            }}
            onClick={handleFilterChange(filterType)}
            className={`border-b-2 pb-1 text-sm text-slate-700 hover:opacity-90 sm:text-lg ${
              filterType === optimisticFilter
                ? isPending
                  ? "animate-pulse border-b-slate-300"
                  : "border-b-slate-700"
                : "border-b-transparent"
            }`}
            {...(filterType === optimisticFilter && { "aria-current": "page" })} // indicate the active filter
          >
            {filterType}
          </Link>
        </li>
      ))}
    </ul>
  );
};
