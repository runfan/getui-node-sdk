var Promise = require('bluebird');

exports.GeTui = require('./GT.push');
exports.Target = require('./getui/Target');

exports.APNTemplate = require('./getui/template/APNTemplate');
exports.BaseTemplate = require('./getui/template/BaseTemplate');
exports.APNPayload = require('./payload/APNPayload');
exports.DictionaryAlertMsg = require('./payload/DictionaryAlertMsg');
exports.SimpleAlertMsg = require('./payload/SimpleAlertMsg');
exports.NotyPopLoadTemplate = require('./getui/template/NotyPopLoadTemplate');
exports.LinkTemplate = require('./getui/template/LinkTemplate');
exports.NotificationTemplate = require('./getui/template/NotificationTemplate');
exports.PopupTransmissionTemplate = require('./getui/template/PopupTransmissionTemplate');
exports.TransmissionTemplate = require('./getui/template/TransmissionTemplate');

exports.SingleMessage = require('./getui/message/SingleMessage');
exports.AppMessage = require('./getui/message/AppMessage');
exports.ListMessage = require('./getui/message/ListMessage');
exports.GtConfig = require('./GtConfig');
exports.GtReq = require('./getui/GtReq');
Promise.promisifyAll(GeTui.prototype);