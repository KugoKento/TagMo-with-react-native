import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

//ここは開発が終わったら修正する

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  let currentDbVersion = result ? result.user_version : 0; //resultが定義されていれば前代入、そうでなければ0代入

  // 開発用にDBはリセットされるようにする
  // 開発用データを挿入する
  // if (currentDbVersion >= DATABASE_VERSION) {
  //   return;
  // }
  if (/*currentDbVersion === 0*/ true) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS amount_list;
      CREATE TABLE amount_list (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , 
        transaction_date TIMESTAMP NOT NULL, 
        payment_location TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        category TEXT NOT NULL,
        amount INTEGER NOT NULL
        );
    `);

    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
