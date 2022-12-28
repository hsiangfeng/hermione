# 妙麗·格蘭傑

![妙麗·格蘭傑](https://i.imgur.com/HJ4DIw0.png)

> 「你是我見過的最聰明的小女巫，妙麗。」——雷木思·路平在妙麗揭露他是個狼人之後說道。

## 關於

這是一個基於 [OPEN AI](https://openai.com/) 的 GPT-3 Discord 機器人，名為「妙麗·格蘭傑」。

主要職責是負責與大家聊天，解決各式各樣的疑難雜症，主要適用於 Discord 的論壇，只要有使用者開啟一個新的貼文，妙麗就會立即回應你，而一個貼文代表一個主題，這樣可以讓妙麗可以更好地理解討論內容並集中討論。

目前支援兩種模式

- 論壇頻道
  - 適合集中討論一個主題，當字數超過一定時，將會提醒另開新貼文，避免過多的字數導致疊加爆掉。
- 文字頻道
  - 適合純聊天用，不會有字數限制，但最多只會撈取特定數量的聊天記錄，避免過多的字數導致疊加爆掉。

（疊加：OpenAI 計算方式是一個字/Token，因此字數越多，需要付出的金額越高。）

## 專案說明

> 專案目前部署於 [Render](https://render.com) 伺服器，採用的免費版，因此會有時數限制，目前 Render 伺服器每月可用時數為 750 小時，每月 1 日會重置。
> 一天約 24 小時，一個月大約 31 天，因此 31 天 * 24 小時 = 744 小時，所以理論上來講是足夠使用的。
> 教學可詳見：[關於從 Heroku 跳到 Render 這件事情](https://israynotarray.com/other/20221213/3036227586/)

如果想避免 Render 的機器睡著的話，可以使用「[UptimeRobot](https://uptimerobot.com/)」讓機器保持開機狀態。

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
# AI 機器人模式
## channel：文字頻道
## forum：論壇頻道
## all: 文字頻道＆論壇頻道
DISCORD_MODE=all

# Discord Bot
DISCORD_BOT_TOKEN=

# Discord Channel
DISCORD_CHANNEL_ID=
DISCORD_CHANNEL_MAX_MESSAGE=

# Discord Forum ID
DISCORD_FORUM_ID=

# Open AI
OPEN_AI_API_KEY=

# Max Tokens
OPEN_AI_MAX_TOKENS=

# Max Text Length
MAX_TEXT_LENGTH=

# Open AI Model
## text-davinci-003 => 達芬奇：最聰明，適合處理複雜的結論、總結前後
## text-curie-001 => 居里夫人：適合處理語言翻譯、情感、摘要
## text-babbage-001 => 巴貝奇：適合簡單分類、語義搜尋分類 
## text-ada-001 => 阿達：適合分析文字、簡單分類、地址修正、關鍵字
OPEN_AI_GPT_MODEL=

# Open AI Temperature
OPEN_AI_TEMPERATURE=

# Open AI Top P
OPEN_AI_TOP_P=

# Open AI Frequency Penalty
OPEN_AI_FREQUENCY_PENALTY=

# Open AI Presence Penalty
OPEN_AI_PRESENCE_PENALTY=
```

可以嘗試輸入 `cp .env.example .env` 來複製 `.env.example` 檔案。

- DISCORD_MODE：設置回覆模式，但若為 all 模式，則 DISCORD_CHANNEL_ID 與 DISCORD_FORUM_ID 必須設置。
- DISCORD_BOT_TOKEN：Discord Bot 機器人的 Token。
- DISCORD_CHANNEL_ID & DISCORD_FORUM_ID：主要是用來限制妙麗只能在特定頻道回應，避免妙麗到處回應而消耗過多的 Tokens。
- DISCORD_CHANNEL_MAX_MESSAGE：主要是限制妙麗撈取文字頻道最大筆數，避免撈取過多的資料，例如：撈取十筆留言，就設置 10。
  - 我個人測試下來，認為文字頻道 AI 滿容易笨笨的，所以個人還是會建議讓妙麗在論壇頻道回應為主，因為比較容易有上下關聯。
- OPEN_AI_API_KEY：Open AI 的 API Key。
- OPEN_AI_MAX_TOKENS：主要是限制妙麗回應的字數，因為每個字都會消耗一個 Token，所以可以設定回應的字數。
- MAX_TEXT_LENGTH：主要是避免一個貼文的內容文字太多，而導致 Tokens 消耗過快以及回應時間過長。
- OPEN_AI_GPT_MODEL：目前有四種，可以自行選擇，目前最強大的是達芬奇，但是也是最耗費 Tokens，同時也是最聰明的。
- OPEN_AI_TEMPERATURE：控制 GPT 模型生成文本的隨機性。值越大，GPT 模型生成的文本就越隨機；值越小，GPT 模型生成的文本就越傾向於遵循訓練數據集中的文本模式。
