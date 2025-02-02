import { DbSchema, makeSchema } from "@livestore/livestore"
import { Schema } from "effect"
import * as mutations from "./mutations.js"

export { mutations }

const timestamp_sql = `(strftime('%s', 'now') * 1000)`

const file = DbSchema.table(
  "file",
  {
    id: DbSchema.text({ primaryKey: true }),
    name: DbSchema.text({ default: "Untitled" }),
    workspaceId: DbSchema.text({ default: "" }),
    created: DbSchema.integer({ default: { sql: timestamp_sql } }),
    modified: DbSchema.integer({ default: { sql: timestamp_sql } }),
    deleted: DbSchema.integer({ nullable: true }),
  },
  {
    indexes: [
      { name: "file_created", columns: ["created"] },
      { name: "file_modified", columns: ["modified"] },
    ],
    deriveMutations: true,
  }
)

export type File = DbSchema.FromTable.RowDecoded<typeof file>

const OrderDirection = Schema.Literal("asc", "desc")
export type OrderDirection = typeof OrderDirection.Type

const OrderBy = Schema.Literal("name", "created", "modified")
export type OrderBy = typeof OrderBy.Type

export const FilterState = Schema.Struct({
  orderBy: OrderBy,
  orderDirection: OrderDirection,
  query: Schema.optional(Schema.String),
})

export type FilterState = typeof FilterState.Type

export const filterStateTable = DbSchema.table(
  "filter_state",
  DbSchema.json({
    schema: FilterState,
    default: {
      orderBy: "name",
      orderDirection: "asc",
    },
  }),
  {
    deriveMutations: { enabled: true, localOnly: true },
  }
)

export const tables = {
  file,
  filterState: filterStateTable,
}

export const schema = makeSchema({ tables, mutations, migrations: { strategy: "from-mutation-log" } })
