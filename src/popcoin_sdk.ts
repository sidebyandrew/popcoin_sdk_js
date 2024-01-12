import {Bot} from "grammy";

function urlParseHashParams(locationHash: string) {
    console.info("urlParseHashParams start.")
    console.info(locationHash)
    locationHash = locationHash.replace(/^#/, '');
    console.info(locationHash)
    let params: { [key: string]: any } = {_path: ""};
    if (!locationHash.length) {
        console.info("urlParseHashParams 1.")
        return params;
    }
    if (locationHash.indexOf('=') < 0 && locationHash.indexOf('?') < 0) {
        params._path = urlSafeDecode(locationHash);
        console.info("urlParseHashParams 2.")
        return params;
    }
    var qIndex = locationHash.indexOf('?');
    if (qIndex >= 0) {
        console.info("urlParseHashParams 3.")
        var pathParam = locationHash.substr(0, qIndex);
        params._path = urlSafeDecode(pathParam);
        locationHash = locationHash.substr(qIndex + 1);
    }
    var locationHashParams = locationHash.split('&');
    var i, param, paramName, paramValue;
    for (i = 0; i < locationHashParams.length; i++) {

        param = locationHashParams[i].split('=');
        paramName = urlSafeDecode(param[0]);
        paramValue = param[1] == null ? null : urlSafeDecode(param[1]);
        params[paramName] = paramValue;

        console.info("paramName" + paramName)
        console.info("paramValue" + paramValue)
    }
    return params;
}

function urlSafeDecode(urlencoded: string): string {
    try {
        return decodeURIComponent(urlencoded);
    } catch (e) {
        return urlencoded;
    }
}


function main() {
    let url = new URL(location.href);
    window.PopcoinGameProxy = {
        urlSearchInfo: url.searchParams,
        shareScore: function () {
            if (window && window.TelegramGameProxy) {
                window.TelegramGameProxy.shareScore();
            } else {
                alert("I need to run at Telegram game environment.")
            }
        },

        getHistory: function (): any {
            alert("Pending...")
        },

        updateGameScore: function (score: number): any {
            const bot = new Bot("6811958485:AAFtOWH3d-5lFCmZmyV1CS_cTNRCjtW4PVg");
            let chatId = this.getChatId();
            let msgId = this.getMsgId();
            let tgId = this.getTgId();
            if (chatId && msgId && tgId) {
                bot.api.setGameScore(chatId, msgId, tgId, score, {force: true}).catch(r => {
                    console.error(r)
                });
            } else {
                console.error("Fail to setGameScore")
                console.error("p_chat_id="+chatId)
                console.error("p_msg_id="+msgId)
                console.error("p_tg_id="+tgId)
            }
        },
        getChatId: function (): string {
            this.urlSearchInfo.forEach(function(value:string, key:string) {
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

main();

