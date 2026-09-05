import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

// SQLite database - local file
const client = createClient({
  url: "file:./database.db",
});

export const db = drizzle(client);