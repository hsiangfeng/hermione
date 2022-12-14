module.exports = {
  replyMessage: '等我一下，我正在想要怎麼回覆你...',
  errorMessage: ({ status, statusText }) => `對不起，我發生 **${status} - ${statusText}** 錯誤，所以沒有辦法回覆你。`,
  sendMaxLengthMessage: (maxLength) => `對不起 >_< 這個貼文內容已經超過 **${maxLength}** 字了！\n所以我無法在繼續回覆你了...\n建議你另外開啟新貼文唷~`,
};
