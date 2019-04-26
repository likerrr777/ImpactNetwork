$(document).ready(function () {
    $('.close').click(function () {
        alert();
        $('.alert').css('display', 'none');
    });

    $('[data-toggle=tab]').click(function (e) {
        setTimeout(function () {
            $('#investmentContainer svg').attr('height', '275');
            $('#socialReturnContainer svg').attr('height', '275');
        }, 1000);
        e.preventDefault();
        e.preventDefault();
    });

    setTimeout(function () {
        var t = 0;
        $('.csstransforms .opened-nav li').each(function () {

            $(this).css('transform', 'rotate(' + t + 'deg) skew(72deg)');
            t = t + 21.2;
        });
    }, 1000);

    $('[data-toggle="popover"]').popover();

    $("body").on("click", "[data-toggle='tab']", function (event) {
        event.preventDefault();
    });

    setTimeout(function () {
        $(".ins_c").click(function () {
            $('html,body').animate({
                    scrollTop: $("#comment_sec").offset().top
                },
                'slow');
        });
    }, 3000);
});