CREATE TABLE IF NOT EXISTS user_preference (
	"userId" TEXT NOT NULL PRIMARY KEY REFERENCES "user" ("id") ON DELETE CASCADE,
	"cefrLevel" TEXT NOT NULL DEFAULT 'B1' CHECK ("cefrLevel" IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
	"createdAt" INTEGER NOT NULL DEFAULT (unixepoch() * 1000),
	"updatedAt" INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);
