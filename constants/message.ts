// メッセージをまとめる

export const COMMON_MESSAGE = {
  APP_TITLE: "TagMo",
  BUTTON: {
    PATTERN_YES: "OK",
    PATTERN_NO: "CANCEL",
  },
} as const;

export const HISTORY_MESSAGE = {
  BUTTON_DELETE: {
    DISPLAY:"削除",
    CLICK_START: {
      HEADER: "データ削除",
      MESSAGE: "選択されたデータが削除されますが、よろしいですか？",
    },
    CLICK_END: {
      MESSAGE:"削除が完了しました"
    }
  },
} as const;
