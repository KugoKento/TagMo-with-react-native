import * as SQLite from "expo-sqlite";

//下記の2つのtypeはいつか統一したい。
//undefinedを許容する・しないで統一できないかもしれない。

type TagMoDBProps = {
  id?: string;
  transaction_date?: Date;
  payment_location?: string;
  category?: string;
  payment_method?: string;
  amount?: string;
};

type ListItemProps = {
  id: string;
  transaction_date: Date;
  category: string;
  payment_location: string;
  payment_method: string;
  amount: string;
};

const getAmountList = async (): Promise<ListItemProps[]> => {
  const db = await SQLite.openDatabaseAsync("tagmo.db");
  try {
    const result = await db.getAllAsync<ListItemProps>(
      "SELECT * FROM amount_list ORDER BY transaction_date DESC"
    );
    return result;
  } catch (error) {
    console.error("Error in database operation:", error);
    return [];
  }
};

const registerAmountList = async (props: TagMoDBProps): Promise<void> => {
  const db = await SQLite.openDatabaseAsync("tagmo.db");
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
  } catch (error) {
    console.error("Error in database operation:", error);
  }
};

const deleteAmountList = async (props: TagMoDBProps): Promise<void> => {
  const db = await SQLite.openDatabaseAsync("tagmo.db");
  try {
  } catch (error) {
    console.error("Error in database operation:", error);
  }
};

export default { getAmountList, registerAmountList, deleteAmountList };
