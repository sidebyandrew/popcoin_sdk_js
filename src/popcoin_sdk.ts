import {Bot} from "grammy";


function urlParseHashParams(locationHash: string) {
    locationHash = locationHash.replace(/^#/, '');
    var params: { [key: string]: any } = {_path: ""};
    if (!locationHash.length) {
        return params;
    }
    if (locationHash.indexOf('=') < 0 && locationHash.indexOf('?') < 0) {
        params._path = urlSafeDecode(locationHash);
        return params;
    }
    var qIndex = locationHash.indexOf('?');
    if (qIndex >= 0) {
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

function endgame(target:any, playerId:string, score:number) {
    alert("Pending...")
    const bt = '6811958485:AAFtOWH3d-5lFCmZmyV1CS_cTNRCjtW4PVg';
    const bot = new Bot(bt);
    let chatId = target.getChatId();
    let msgId = target.getMsgId();
    let tgId = target.getTgId();
    if (chatId && msgId && tgId) {
        bot.api.setGameScore(chatId, msgId, tgId, score, {force: true}).catch(r => {
            console.error(r)
        });
    } else {
        console.error("setGameScore fail")
    }
}

function main() {
    let locationHash = '';
    try {
        locationHash = location.hash.toString();
    } catch (e) {
    }

    window.PopcoinGameProxy = {
        initParams: urlParseHashParams(locationHash),
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

        gameEndCallback: function (type: string, playerId: string, playerScore: bigint, competitorId?: string, competitorScore?: bigint,): any {
            alert("Pending...")
        },
        getChatId: function (): string {
            return this.initParams["p_chat_id"];
        },
        getMsgId: function (): string {
            return this.initParams["p_msg_id"];
        },
        getTgId: function (): string {
            return this.initParams["p_tg_id"];
        },



    }

}

main();

