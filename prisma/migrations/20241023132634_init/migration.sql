-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "phoneNum" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "department" INTEGER NOT NULL DEFAULT 1,
    "role" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNum_key" ON "users"("phoneNum");
