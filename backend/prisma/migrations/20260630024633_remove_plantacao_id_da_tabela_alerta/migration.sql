/*
  Warnings:

  - You are about to drop the column `plantacao_id` on the `alerta` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_alerta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leitura_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "notificacao" BOOLEAN NOT NULL DEFAULT false,
    "gerado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "alerta_leitura_id_fkey" FOREIGN KEY ("leitura_id") REFERENCES "leitura" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "alerta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_alerta" ("gerado_em", "id", "leitura_id", "mensagem", "notificacao", "tipo", "usuario_id") SELECT "gerado_em", "id", "leitura_id", "mensagem", "notificacao", "tipo", "usuario_id" FROM "alerta";
DROP TABLE "alerta";
ALTER TABLE "new_alerta" RENAME TO "alerta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
