# TagMo-with-react-native

TagMo

## コンセプト
- Tag型家計簿アプリ
- 位置情報による、小売店・飲食店などのタグ付けを用いて、支出の記録を容易にする

## 画面デザイン
- シンプルで洗練されたUI

- Home
![](https://github.com/KugoKento/store-picture/blob/main/Home.jpg)

- Settings
![](https://github.com/KugoKento/store-picture/blob/main/Settings.jpg)

- Amount
![](https://github.com/KugoKento/store-picture/blob/main/Amount.jpg)

- History
![](https://github.com/KugoKento/store-picture/blob/main/History.jpg)

- Balance
![](https://github.com/KugoKento/store-picture/blob/main/Balance.jpg)

## 画面遷移

## 機能一覧
- 位置情報による近隣の小売店・飲食店などの表示、記録
- 利用金額及び利用決済手段の記録
- 記録内容の編集
- カテゴリー、決済手段ごとの累計利用金額の表示

## 技術構成
- ReactNative
- Typescript
- Firebase
 - Firebase Cloud Firestore(DB)
 - Firebase Authentication(認証)

## インストール方法

一般的な支出管理アプリとは、予算の設定や進捗管理ができるようですね
無駄遣いを防ぐ機能があるとなおよい。
昔あったclarity money？とかいうやつはサブスクを勝手に解約してくれたりしたらしい。
（その後GSに何百億とかで買われた）
将来的には、位置情報をもとにした行動アドバイスがあるといいよね。
例　スーパー行くならバローよりろぴあ行った時の方が平均○%安いですよ的な