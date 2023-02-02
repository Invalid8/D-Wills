$(document).ready(function () {
    $(document).scroll(() => {
        $(document).scrollTop() > $(".banner-section").offset().top
            ? $(".bottom .moreUsers").css("display", "block") &&
              $("#header").removeClass("bbCard") &&
              $("#header").addClass("pwCard")
            : $(".bottom .moreUsers").css("display", "none") &&
              $("#header").addClass("bbCard") &&
              $("#header").removeClass("pwCard");
    });
    $(".cnt-btn1, .cnt-btn2").click(function (event) {
        event.preventDefault();
        $("html, body").animate(
            {
                scrollTop: $("footer").offset().top,
            },
            800
        );
    });
    $(".next-section").on("click", function (event) {
        $("html, body").animate(
            {
                scrollTop: $(".companies-section").offset().top - 90,
            },
            800
        );
    });

    $(".bottom .moreUsers").on("click", function (event) {
        $("html, body").animate(
            {
                scrollTop: $("#Home").offset().top - 90,
            },
            800
        );
    });

    $(".menu-toggle").click(function (event) {
        $(".nav-links").addClass("show-nav-links");
    });

    $(".close-toggle").click(function (event) {
        $(".nav-links").removeClass("show-nav-links");
    });
});
