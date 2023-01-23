$(document).ready(function () {
    scrollMethod();

    $(document).scroll(() => {
        scrollMethod();
    });

    $(".menu-toggle").click(function (event) {
        $(".nav-links").addClass("show-nav-links");
    });

    $(".close-toggle").click(function (event) {
        $(".nav-links").removeClass("show-nav-links");
    });
});

function scrollMethod() {
    $(document).scrollTop() > $("#header").innerHeight()
        ? $("#header").addClass("fixedHeader") &&
          $("main").addClass("fixedMain")
        : $("#header").removeClass("fixedHeader") &&
          $("main").removeClass("fixedMain");
}
