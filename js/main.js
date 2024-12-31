// Animasi Sertifikat dan Modal Zoom
(function($) {
  "use strict";
  function a() {
    var a = $(".portfolio-grid");
    if (a) {
      a.isotope({ layoutMode: "masonry", itemSelector: "figure" });
      var t = $(".portfolio-filters"),
        o = t.find("a.filter");
      o.click(function() {
        var t = $(this);
        if (t.parent().hasClass("active")) return !1;
        o.parent().removeClass("active"), $(this).parent().addClass("active");
        var i = $(this).attr("data-filter");
        return a.isotope({ filter: i }), !1;
      });
    }
  }
  function t() {
    var a = $(window).width(),
      t = $("#site_header");
    1025 > a
      ? (t.addClass("mobile-menu-hide"),
        $(".menu-toggle").removeClass("open"),
        setTimeout(function() {
          t.addClass("animate");
        }, 500))
      : t.removeClass("animate");
  }
  $(function() {
    $("#contact_form").validator(),
      $("#contact_form").on("submit", function(a) {
        if (!a.isDefaultPrevented()) {
          var t = "contact_form/contact_form.php";
          return (
            $.ajax({
              type: "POST",
              url: t,
              data: $(this).serialize(),
              success: function(a) {
                var t = "alert-" + a.type,
                  o = a.message,
                  i =
                    '<div class="alert ' +
                    t +
                    ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    o +
                    "</div>";
                t && o && ($("#contact_form").find(".messages").html(i), $("#contact_form")[0].reset());
              },
            }),
            !1
          );
        }
      });
  }),
    $(window)
      .on("load", function() {
        $(".preloader").fadeOut(800, "linear");
        var a = $(".animated-sections");
        a[0] && PageTransitions.init({ menu: "ul.main-menu" });
      })
      .on("resize", function() {
        t();
      }),
    $(document).ready(function() {
      var o = 20,
        i = o / $(document).height(),
        n = o / $(document).width();
      $("body").on("mousemove", function(a) {
        var t = a.pageX - $(document).width() / 2,
          o = a.pageY - $(document).height() / 2,
          s = n * t * -1,
          m = i * o * -1,
          c = $(".lm-animated-bg");
        c.addClass("transition"),
          c.css({
            "background-position": "calc( 50% + " + s + "px ) calc( 50% + " + m + "px )",
          }),
          setTimeout(function() {
            c.removeClass("transition");
          }, 300);
      }),
        $(".menu-toggle").on("click", function() {
          $("#site_header").addClass("animate"),
            $("#site_header").toggleClass("mobile-menu-hide"),
            $(".menu-toggle").toggleClass("open");
        }),
        $(".main-menu").on("click", "a", function(e) {
          t();
        }),
        $(".sidebar-toggle").on("click", function() {
          $("#blog-sidebar").toggleClass("open");
        });
      var s = $(".portfolio-grid");
      s.imagesLoaded(function() {
        a(this);
      });
      var m = $(".blog-masonry");
      if (
        (m.imagesLoaded(function() {
          m.isotope({ layoutMode: "masonry", itemSelector: ".item" });
          var a = $(".blog-filters"),
            t = a.find("a.filter");
          t.click(function() {
            var a = $(this);
            if (a.parent().hasClass("active")) return !1;
            t.parent().removeClass("active"),
              $(this).parent().addClass("active");
            var o = $(this).attr("data-filter");
            return m.isotope({ filter: o }), !1;
          });
        }),
        $(".text-rotation").owlCarousel({
          loop: !0,
          dots: !1,
          nav: !1,
          margin: 0,
          items: 1,
          autoplay: !0,
          autoplayHoverPause: !1,
          autoplayTimeout: 3800,
          animateOut: "animated-section-scaleDown",
          animateIn: "animated-section-scaleUp",
        }),
        $(".testimonials.owl-carousel").owlCarousel({
          nav: !0,
          items: 3,
          loop: !1,
          navText: !1,
          autoHeight: !0,
          margin: 25,
          responsive: {
            0: { items: 1 },
            480: { items: 1 },
            768: { items: 2 },
            1200: { items: 2 },
          },
        }),
        $(".clients.owl-carousel")
          .imagesLoaded()
          .owlCarousel({
            nav: !0,
            items: 2,
            loop: !1,
            navText: !1,
            margin: 10,
            autoHeight: !0,
            responsive: {
              0: { items: 2 },
              768: { items: 4 },
              1200: { items: 5 },
            },
          }),
        $(".form-control")
          .val("")
          .on("focusin", function() {
            $(this).parent(".form-group").addClass("form-group-focus");
          })
          .on("focusout", function() {
            0 === $(this).val().length &&
              $(this).parent(".form-group").removeClass("form-group-focus");
          }),
        $("body").magnificPopup({
          delegate: "a.lightbox",
          type: "image",
          removalDelay: 300,
          mainClass: "mfp-fade",
          image: { titleSrc: "title", gallery: { enabled: !0 } },
          iframe: {
            markup:
              '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe><div class="mfp-title mfp-bottom-iframe-title"></div></div>',
            patterns: {
              youtube: {
                index: "youtube.com/",
                id: null,
                src: "%id%?autoplay=1",
              },
              vimeo: {
                index: "vimeo.com/",
                id: "/",
                src: "//player.vimeo.com/video/%id%?autoplay=1",
              },
              gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
            },
            srcAction: "iframe_src",
          },
          callbacks: {
            markupParse: function(a, t, o) {
              t.title = o.el.attr("title");
            },
          },
        }),
        $(".lmpixels-map")[0])
      ) {
        var c = "San Francisco, S601 Townsend Street, California, USA",
          c = encodeURIComponent(c),
          r =
            "https://maps.google.com/maps?q=" +
            c +
            "&amp;t=m&amp;z=16&amp;output=embed&amp;iwloc=near&output=embed";
        $(".lmpixels-map iframe").attr("src", r);
      }
      $(".messages").on("click", ".close", function() {
        $(this).parent().remove();
      });
    });
})(jQuery);

// Modal Certificate Zoom Functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "flex"; // Menggunakan "flex" agar modal berada di tengah layar
  const img = modal.querySelector('.modal-content');
  const captionText = modal.querySelector(`#caption${modalId.slice(-1)}`);
  img.src = document.querySelector(`[onclick="openModal('${modalId}')"] img`).src;
  
  // Ambil deskripsi dari elemen yang di-klik
  const clickedElement = document.querySelector(`[onclick="openModal('${modalId}')"]`);
  const certiTitle = clickedElement.querySelector('.certi-title h4').innerText;
  const certiId = clickedElement.querySelector('.certi-id span').innerText;
  
  // Atur caption text sesuai deskripsi yang diberikan
  captionText.innerHTML = `${certiTitle} - ${certiId}`;
  
  // Pastikan modal muncul tanpa perlu scroll
  modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}
