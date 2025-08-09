CREATE TABLE IF NOT EXISTS "todo"."categories" (
    "id" UUID NOT NULL,
    "category" CHARACTER VARYING NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE
);