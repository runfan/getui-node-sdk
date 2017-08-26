var crypto = require('crypto');
var uuid = require('uuid')
exports.md5 = function(text) {
    return crypto.createHash('md5').update(text).digest('hex');  //hex是编码方式，可以为'hex', 'binary' 或者'base64'
};

exports.uuid = function() {
    return uuid.v4();
};

exports.createPostParams = function (message, target, requestId, appKey) {
    if (requestId == null) {
        requestId = this.uuid();
    }

    var postData = {
        'requestId': requestId,
        'action': 'pushMessageToSingleAction',
        'appkey': appKey,
        //message
        'clientData': message.getData().getTransparent().toBase64(),
        'transmissionContent': message.getData().getTransmissionContent(),
        'isOffline': message.getOffline(),
        'offlineExpireTime': message.getOfflineExpireTime(),
        'pushType': message.getData().getPushType(),
        'pushNetWorkType': message.getPushNetWorkType(),
        //target
        'appId': target.getAppId(),
        'clientId': target.getClientId(),
        'alias': target.getAlias(),
        // 默认都为消息
        // Default as message
        'type': 2
    };
    return postData;
};
