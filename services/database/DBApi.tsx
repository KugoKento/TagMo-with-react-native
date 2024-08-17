import * as SQLite from "expo-sqlite";

type TagMoDBProps = {
  transaction_date?: Date;
  payment_location?: string;
  category?: string;
  payment_method?: string;
  amount?: string;
};

const registerAmountList = async (props: TagMoDBProps): Promise<void> => {
  console.log("registerShopList呼ばれている確認1");
  console.log("props : " + props);
  const db = await SQLite.openDatabaseAsync("tagmo.db");
  console.log("db : " + db);
  console.log("registerShopList呼ばれている確認2");
  try {
    await db.runAsync(
      "INSERT INTO amount_list (transaction_date, payment_location, category, payment_method, amount) VALUES (?, ?, ?, ?, ?)",
      [
        props.transaction_date ? props.transaction_date.toISOString() : null,
        props.payment_location ?? null,
        props.category ?? null,
        props.payment_method ?? null,
        props.amount ?? null,
      ]
    );
    console.log("Insert operation completed successfully");

    const result = await db.runAsync("SELECT * FROM amount_list");
    console.log("DB : " + JSON.stringify(result));
  } catch (error) {
    console.error("Error in database operation:", error);
  }
  console.log("registerShopList呼ばれている確認3");
  const result = await db.runAsync("SELECT * FROM amount_list");
  console.log("DB : " + result);
};

export default { registerAmountList };
