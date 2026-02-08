import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userPreference = sqliteTable("user_preference", {
	userId: text("userId").primaryKey(),
	cefrLevel: text("cefrLevel").notNull().default("B1"),
	createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull(),
	updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).notNull()
});
