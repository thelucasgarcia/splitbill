-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillSettings" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "description" TEXT,
    "editValues" BOOLEAN NOT NULL DEFAULT false,
    "inviteMembers" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BillSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillSettings_billId_key" ON "BillSettings"("billId");

-- AddForeignKey
ALTER TABLE "BillSettings" ADD CONSTRAINT "BillSettings_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
