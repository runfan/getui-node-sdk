'use strict';
var AlertMsg = require('./AlertMsg');

class SimpleAlertMsg{
    getAlertMsg(){
        return (this.alertMsg == null || this.alertMsg.length == 0) ? null : this.alertMsg;
    }
}

module.exports = SimpleAlertMsg;