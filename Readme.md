# 说明
  Node wrapper for getui OS SDK API
  基于个推 nodejs sdk 4.0.1.0 进行 Promise 封装
# api
 [个推官方文档](http://docs.getui.com/server/nodejs/start/)
# 使用 bluebird 对 GeTui 进行 Promise 封装
```javascript

    // http的域名
    var HOST = 'http://sdk.open.api.igexin.com/apiex.htm';

    //https的域名
    // var HOST = 'https://api.getui.com/apiex.htm';

    //Android用户测试
    var APPID = '';
    var APPKEY = '';
    var MASTERSECRET = '';
    var CID = '';
    var gt = new GeTui(HOST, APPKEY, MASTERSECRET);
    // 使用Promise
    gt.getUserTagsAsync(APPID, CID).then(function (err, res) {
        console.log(res);
    })
    // 使用callback
    gt.getUserTags(APPID, CID, function (err, res) {
        console.log(res);
    })
```
# 快速开始
```shell
    npm install getui-node-sdk
```
```javascript
    'use strict';
    const {
        // basic
        GeTui,
        Target,
        // template
        APNTemplate,
        BaseTemplate,
        NotyPopLoadTemplate,
        LinkTemplate,
        NotificationTemplate,
        PopupTransmissionTemplate,
        TransmissionTemplate,
        // payload
        APNPayload,
        DictionaryAlertMsg,
        SimpleAlertMsg,
        // message
        SingleMessage,
        AppMessage,
        ListMessage,
    }=require('getui-node-sdk')
```
```javascript

'use strict';
var getuiNodeSdk = require('getui-node-sdk');
var GeTui = getuiNodeSdk.GeTui;
var Target = getuiNodeSdk.Target;
var APNTemplate = getuiNodeSdk.APNTemplate;
var BaseTemplate = getuiNodeSdk.BaseTemplate;
var APNPayload = getuiNodeSdk.APNPayload;
var DictionaryAlertMsg = getuiNodeSdk.DictionaryAlertMsg;
var SimpleAlertMsg = getuiNodeSdk.SimpleAlertMsg;
var NotyPopLoadTemplate = getuiNodeSdk.NotyPopLoadTemplate;
var LinkTemplate = getuiNodeSdk.LinkTemplate;
var NotificationTemplate = getuiNodeSdk.NotificationTemplate;
var PopupTransmissionTemplate = getuiNodeSdk.PopupTransmissionTemplate;
var TransmissionTemplate = getuiNodeSdk.TransmissionTemplate;

var SingleMessage = getuiNodeSdk.SingleMessage;
var AppMessage = getuiNodeSdk.AppMessage;
var ListMessage = getuiNodeSdk.ListMessage;


// http的域名
var HOST = 'http://sdk.open.api.igexin.com/apiex.htm';

//https的域名
// var HOST = 'https://api.getui.com/apiex.htm';

//Android用户测试
var APPID = '';
var APPKEY = '';
var MASTERSECRET = '';
var CID = '';
//IOS用户测试
//var DEVICETOKEN='';
var alias = 'demo';

var gt = new GeTui(HOST, APPKEY, MASTERSECRET);
getUserStatus();
pushMessageToSingle();
// pushMessageToSingleBatch();
// pushMessageToList();
// pushMessageToApp();
// stoptask();
// setClientTag();
// getUserTags()

//别名绑定操作
// aliasBind();
// queryCID();
//queryAlias();
//aliasBatch();
//aliasUnBindAll();
//aliasUnBind();

//结果查询操作
// getPushResult();
// queryAppPushDataByDate();
// queryAppUserDataByDate();


//推送任务停止
function stoptask() {
    gt.stop('OSA-1125_FBLl4mxYjG9eZzVR18edd8', function (err, res) {
        console.log(res);
    });
}
function setClientTag() {
    // gt.setClientTag(APPID, CID, ['aa', '哔哔', '》？》', '！@#￥%……&*（）'], function (err, res) {
    //     console.log(err, res);
    // })
}
function getUserTags() {
    gt.getUserTags(APPID, CID, function (err, res) {
        console.log(res);
    })
}
function getUserStatus() {
    gt.getClientIdStatus(APPID, CID, function (err, res) {
        console.log(res);
    });
}

function pushMessageToSingle() {
    for (var i = 0; i < 10; i++) {
        var template = TransmissionTemplateDemo(i);
        //    var template = LinkTemplateDemo();
        //    var template = NotificationTemplateDemo();
        //    var template = NotyPopLoadTemplateDemo();

        //个推信息体
        var message = new SingleMessage({
            isOffline: true,                        //是否离线
            offlineExpireTime: 3600 * 12 * 1000,    //离线时间
            data: template,                          //设置推送消息类型
            pushNetWorkType: 0                     //是否wifi ，0不限，1wifi
        });

        //接收方
        var target = new Target({
            appId: APPID,
            clientId: CID
        });
        gt.pushMessageToSingle(message, target, function (err, res) {
            console.log(res);
            if (err != null && err.exception != null && err.exception instanceof RequestError) {
                var requestId = err.exception.requestId;
                console.log(err.exception.requestId);
                gt.pushMessageToSingle(message, target, requestId, function (err, res) {
                    console.log(err);
                    console.log(res);
                });
            }
        });
    }

}
function pushMessageToSingleBatch() {
    process.env.gexin_pushSingleBatch_needAsync = true;
    var Batch = gt.getBatch();

    var template = TransmissionTemplateDemo();
    //    var template = LinkTemplateDemo();
    //    var template = NotificationTemplateDemo();
    //    var template = NotyPopLoadTemplateDemo();

    //个推信息体
    var message = new SingleMessage({
        isOffline: true,                        //是否离线
        offlineExpireTime: 3600 * 12 * 1000,    //离线时间
        data: template                          //设置推送消息类型
    });

    //接收方
    var target = new Target({
        appId: APPID,
        clientId: CID
        //        alias:'_lalala_'
    });
    Batch.add(message, target);

    Batch.submit(function (err, res) {
        if (err != null) {
            Batch.retry(function (err, res) {
                console.log("demo batch retry", res);
            });
        }
        console.log("demo batch submit", res);
    });


}

function pushMessageToList() {
    //process.env.gexin_pushList_needDetails = true;
    //process.env.gexin_pushList_needAsync=true;
    //process.env.=true;
    // var taskGroupName = 'test';
    var taskGroupName = "toList任务组名";
    var template = TransmissionTemplateDemo();

    //个推信息体
    var message = new ListMessage({
        isOffline: true,
        offlineExpireTime: 3600 * 12 * 1000,
        data: template
    });

    gt.getContentId(message, taskGroupName, function (err, res) {
        var contentId = res;
        //接收方1
        var target1 = new Target({
            appId: APPID,
            clientId: CID
            //            alias:'_lalala_'
        });

        var targetList = [target1];
        //        gt.needDetails = true;

        console.log("getContentId", res);
        gt.pushMessageToList(contentId, targetList, function (err, res) {
            console.log(res);
        });
    });
}

function pushMessageToApp() {
    // var taskGroupName = 'test';
    var taskGroupName = null;
    var template = TransmissionTemplateDemo();

    //个推信息体
    //基于应用消息体
    var message = new AppMessage({
        isOffline: false,
        offlineExpireTime: 3600 * 12 * 1000,
        data: template,
        appIdList: [APPID],
        //        phoneTypeList: ['IOS'],
        //        provinceList: ['浙江'],
        //tagList: ['阿百川']
        speed: 10000
    });

    gt.pushMessageToApp(message, taskGroupName, function (err, res) {
        console.log(res);
    });
}

//消息模版：
// 1.TransmissionTemplate:透传功能模板
// 2.LinkTemplate:通知打开链接功能模板
// 3.NotificationTemplate：通知透传功能模板
// 4.NotyPopLoadTemplate：通知弹框下载功能模板

function NotyPopLoadTemplateDemo() {
    var template = new NotyPopLoadTemplate({
        appId: APPID,
        appKey: APPKEY,
        notyTitle: '个推',
        notyContent: '个推最新版点击下载',
        notyIcon: 'http://wwww.igetui.com/logo.png',    // 通知栏logo
        isRing: true,
        isVibrate: true,
        isClearable: true,
        popTitle: '弹框标题',
        setPopContent: '弹框内容',
        popImage: '',
        popButton1: '下载',                             // 左键
        popButton2: '取消',                             // 右键
        loadIcon: 'http://www.photophoto.cn/m23/086/010/0860100017.jpg', // 弹框图片
        loadUrl: 'http://dizhensubao.igexin.com/dl/com.ceic.apk',
        loadTitle: '地震速报下载',
        autoInstall: false,
        actived: true
    });
    return template;
}

function LinkTemplateDemo() {
    var template = new LinkTemplate({
        appId: APPID,
        appKey: APPKEY,
        title: '个推',
        text: '个推最新版点击下载',
        logo: 'http://wwww.igetui.com/logo.png',
        logoUrl: 'https://www.baidu.com/img/bdlogo.png',
        isRing: true,
        isVibrate: true,
        isClearable: true,
        url: 'http://www.igetui.com'
    });

    return template;
}

function NotificationTemplateDemo() {
    var template = new NotificationTemplate({
        appId: APPID,
        appKey: APPKEY,
        title: '个推',
        text: '个推最新版点击下载',
        // logo: 'http://www.igetui.com/logo.png',
        isRing: true,
        isVibrate: true,
        isClearable: true,
        transmissionType: 1,
        transmissionContent: JSON.stringify({
            "action": "detail",
            "type": "message",
            "subType": "attendance",
            "id": "",
            "url": "",
            "title": "考勤通知",
            "content": "您的孩子在7点50分到校",
            "date": "2017-08-25",
            "time": "07:50:21"
        })
    });
    return template;
}

function TransmissionTemplateDemo(i) {
    var template = new TransmissionTemplate({
        appId: APPID,
        appKey: APPKEY,
        transmissionType: 2,
        transmissionContent: JSON.stringify({
            "action": "detail",
            "type": "message",
            "subType": "attendance",
            "id": "",
            "url": "",
            "title": "考勤通知" + i,
            "content": "您的孩子在7点50分到校" + i,
            "date": "2017-08-25",
            "time": "07:50:21"
        })
    });
    //iOS推送需要设置的setApnInfo字段
    //    var payload = new APNPayload();
    //    var alertMsg = new DictionaryAlertMsg();
    //    alertMsg.body = "";
    //    alertMsg.actionLocKey = "";
    //    alertMsg.locKey = "";
    //    alertMsg.locArgs = Array("");
    //    alertMsg.launchImage = "";
    //    //ios8.2以上版本支持
    //    alertMsg.title = "";
    //    alertMsg.titleLocKey = "";
    //    alertMsg.titleLocArgs = Array("");
    //
    ////    payload.alertMsg=alertMsg;
    //    payload.badge=5;
    ////    payload.contentAvailable =1;
    ////    payload.category="";
    ////    payload.sound="";
    ////    payload.customMsg.payload1="payload";
    //    template.setApnInfo(payload);
    //    template.setDuration("2015-01-16 11:40:00", "2015-01-16 12:24:00");
    return template;
}

function aliasBind() {
    gt.bindAlias(APPID, alias, CID, function (err, res) {
        console.log(res);
    });
}

function aliasBatch() {
    //    var target = new Target()
    //        .setClientId(CID)
    //        .setAlias('_lalala_');
    var target2 = new Target({
        alias: alias,
        clientId: CID
    });
    var targetList = [target2];
    gt.bindAlias(APPID, targetList, function (err, res) {
        console.log(res);
    });
}

function queryCID() {
    gt.queryClientId(APPID, alias, function (err, res) {
        console.log(res);
    });
}

function queryAlias() {
    gt.queryAlias(APPID, CID, function (err, res) {
        console.log(res);
    });
}

function aliasUnBind() {
    gt.unBindAlias(APPID, alias, CID, function (err, res) {
        console.log(res);
    });
}

function aliasUnBindAll() {
    gt.unBindAlias(APPID, alias, function (err, res) {
        console.log(res);
    });
}

function queryAppPushDataByDate() {
    gt.queryAppPushDataByDate(APPID, "20150910", function (err, res) {
        console.log(res);
    });
}

function queryAppUserDataByDate() {
    gt.queryAppUserDataByDate(APPID, "20150910", function (err, res) {
        console.log(res);
    });
}

function getPushResult() {
    gt.getPushResult("OSA-1125_FBLl4mxYjG9eZzVR18edd8", function (err, res) {
        console.log(res);
    });
}

```