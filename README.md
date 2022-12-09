# 妙麗·格蘭傑

> 「你是我見過的最聰明的小女巫，妙麗。」——雷木思·路平在妙麗揭露他是個狼人之後說道。

![妙麗·格蘭傑](https://i.imgur.com/7Iot9e0.png)

## 關於

這是一個基於 [OPEN AI](https://openai.com/) 的 GPT-3 Discord 機器人，名為「妙麗·格蘭傑」。

主要職責是負責與大家聊天，解決各式各樣的疑難雜症，主要適用於 Discord 的論壇，只要有使用者開啟一個新的貼文，妙麗就會立即回應你，而一個貼文代表一個主題，這樣可以讓妙麗可以更好地理解討論內容並集中討論。

因此如果要討論新的東西，就會建議開啟一個新的貼文新的討論，這樣子妙麗再給予回饋時才會正確。

## 專案說明

> 專案目前部署於 [Render](https://render.com) 伺服器，採用的免費版，因此會有時數限制，目前 Render 伺服器每月可用時數為 750 小時，每月 1 日會重置。

一天約 24 小時，一個月大約 31 天，因此 31 天 * 24 小時 = 744 小時，所以理論上來講是足夠使用的。

### Node.js 版本

```bash
Node：16.15.0
```

### 專案還原指令

```bash
pnpm install
```

或是

```bash
pnpm i
```

### 專案啟動指令

```bash
pnpm start
```

### 補充

如果不熟悉 pnpm 也可以考慮安裝 `ni`，這樣就不用特別去學 `pnpm` 指令了。

[一個 ni 搞定安裝？！用 ni 來取代你的 npm/yarn/pnpm/bun 吧！](https://israynotarray.com/nodejs/20221127/2847196536/)

## 環境變數

下載後依據 `.env.example` 建立 `.env` 檔案，並填入相關資訊。

```env
# Discord Bot
DISCORD_BOT_TOKEN=

# Discord Channel
DISCORD_CHANNEL_ID=

# Open AI
OPEN_AI_API_KEY=

# Text Count
TEXT_COUNT=1000

# Open AI Model
## text-davinci-003 => 達芬奇：最聰明，適合處理複雜的結論、總結前後
## text-curie-001 => 居里夫人：適合處理語言翻譯、情感、摘要
## text-babbage-001 => 巴貝奇：適合簡單分類、語義搜尋分類 
## text-ada-001 => 阿達：適合分析文字、簡單分類、地址修正、關鍵字
OPEN_AI_GPT_MODEL="text-davinci-003"
```

Discord Channel 主要是用來限制妙麗只能在特定頻道回應，避免過度回應而消耗過多的 Tokens。

Open AI Model 目前有四種，可以自行選擇，目前最強大的是達芬奇，但是也是最耗費 Tokens，同時也是最聰明的。

Text Count 主要是避免一個討論串太長，妙麗會回應太多，因此可以設定回應的字數。
