$(function () {
    window.bridge.loginUid();
    window.bridge.loginNum();
    // javaCallUid('60b3a0857d28482c8b0b56cd4f85ee73');
    // javaCallJs('2336213');
});

function javaCallUid(uid) {
    $('#uid').val(uid);

}

function javaCallJs(loginName) {
    $('#login_name').val(loginName);
    if (loginName != null && loginName != '') {
        // var url = "http://localhost:9090/activity/bigR/isApply";
        var url = "http://api.mokucloud.com/activity/bigR/isApply";
        $.ajax({
            type: 'post',
            data: {
                loginName: loginName
            },
            dataType: 'json',
            url: url,
            success: function (result) {
                if (typeof result != 'undefined' && result != null && result != '') {
                    if (typeof result.uid != 'undefined' && result.uid != null && result.uid != '' && result.uid != 'null') {
                        $('#div1').hide();
                        $('#div2').show();
                        masterInfo(result.uid)
                    } else {
                        $('#div1').show();
                        $('#div2').hide();
                    }
                }
            }
        });
    }
}

function masterInfo(uid) {
    // var url = "http://localhost:9090/activity/bigR/estimate";
    var url = "http://api.mokucloud.com/activity/bigR/estimate";
    $.ajax({
        type: 'post',
        data: {
            uid: uid
        },
        dataType: 'json',
        url: url,
        success: function (result) {
            if (typeof result != 'undefined' && result != null && result != '') {
                if (typeof result.slaveNum != 'undefined' && result.slaveNum != null && result.slaveNum != '' && result.slaveNum != 'null') {
                    $('#slaveNum').text(result.slaveNum);
                    $('#bonus').text(result.bonus);
                } else {
                    $('#slaveNum').text(0);
                    $('#bonus').text(0);
                }
                /*if (typeof result.black != 'undefined' &&  result.black == '1') {
                    $('#black').html('<div style="font-size: 0.495rem">系统判定有刷徒行为，如有疑问联系qq:3007460275</div>');
                }*/
            }
        }
    })
}

function apply() {
    /*var rule = document.getElementById('dialog');
    rule.showModal();*/
    //todo 这个是活动截止日期的时间戳，注意要改
    var time = 1574006400000;
    if (new Date().getTime() > time) {
        $('#dialog2')[0].showModal();
        var t = setTimeout(function () {
            $('#dialog2')[0].close();
            clearTimeout(t);
        }, 2500)
    } else {
        $('#dialog')[0].showModal();
    }
}

function confirm() {

    var uid = $('#uid').val();
    var loginName = $('#login_name').val();
    var qq = $.trim($('#qq').val());
    var wechat = $.trim($('#wechat').val());
    // var url = "http://localhost:9090/activity/bigR/apply";
    var url = "http://api.mokucloud.com/activity/bigR/apply";
    if (qq != '' || wechat != '') {
        $.ajax({
            type: 'post',
            data: {
                loginName: loginName,
                uid: uid,
                qq: qq,
                wechat: wechat
            },
            dataType: 'json',
            url: url,
            success: function (result) {
                if (typeof result != 'undefined' && result != null && result != '') {

                    if (result.ret == 1) {
                        $('#dialog')[0].close();
                        $('#div1').hide();
                        $('#div2').show();
                        var uid = $('#uid').val();
                        masterInfo(uid);
                    }else if (result.ret == 2) {
                        $('#dialog')[0].close();
                        $('#dialog2')[0].showModal();
                        var t = setTimeout(function () {
                            $('#dialog2')[0].close();
                            clearTimeout(t);
                        }, 2500)
                    }
                }
            }
        });
    }

}

function cancelApply() {
    $('#dialog')[0].close();
}

function cancelTips() {
    $('#dialog2')[0].close();
}


function toRecord() {

    var uid = $('#uid').val();
    if (uid != null && uid != '' && typeof uid != 'undefined') {
        window.location.href = "inviteRecord.html?uid=" + uid;
    }
}