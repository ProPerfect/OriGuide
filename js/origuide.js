var origuide = {
    'set':{
        'data':'',
        'curGroup':'',
        'aniOver':true,
        'colorList':['#519D9E','#CE6D39','#30A9DE','#566270','#F68657','#285943',
                     '#9055A2','#754F44','#548687','#E71D36','#791E94','#3F4B3B',
                     '#8F2D56','#881600','#4F86C6','#379392','#6C49B8','#D81159'],
        'effect':'fadeIn'
    },
    init:function () {
        var me = this;
        me.getData();
    },
    getData:function () {
        var me = this;
        me.set.data = window.data;
        me.renderMenu();
    },
    renderMenu:function () {
        var me = this;
        var menu = me.set.data.menu;
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].sc != "Spe") {
                var tempHtml =  '<li class="og-menu-item trans clear ' + ((i==0)?' on':'') + '" js-m="'+ menu[i].sc +'">'
                                + '    <i class="icon fl '+ menu[i].icon +'"></i>'
                                + '    <span class="fl">'+ menu[i].name +'<i class="st">（'+ menu[i].sc +'）</i></span>'
                                + '</li>';
                $('.og-menu-box').append(tempHtml);
            }else {
                $('.og-menu-box').append('<hr/>');
            }
        }
        me.set.curGroup = menu[0].sc;
        me.renderLink();
        me.changeMenu();
        me.checkTitle();
        me.checkKey();
        me.checkSearch();

    },
    renderLink:function () {
        var me = this;
        if (!me.CheckData(me.set.curGroup,'list')) { return false; }
        var list = me.CheckData(me.set.curGroup,'list').cont;
        var group = me.CheckData(me.set.curGroup,'menu');
        var tempHtml = '';
        me.set.aniOver = false;
        switch (group.type) {
            case 0:
                for (var i = 0; i < list.length; i++) {
                    if(list[i].key != ""){
                        var curColor = me.randomColor();
                        $('.og-bd-ct').append('<div class="ct-title" style="border-left: 6px solid '+ curColor +';">'+ group.name +' ▪ '+ list[i].key +'</div>');
                        $('.og-title-list').append('<li class="item fl trans"><a href="javascript:void(0);"  style="border: 1px solid '+ curColor +';color: '+ curColor +';">'+ list[i].key +'</a></li>');
                    }
                    tempHtml = '';
                    for (var j = 0; j < list[i].item.length; j++) {
                        tempHtml +='<a href="'+ list[i].item[j].link +'" class="web fl trans" target="_blank">'
                                    +'<img src="'+ list[i].item[j].img +'" alt="">'
                                    +'<div class="web-desc trans etc">'+ list[i].item[j].desc +'</div>'
                                    +'<div class="web-title trans etc">'+ list[i].item[j].title +'</div>'
                                 +' </a>';
                    }
                    $('.og-bd-ct').append($('<div class="ct-box clear"></div>').append(tempHtml));
                }
                $('.og-bd-ct').addClass(me.set.effect + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass(me.set.effect + ' animated');
                    me.set.aniOver = true;
                });
                break;
            case 1:
                tempHtml = '';
                for (var i = 0; i < list.length; i++) {
                    tempHtml +='<a href="'+ list[i].link +'" class="web-t fl" target="_blank" title="'+ list[i].desc +'" style="border-left: 6px solid '+ me.randomColor() +';">'+ list[i].title +'</a>';
                }
                $('.og-bd-ct').append($('<div class="ct-box clear"></div>').append(tempHtml));
                $('.og-bd-ct').addClass(me.set.effect + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass(me.set.effect + ' animated');
                    me.set.aniOver = true;
                });
                break;
            default:
        }
        me.resizeBox();
    },
    CheckData:function (c,type) {
        var me = this;
        switch (type) {
            case 'menu':
                for (var i = 0; i < me.set.data.menu.length; i++) {
                    if (me.set.data.menu[i].sc == c) { return me.set.data.menu[i]; }
                }
                break;
            case 'list':
                for (var i = 0; i < me.set.data.list.length; i++) {
                    if (me.set.data.list[i].group == c) { return me.set.data.list[i]; }
                }
                break;
            default:
        }
    },
    changeMenu:function () {
        var me = this;
        $('.og-menu-item').bind('click',function () {
            if (!me.set.aniOver) { return false;}
            $(this).addClass('on').siblings().removeClass('on');
            if ($(this).attr('js-m') != 'A') {
                $(".og-bd-ct").children().remove();
                $('.og-title-list').children().remove();
                me.set.curGroup = $(this).attr('js-m');
                $('.og-about').hide();
                $(".og-bd-ct").show();
                me.renderLink();
            }else {
                me.set.aniOver = false;
                $(".og-bd-ct").hide();
                $('.og-about').show().addClass(me.set.effect + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass(me.set.effect + ' animated');
                    me.set.aniOver = true;
                });
            }
        });
    },
    randomColor:function () {
        var me = this;
        var colorIndex = Math.ceil(Math.random() * me.set.colorList.length);
        return me.set.colorList[colorIndex];
    },
    checkTitle:function () {
        var me = this;
        var $scrollBox = $('.og-bd-ct');
        var moveTop = 0;
        $(document).delegate('.og-title-list a','click',function () {
            var $curTitle = $('.og-bd-ct .ct-title').eq($(this).parent().index());
            moveTop = $curTitle.offset().top - $('.og-bd-ct').offset().top + $('.og-bd-ct').scrollTop();
            $scrollBox.animate({'scrollTop': moveTop},300);
        })
    },
    resizeBox:function () {
        var boxNum,boxWith,boxHeight;
        boxNum = Math.floor($('.ct-box').width() / 220 );
        boxWith = $('.ct-box').width() / boxNum - 20;
        boxHeight = boxWith * 120 / 200 + 40;
        $('.web').css({
            'width':boxWith,
            'height':boxHeight
        });
        $(window).resize(function () {
            boxNum = Math.floor($('.ct-box').width() / 220 );
            boxWith = $('.ct-box').width() / boxNum - 20;
            boxHeight = boxWith * 120 / 200 + 40;
            $('.web').css({
                'width':boxWith,
                'height':boxHeight
            });
        });
    },
    checkKey:function () {
        var me = this;
        var shortCut = '';
        $(document).bind('keydown',function (e) {
            if (document.activeElement.id=="bd_search") {
                if (e.keyCode == 13) {
                    $('.search-btn').trigger('click');
                }
            }else{
                e.preventDefault();
                if (e.shiftKey) {
                    shortCut = String.fromCharCode(e.keyCode);
                    $('.og-menu-item[js-m='+ shortCut +']').trigger('click');
                    return false;
                }else{
                    shortCut = String.fromCharCode(e.keyCode);
                    if (!isNaN(parseInt(shortCut))) {
                        $('.og-title-list a').eq(parseInt(shortCut)-1).trigger('click');
                    }
                    if (e.keyCode == 13) {
                        $('#bd_search').focus();
                    }
                }
            }
        });
    },
    checkSearch:function () {
        var me = this;
        var curColor = '';
        $('#bd_search').bind('focus',function () {
            curColor = me.randomColor();
            $('.search-btn').css({'background-color':curColor});
            $('#bd_search').css({'border':'1px solid ' + curColor});
        });
        $('#bd_search').bind('blur',function () {
            $('.search-btn').css({'background-color':'#ccc'});
            $('#bd_search').css({'border':'1px solid #ccc'});
            $('#bd_search').val('');
        });
        $('.search-btn').bind('click',function () {
            window.open('https://www.baidu.com/s?wd='+ $('#bd_search').val());
        });
    }
};
origuide.init();
