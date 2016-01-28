/**
 * Created by Administrator on 2016/1/26 0026.
 */
$(function(){

    var logos = {
            'shopping':'../img/logos/shopping.png',
            'travel':'../img/logos/airline.png',
            'hotel':'../img/logos/hotel.png',
            'airline':'../img/logos/travel.png',
            'eating':'../img/logos/eating.png',
            'education':'../img/logos/education.png',
            'healthy':'../img/logos/healthy.png',
        },
        picTexts = {
            'shopping':'../img/tuwentext/shopping.png',
            'travel':'../img/tuwentext/airline.png',
            'hotel':'../img/tuwentext/hotel.png',
            'airline':'../img/tuwentext/travel.png',
            'eating':'../img/tuwentext/eating.png',
            'education':'../img/tuwentext/education.png',
            'healthy':'../img/tuwentext/healthy.png',
        },
        logoType = document.body.className;


    var mainHtml = [
        "<div class = 'backToOrigin'>",
        "<div class = 'line'></div>",
        "<div class = 'logo'></div>",
        "</div>",
        "<div class = 'introButton'></div>",
        //"<div class = 'introduction'>",
        "<div class = 'picBtn'>",
        "</div>",
        //"<div class = 'content'></div>",
        //"</div>",
        "<div class = 'smartBtn'></div>",
        "<div class = 'next'></div>"
    ].join("");


    $('.mainBox').append($(mainHtml))
    lazyLoadImg(logos[logoType],$('.backToOrigin .logo'));
    $('.mainBox .picBtn').css('background-image','url('+picTexts[logoType]+")")
    var blackBgHtml = [
        "<div class = 'blackBg'>",
        "<div class = 'logoBtns on'>",
        "<ul>",
        "<li class = 'shopping on'></li>",
        "<li class = 'airline on'></li>",
        "<li class = 'hotel on'></li>",
        "<li class = 'travel on'></li>",
        "<li class = 'eating on'></li>",
        "<li class = 'education on'></li>",
        "<li class = 'healthy on'></li>",
        "</ul>",
        "</div>",
        "</div>"
    ].join('');

    //添加事件
    $('.mainBox .smartBtn').click(function(){
        if(!$(this).hasClass('rotateBtn')){
            $(this).addClass('rotateBtn');
            $('.mainBox').append($(blackBgHtml));
            var $logos = $('.logoBtns ul li');
            var $blackBg = $('.mainBox .blackBg');
            var $whiteBg = $('.logoBtns');
            $blackBg.addClass("on");
            var timer = setTimeout(function(){
                $whiteBg.removeClass('on')
                $logos.each(function(){
                    $(this).removeClass('on')
                    $(this).click(function(){
                        if($(this).attr('class') == document.body.className){console.log(111);return}
                        window.location.href = '../html/'+ $(this).attr('class') + '.html'
                    })
                });
                clearTimeout(timer)
            },20)
        }else{
            clearTimeout(timer)
            $(this).removeClass('rotateBtn');
            $('.blackBg').remove();
        }


    });

    $('.mainBox .introButton').click(function(){
        $(this).css('right','-2rem');
        $('.picBtn').css('left',0);
        $('.textBg').css('left',0);
        $('.textContent').css('left',0);


    })
    $('.mainBox .picBtn').click(function(){
        $('.picBtn').css('left','100%');
        $('.textBg').css('left','100%');
        $('.textContent').css('left','100%');

        setTimeout(function(){
            $('.mainBox .introButton').css('right','0');
        },300)
    })

    //拉取事件
    var startY = 0
    var theHeight = $('.backToOrigin .line').height()
    $('.backToOrigin .logo').get(0).addEventListener('touchstart',function(e){
        $('.backToOrigin .line').css('transition','none')
        startY = e.touches[0].pageY;
    })
    $('.backToOrigin').get(0).addEventListener('touchmove',function(e){
        e.preventDefault();
        var dY = event.touches[0].pageY - startY
        dY = dY * 0.4
        $('.backToOrigin .line').css('height',theHeight + dY + 'px')
    })
    $('.backToOrigin').get(0).addEventListener('touchend',function(){
        $('.backToOrigin .line').css('transition','all 0.4s ease 0s')
        $('.backToOrigin .line').css('height',theHeight)
        setTimeout(function(){
            window.location.href = '../index.html'
        },300)
    })





})


function lazyLoadImg(url,container){//加载后根据box设置图片比例
    var img = document.createElement('img');
    var $t
    if(typeof(container) == 'string'){
        $t = $(container)
    }else{
        if(!container.css){
            $t = $(container)
        }else{
            $t = container
        }
    }
    $t.css('background-image','none').data('src',url)
    img.src = url
    $(img).data('psrc',url)
    img.onload = function(){
        if($(this).data('psrc') != $t.data('src')){return}
        $t.css('background-image','url('+this.src+')');
        var paWidth = $t.width()||parseInt($t.css('width'))
        var paHeight = $t.height()||parseInt($t.css('height'))
        $t.data('bgWidth',this.width).data('bgHeight',this.height)
        if(this.width*paHeight>this.height*paWidth){
            $t.css('background-size','auto 100%');
        }else{
            $t.css('background-size','100% auto')
        }
    }
    delete img
}



function formateString(str, data){
    return str.replace(/@\((\w+)\)/g, function(match, key){
        return typeof data[key] === "undefined" ? '' : data[key]});
}
