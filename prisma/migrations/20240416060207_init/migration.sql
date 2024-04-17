-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufacturer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "stockInDate" TIMESTAMP(3) NOT NULL,
    "sellDate" TIMESTAMP(3),
    "packageId" INTEGER,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "fittingDate" TIMESTAMP(3) NOT NULL,
    "warrantyExpiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "package_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "device_serialNumber_key" ON "device"("serialNumber");

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
