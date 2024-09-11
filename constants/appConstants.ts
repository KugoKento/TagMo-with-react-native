// 全体としてまとめた方がいい、変更可能性がある定数をまとめる

export const API_VALUE = {
  SHOPLIST_API: {
    SEARCH_RADIUS: 100,
  },
} as const;

export const HOME_VALUE = {
  AMOUNT: {
    BUTTON_1: {
      ICON_NAME: "payments",
      TEXT: "現金",
    },
    BUTTON_2: {
      ICON_NAME: "credit-card",
      TEXT: "クレジット",
    },
    BUTTON_3: {
      ICON_NAME: "qr-code-2",
      TEXT: "QRコード",
    },
    BUTTON_4: {
      ICON_NAME: "commute",
      TEXT: "交通系IC",
    },
    BUTTON_5: {
      ICON_NAME: "savings",
      TEXT: "口座振込",
    },
    BUTTON_6: {
      ICON_NAME: "currency-exchange",
      TEXT: "立て替え",
    },
    BUTTON_7: {
      ICON_NAME: "thumb-up",
      TEXT: "POINT",
    },
    BUTTON_8: {
      ICON_NAME: "card-giftcard",
      TEXT: "商品券",
    },
    BUTTON_9: {
      ICON_NAME: "help-outline",
      TEXT: "その他",
    },
  },
  CATEGORY: {
    BUTTON_1: {
      ICON_NAME: "restaurant",
      TEXT: "食費",
    },
    BUTTON_2: {
      ICON_NAME: "shopping-bag",
      TEXT: "日用品",
    },
    BUTTON_3: {
      ICON_NAME: "checkroom",
      TEXT: "被服費",
    },
    BUTTON_4: {
      ICON_NAME: "add-reaction",
      TEXT: "美容費",
    },
    BUTTON_5: {
      ICON_NAME: "sports-bar",
      TEXT: "交際費",
    },
    BUTTON_6: {
      ICON_NAME: "videogame-asset",
      TEXT: "趣味",
    },
    BUTTON_7: {
      ICON_NAME: "commute",
      TEXT: "交通費",
    },
    BUTTON_8: {
      ICON_NAME: "import-contacts",
      TEXT: "教育",
    },
    BUTTON_9: {
      ICON_NAME: "medication",
      TEXT: "医療費",
    },
    BUTTON_10: {
      ICON_NAME: "luggage",
      TEXT: "特別費",
    },
    BUTTON_11: {
      ICON_NAME: "monitor-heart",
      TEXT: "保険料",
    },
    BUTTON_12: {
      ICON_NAME: "house",
      TEXT: "住居",
    },
    BUTTON_13: {
      ICON_NAME: "room-preferences",
      TEXT: "水道・光熱",
    },
    BUTTON_14: {
      ICON_NAME: "phonelink-ring",
      TEXT: "通信費",
    },
    BUTTON_15: {
      ICON_NAME: "help-outline",
      TEXT: "その他",
    },
  },
} as const;
