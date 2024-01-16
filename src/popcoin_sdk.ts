import {Bot} from "grammy";
import {_TG_BOT_TOKEN} from "./config";


function popcoin_sdk_main() {
    let popcoin_loader_url = new URL(location.href);
    window.PopcoinGameProxy = {
        urlSearchInfo: popcoin_loader_url.searchParams,
        shareScore: function () {
            if (window && window.TelegramGameProxy) {
                window.TelegramGameProxy.shareScore();
            } else {
                alert("I need to run at Telegram Game Environment.")
            }
        },

        getHistory: function (): any {
            alert("Pending...")
        },

        updateGameScore: function (score: number): any {
            const bot = new Bot(_TG_BOT_TOKEN);
            let chatId = this.getChatId();
            let msgId = this.getMsgId();
            let tgId = this.getTgId();
            if (chatId && msgId && tgId) {
                bot.api.setGameScore(chatId, msgId, tgId, score, {force: true}).catch(r => {
                    console.error(r)
                });
            } else {
                console.error("Fail to setGameScore")
                console.error("p_chat_id=" + chatId)
                console.error("p_msg_id=" + msgId)
                console.error("p_tg_id=" + tgId)
            }
        },
        getChatId: function (): string {
            this.urlSearchInfo.forEach(function (value: string, key: string) {
                console.log(key, value);
            });
            return this.urlSearchInfo.get("p_chat_id");
        },
        getMsgId: function (): string {
            return this.urlSearchInfo.get("p_msg_id");
        },
        getTgId: function (): string {
            return this.urlSearchInfo.get("p_tg_id");
        },
    }
}

popcoin_sdk_main();

