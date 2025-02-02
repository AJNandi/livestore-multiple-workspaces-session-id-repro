import { defineMutation, sql } from "@livestore/livestore"
import { Schema } from "effect"

const now = "(strftime('%s', 'now') * 1000)"

export const createFile = defineMutation(
  "createFile",
  Schema.Struct({
    fileId: Schema.String,
    workspaceId: Schema.String,
    name: Schema.String,
  }),
  [
    sql`
      INSERT INTO file (id, workspaceId, name, created, modified) 
      VALUES ($fileId, $workspaceId, $name, ${now}, ${now})
      `,
  ]
)
