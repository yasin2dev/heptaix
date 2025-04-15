CREATE TABLE IF NOT EXISTS "todo"."todos" (
    "todoId" UUID NOT NULL,
    "title" CHARACTER VARYING NOT NULL,
    "textContent" TEXT NOT NULL,
    "description" CHARACTER VARYING,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE
);