import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

//ここは開発が終わったら修正する

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  let currentDbVersion = result ? result.user_version : 0; //resultが定義されていれば前代入、そうでなければ0代入

  // console.log("currentDbVersion:", currentDbVersion);
  // console.log("DATABASE_VERSION:", DATABASE_VERSION);

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
    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "ローソン", "飲み物", "Suica", 500]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "ユニクロ", "衣服", "クレジットカード", 3000]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "サンクス", "食材", "Paypay", 1200]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [
        new Date().toISOString(),
        "ツタヤァァァァァァァァァァァァァァ",
        "書籍",
        "現金",
        1500,
      ]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [
        new Date().toISOString(),
        "ヤマダ電機",
        "家電",
        "クレジットカード",
        45000,
      ]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "ドトール", "飲食", "デビットカード", 800]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "オーケーストア", "食材", "現金", 3000]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "トヨタ", "車検", "銀行振込", 20000]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [
        new Date().toISOString(),
        "Amazonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
        "サブスクリプション",
        "クレジットカード",
        50000000000000000,
      ]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "マクドナルド", "飲食", "デビットカード", 1000]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "ジュンク堂", "書籍", "現金", 2500]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "ファミリーマート", "飲み物", "Suica", 350]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "丸亀製麺", "飲食", "現金", 1200]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "コメダ珈琲", "飲食", "クレジットカード", 1500]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [
        new Date().toISOString(),
        "ミニストップ",
        "飲み物",
        "デビットカード",
        500,
      ]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "ドン・キホーテ", "日用品", "現金", 3500]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "東急ストア", "食材", "Paypay", 2500]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "サミット", "食材", "クレジットカード", 4000]
    );

    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
