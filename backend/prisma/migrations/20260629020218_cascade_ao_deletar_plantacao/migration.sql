-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_alerta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leitura_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "plantacao_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "notificacao" BOOLEAN NOT NULL DEFAULT false,
    "gerado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "alerta_leitura_id_fkey" FOREIGN KEY ("leitura_id") REFERENCES "leitura" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "alerta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "alerta_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "plantacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_alerta" ("gerado_em", "id", "leitura_id", "mensagem", "notificacao", "plantacao_id", "tipo", "usuario_id") SELECT "gerado_em", "id", "leitura_id", "mensagem", "notificacao", "plantacao_id", "tipo", "usuario_id" FROM "alerta";
DROP TABLE "alerta";
ALTER TABLE "new_alerta" RENAME TO "alerta";
CREATE TABLE "new_plantacao_sensor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plantacao_id" TEXT NOT NULL,
    "sensor_id" TEXT NOT NULL,
    "limite_atencao" REAL NOT NULL,
    "limite_critico" REAL NOT NULL,
    CONSTRAINT "plantacao_sensor_plantacao_id_fkey" FOREIGN KEY ("plantacao_id") REFERENCES "plantacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plantacao_sensor_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_plantacao_sensor" ("id", "limite_atencao", "limite_critico", "plantacao_id", "sensor_id") SELECT "id", "limite_atencao", "limite_critico", "plantacao_id", "sensor_id" FROM "plantacao_sensor";
DROP TABLE "plantacao_sensor";
ALTER TABLE "new_plantacao_sensor" RENAME TO "plantacao_sensor";
CREATE UNIQUE INDEX "plantacao_sensor_sensor_id_key" ON "plantacao_sensor"("sensor_id");
CREATE UNIQUE INDEX "plantacao_sensor_plantacao_id_sensor_id_key" ON "plantacao_sensor"("plantacao_id", "sensor_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
