import { queryDb, SessionIdSymbol } from "@livestore/livestore"
import { useRow, useScopedQuery } from "@livestore/react"
import { FilterState, tables } from "./schema.js"

const filterStateToOrderBy = (filterState: FilterState) => [{ col: filterState.orderBy, direction: filterState.orderDirection }]

export const useFiles = (): readonly string[] => {
  return useScopedQuery(
    () =>
      queryDb((get) =>
        tables.file.query
          .select("id", { pluck: true })
          .where("deleted", "=", null)
          .orderBy(filterStateToOrderBy(get(filterState$)))
      ),
    []
  )
}

export const useFilterState = () => useRow(tables.filterState, SessionIdSymbol)
export const filterState$ = queryDb(tables.filterState.query.row(SessionIdSymbol), { label: "global.filterState" })
