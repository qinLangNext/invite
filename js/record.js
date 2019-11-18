$(function () {
    var uid = getUrlParamValue('uid');
    if (uid != null) {
        // var url = "http://localhost:9090/activity/bigR/record";
        var url = "http://api.mokucloud.com/activity/bigR/record";
        $.ajax({
            type: 'post',
            data: {
                uid: uid
            },
            dataType: 'json',
            url: url,
            success: function (result) {
                if (typeof result != 'undefined' && result != null && result != '') {
                    if (typeof result.userInfos != 'undefined' && result.userInfos != null && result.userInfos != '' && result.userInfos != 'null') {
                        var records = [], i = 1, valid_img, valid_tips, w1_img, w1_tips, w2_img, w2_tips, hp_img,
                            hp_tips;
                        $.each(result.userInfos, function (index, value) {
                            var w1_flag = 0, w2_flag = 0, valid_flag = 0, hp_flag = 0;
                            if (value.withdraw1 > 0) {
                                w1_img = 'img/hook.png';
                                w1_tips = '<font color="#989898">已完成</font>';
                                w1_flag = 1;
                            } else {
                                w1_img = 'img/circle.png';
                                w1_tips = '<font color="#4f4d4d">进行中</font>';
                                w1_flag = 0;
                            }

                            if (value.withdraw2 > 0) {
                                w2_img = 'img/hook.png';
                                w2_tips = '<font color="#989898">已完成</font>';
                                w2_flag = 1;
                            } else {
                                w2_img = 'img/circle.png';
                                w2_tips = '<font color="#4f4d4d">进行中</font>';
                                w2_flag = 0;
                            }

                            if (value.hpNum > 0) {
                                hp_img = 'img/hook.png';
                                hp_tips = '<font color="#989898">已完成</font>';
                                hp_flag = 1;
                            } else {
                                hp_img = 'img/circle.png';
                                hp_tips = '<font color="#4f4d4d">进行中</font>';
                                hp_flag = 0;
                            }

                            if (value.valid > 9) {
                                valid_img = 'img/hook.png';
                                valid_tips = '<font color="#989898">' + value.valid + '/10个</font>';
                                valid_flag = 1;
                            } else {
                                valid_img = 'img/star.png';
                                valid_tips = '<font color="#ff3535">' + value.valid + '</font>/10个';
                                valid_flag = 0;
                            }
                            flag = w1_flag + w2_flag + valid_flag + hp_flag;
                            records.push('<div class="user_item">\n' +
                                '        <div class="user_info" id="' + i + '" onclick="itemHide(this)">\n' +
                                '            <div>邀请码:' + value.loginName + '</div>' +
                                '            <div>' + value.createDate + '</div>\n' +
                                '            <div>任务进度：' + flag + '/4</div>\n' +
                                '            <div><img src="img/arrow_down.png"/></div>\n' +
                                '        </div>\n' +
                                '        <div class="user_task_container" id="table_' + i + '">\n' +
                                '            <div class="user_task">\n' +
                                '                <div class="w1">\n' +
                                '                    <div><img src="' + w1_img + '"/></div>\n' +
                                '                    <div>新手提现</div>\n' +
                                '                    <div>' + w1_tips + '</div>\n' +
                                '                </div>\n' +
                                '                <div class="w2">\n' +
                                '                    <div><img src="' + w2_img + '"/></div>\n' +
                                '                    <div>一元提现</div>\n' +
                                '                    <div>' + w2_tips + '</div>\n' +
                                '                </div>' +
                                '               <div class="w2">\n' +
                                '                    <div><img src="' + hp_img + '"/></div>\n' +
                                '                    <div>每日赚点高价签到红包任务</div>\n' +
                                '                    <div>' + hp_tips + '</div>\n' +
                                '                </div>' +
                                '                   <div class="task_submit">\n' +
                                '                    <div><img src="img/star.png"/></div>\n' +
                                '                    <div>提交高价任务个数</div>\n' +
                                '                    <div>' + value.completed + '个</div>\n' +
                                '                </div>\n' +
                                '                <div class="task_completed">\n' +
                                '                    <div><img src="' + valid_img + '"/></div>\n' +
                                '                    <div>审核通过高价任务个数</div>\n' +
                                '                    <div>' + valid_tips + '</div>\n' +
                                '                </div>\n' +
                                '            </div>\n' +
                                '        </div>\n' +
                                '    </div>');
                            i++;
                        });
                        $('#main').html(records.join(''))
                    } else {
                        $('#main').html('<div class="user_item" style="text-align: center; color: #4f4d4d; font-size: 0.85rem;">\n' +
                            '        <p>您的徒弟尚未做任务哟~</p>\n' +
                            '    </div>')
                    }
                }
            }
        })
    }
});


function itemHide(data) {
    var id = $(data).attr('id');
    if ($("#table_" + id).is(':hidden')) {
        $("#table_" + id).show();
        $('#' + id).children('div:last-child').find('img').attr('src', 'img/arrow_down.png');
    } else {
        $("#table_" + id).hide();
        $('#' + id).children('div:last-child').find('img').attr('src', 'img/arrow_right.png');
    }
}


function getUrlParamValue(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null && r != '') return decodeURIComponent(r[2]);
    return null;
}