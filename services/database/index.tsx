import { SQLiteDatabase } from "expo-sqlite";

//ここは開発が終わったら修正する

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
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
        amount INTEGER NOT NULL,
        memo TEXT
        );
    `);

    await insertSampleData(db); // データ挿入関数を呼び出す

    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

// 日付を1日ずつずらして10000個のデータを挿入する関数
async function insertSampleData(db: SQLiteDatabase) {
  const startDate = new Date(); // 現在の日付から始める
  const numberOfRecords = 100;
  const paymentMethods = [
    "現金",
    "クレジット",
    "QRコード",
    "交通系IC",
    "口座振込",
    "立て替え",
    "POINT",
    "商品券",
    "その他",
  ];
  const categories = [
    "食品",
    "交通",
    "光熱費",
    "娯楽",
    "医療",
    "教育",
    "その他",
  ];

  const inserts = [];

  for (let i = 0; i < numberOfRecords; i++) {
    const transactionDate = new Date(startDate);
    transactionDate.setDate(startDate.getDate() + i);

    const paymentMethod = paymentMethods[i % paymentMethods.length];
    const category = categories[i % categories.length];
    const amount = Math.floor(Math.random() * 10000) + 1; // 1 から 10000 のランダムな金額

    inserts.push(`
      (${i + 1}, '${transactionDate.toISOString()}', 'Location ${
        i + 1
      }', '${paymentMethod}', '${category}', ${amount})
    `);
  }

  const insertQuery = `
    INSERT INTO amount_list (id, transaction_date, payment_location, payment_method, category, amount) VALUES
    ${inserts.join(", ")}
  `;

  await db.execAsync(insertQuery);
}
