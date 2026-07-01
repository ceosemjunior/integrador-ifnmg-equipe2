-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sensor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Inativo',
    "direcao" TEXT NOT NULL DEFAULT 'ABAIXO',
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_sensor" ("criado_em", "id", "nome", "status", "tipo", "unidade") SELECT "criado_em", "id", "nome", "status", "tipo", "unidade" FROM "sensor";
DROP TABLE "sensor";
ALTER TABLE "new_sensor" RENAME TO "sensor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
