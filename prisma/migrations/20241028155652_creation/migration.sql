-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "phonenum" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "department" INTEGER,
    "role" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phonenum_key" ON "users"("phonenum");
