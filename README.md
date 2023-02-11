# Restaurant
使用 Node.js + Express 打造的餐廳美食介紹網站

### 產品功能
* 使用者可以使用email或使用Facebook進行註冊/登入，管理個人餐廳清單
* 使用者可以點擊任一餐廳，查看餐廳資訊，如地址、電話與簡介
* 使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋
* 使用者可以瀏覽全部所有餐廳
* 使用者可以新增餐廳
* 使用者可以刪除餐廳
* 使用者可以編輯餐廳

### 執行環境及套件
* bcryptjs: ^2.4.3
* body-parser: ^1.20.1
* connect-flash: ^0.1.1
* dotenv: ^16.0.3
* express: ^4.16.4
* express-handlebars: ^3.0.0
* express-session: ^1.17.1
* method-override: ^3.0.0
* mongoose: ^6.7.2
* passport: ^0.4.1
* passport-facebook: ^3.0.0
* passport-local: ^1.0.0

### 專案安裝步驟
1. 開啟Terminal，下載專案至本地位置
```
cd "存放專案本機位置"
git clone https://github.com/Leon180/ac_restaurant.git
```
2.初始化專案
```
cd ac_restaurant  //切換至專案資料夾
npm install  //安裝套件
```
3.開啟程式
```
npm run start  //執行程式
```
Terminal顯示 Express is listening the port 3000... 即啟動完成，請至http://localhost:3000 使用專案

### Contributor
Leon Li
