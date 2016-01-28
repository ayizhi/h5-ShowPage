/**
 * Created by Administrator on 2016/1/25 0025.
 */
$(function(){
    var typeName = document.body.className;
    var card = [
        "<div class = 'card @(location)' psrc = '@(psrc)'>",
        "<div class = 'cardName' psrc = '@(cardName)'></div>",
        "<div class = textBg>",
        "<div class = 'textContent'>",
        "<div>",
        "<span>商户名称：@(name)</span>",
        "</div>",
        "<div>",
        "<span>商户介绍：</span>",
        "<span>@(intro)</span>",
        "</div>",
        "<div>",
        "<span>尊享礼遇：</span>",
        "<span>@(privilege)</span>",
        "</div>",
        "<div>",
        "<span>适用卡别：</span>",
        "<span>@(types)</span>",
        "</div>",
        "</div>",
        "</div>",
        "</div>"
    ].join("")

    $.ajax({
        url:'../ajaxData/' + typeName + '.json',
        type:'get',
        data:null,
        success:function(reply){
            for(var i= 0,len=reply.length;i<len;i++){
                var cardName = reply[i]['nameImage'];
                var bgImage = reply[i]['bgImage'];
                var introInfo = reply[i]['info'];
                if(i==0){
                    var location = 'middle';
                }else if(i == len - 1){
                    var location = 'bottom';
                }else{
                    var location = 'top';
                }
                var data = {
                    'psrc':bgImage,
                    'location':location,
                    'name':introInfo['name'],
                    'intro':introInfo['intro'],
                    'privilege':introInfo['privilege'],
                    'types':introInfo['types'],
                    'cardName':cardName,
                }
                var template = formateString(card,data)
                $('.table').append($(template))
            }

            var $cards = $('.table .card')
            for(var i = 0,len = $cards.length;i<len;i++){
                lazyLoadImg($($cards[i]).attr('psrc'),$cards[i])
                $($cards[i]).children('.cardName').css({
                    'background': 'url('+ $($cards[i]).children('.cardName').attr('psrc') + ') no-repeat',
                    'background-size':'100% auto'
                })
            }


            //滑动事件

            var $cards = $('.table .card')
            var startY = 0;
            var middleNum = 0;//第一页
            var topNum = 1;
            var bottomNum = $cards.length - 1;


            //添加滑动事件
            $(document.body).get(0).addEventListener('touchstart',touchStart);
            $(document.body).get(0).addEventListener('touchmove',touchMove);
            $(document.body).get(0).addEventListener('touchend',touchEnd);


            function touchStart(e){
                startY = e.touches[0].pageY;
                console.log(topNum,middleNum,bottomNum)

                for(var i = 0,len = $cards.length;i<len;i++){
                    $($cards[i]).css('transition','none')
                }

                $cards[middleNum].className = 'card middle';
                $cards[topNum].className = 'card top';
                $cards[bottomNum].className = 'card bottom';
            }
            function touchMove(e){
                e.preventDefault()
            };
            function touchEnd(e){
                var dY = e.changedTouches[0].pageY - startY;
                for(var i = 0,len = $cards.length;i<len;i++){
                    $($cards[i]).css('transition','all 0.5s ease 0s')
                }

                if(dY>70){//向下滑，把最后一个放到第一个
                    middleNum = middleNum + 1 > $cards.length - 1 ? 0 : middleNum + 1;
                    topNum = topNum + 1 > $cards.length - 1 ? 0 : topNum + 1;
                    bottomNum = bottomNum + 1 > $cards.length - 1 ? 0 : bottomNum + 1;

                    $cards[middleNum].className = 'card middle';
                    $cards[bottomNum].className = 'card bottom';

                }else if(dY<-70){//向上画，把第一个放到最后一个
                    middleNum = middleNum - 1 < 0 ? $cards.length - 1 : middleNum - 1;
                    topNum = topNum - 1 < 0 ? $cards.length - 1 : topNum - 1;
                    bottomNum = bottomNum - 1 < 0 ? $cards.length - 1 : bottomNum - 1;

                    $cards[middleNum].className = 'card middle';
                    $cards[topNum].className = 'card top';
                }

            };


        },
        error:function(err){}
    })


})