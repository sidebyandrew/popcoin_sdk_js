"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grammy_1 = require("grammy");
function urlParseHashParams(locationHash) {
    locationHash = locationHash.replace(/^#/, '');
    var params = { _path: "" };
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
function urlSafeDecode(urlencoded) {
    try {
        return decodeURIComponent(urlencoded);
    }
    catch (e) {
        return urlencoded;
    }
}
function endgame(target, playerId, score) {
    alert("Pending...");
    var bt = '6811958485:AAFtOWH3d-5lFCmZmyV1CS_cTNRCjtW4PVg';
    var bot = new grammy_1.Bot(bt);
    var chatId = target.getChatId();
    var msgId = target.getMsgId();
    var tgId = target.getTgId();
    if (chatId && msgId && tgId) {
        bot.api.setGameScore(chatId, msgId, tgId, score, { force: true }).catch(function (r) {
            console.error(r);
        });
    }
    else {
        console.error("setGameScore fail");
    }
}
function main() {
    var locationHash = '';
    try {
        locationHash = location.hash.toString();
    }
    catch (e) {
    }
    window.PopcoinGameProxy = {
        initParams: urlParseHashParams(locationHash),
        shareScore: function () {
            if (window && window.TelegramGameProxy) {
                window.TelegramGameProxy.shareScore();
            }
            else {
                alert("I need to run at Telegram game environment.");
            }
        },
        getHistory: function () {
            alert("Pending...");
        },
        gameEndCallback: function (type, playerId, playerScore, competitorId, competitorScore) {
            alert("Pending...");
        },
        getChatId: function () {
            return this.initParams["p_chat_id"];
        },
        getMsgId: function () {
            return this.initParams["p_msg_id"];
        },
        getTgId: function () {
            return this.initParams["p_tg_id"];
        },
    };
}
main();
