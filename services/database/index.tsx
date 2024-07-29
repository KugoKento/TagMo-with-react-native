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
      [new Date().toISOString(), "Location 6", "Groceries", "Debit Card", 75]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 7", "Books", "Cash", 45]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 8", "Utilities", "Credit Card", 120]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 9", "Dining", "Credit Card", 65]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 10", "Transportation", "Cash", 30]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [
        new Date().toISOString(),
        "Location 11",
        "Entertainment",
        "Debit Card",
        200,
      ]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 12", "Health", "Insurance", 250]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 13", "Rent", "Bank Transfer", 1000]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [
        new Date().toISOString(),
        "Location 14",
        "Subscriptions",
        "Credit Card",
        15,
      ]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 6", "Groceries", "Debit Card", 75]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 7", "Books", "Cash", 45]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 8", "Utilities", "Credit Card", 120]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 9", "Dining", "Credit Card", 65]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 10", "Transportation", "Cash", 30]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [
        new Date().toISOString(),
        "Location 11",
        "Entertainment",
        "Debit Card",
        200,
      ]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 12", "Health", "Insurance", 250]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [new Date().toISOString(), "Location 13", "Rent", "Bank Transfer", 1000]
    );

    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [
        new Date().toISOString(),
        "Location 14",
        "Subscriptions",
        "Credit Card",
        15,
      ]
    );

    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
