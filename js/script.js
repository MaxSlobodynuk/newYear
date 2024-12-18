$(document).ready(function () {
  new WOW().init();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 1100) {
      $(".book-lesson").fadeIn(); // Показати елемент
    } else {
      $(".book-lesson").fadeOut(); // Сховати елемент
    }
  });

  $(".step-item").click(function () {
    $(this).closest(".steps__items").find(".step-item").removeClass("active");
    $(this).addClass("active");
  });

  $(".open-popup").click(function (e) {
    e.preventDefault();
    $(".popup-wrapper").fadeIn("fast");
    $(".popup-wrapper").css("display", "flex");
  });
  $(".close-popup").click(function () {
    $(".popup-wrapper").fadeOut("fast");
  });

  $(".input-name").on("input", function () {
    if ($(this).val().trim().length < 2) {
      $(this).removeClass("border-green");
      $(this).addClass("border-red");
    } else {
      $(this).addClass("border-green");
      $(this).removeClass("border-red");
    }
  });

  $(".input-email").on("input", function () {
    const emailValue = $(this).val().trim(); // Отримуємо значення поля
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярний вираз для перевірки email

    if (emailValue.length >= 2 && emailRegex.test(emailValue)) {
      $(this).addClass("border-green"); // Додаємо клас, якщо email валідний
      $(this).removeClass("border-red");
    } else {
      $(this).removeClass("border-green"); // Видаляємо клас, якщо формат неправильний
      $(this).addClass("border-red");
    }
  });

  $(".input-phone").on("input", function () {
    // Очищення значення: дозволяємо тільки "+", цифри, коми та крапки
    this.value = this.value.replace(/[^\+\d\.,]/g, "");

    // Перевірка кількості символів "+"
    const plusMatches = this.value.match(/\+/g);
    if (plusMatches && plusMatches.length > 1) {
      // Якщо більше одного "+"
      this.value = this.value.substr(0, this.value.lastIndexOf("+")); // Видаляємо зайві "+"
    }

    // Перевірка довжини
    if ($(this).val().trim().length < 9) {
      $(this).removeClass("border-green"); // Якщо менше 9 символів, видаляємо клас
      $(this).addClass("border-red"); // Якщо менше 9 символів, видаляємо клас
    } else {
      $(this).removeClass("border-red"); // Якщо 9 або більше символів, додаємо клас
      $(this).addClass("border-green"); // Якщо 9 або більше символів, додаємо клас
    }
  });

  $(".send-form").on("submit", function (event) {
    $(".logading-box").addClass("logading-box__active");
    //        const hiddenFieldValue = $('.filte-class').val();
    //
    //        if (!hiddenFieldValue) {
    //            event.preventDefault();
    //            $('.logading-box').removeClass('logading-box__active')
    //            $('.filte-class-name').addClass('border-red');
    //            $('.filte-class-name').removeClass('border-green');
    //
    //            $('html, body').animate({
    //            scrollTop: $('.send-form').offset().top
    //        }, 500);
    //        } else {
    //            $('.filte-class-name').addClass('border-green');
    //            $('.filte-class-name').removeClass('border-red');
    //        }
    //
    //
    //
    //        const hiddenLevel = $('.filte-level').val();
    //
    //        if (!hiddenLevel) {
    //            event.preventDefault();
    //            $('.logading-box').removeClass('logading-box__active')
    //            $('.filte-level-name').addClass('border-red');
    //            $('.filte-level-name').removeClass('border-green');
    //
    //            $('html, body').animate({
    //            scrollTop: $('.send-form').offset().top
    //        }, 500);
    //        } else {
    //            $('.filte-level-name').addClass('border-green');
    //            $('.filte-level-name').removeClass('border-red');
    //        }
  });

  const swiper2 = new Swiper(".reviews-slider", {
    loop: true,
    autoHeight: true,

    // Responsive breakpoints
    breakpoints: {
      320: {
        // для телефонів
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        // для планшетів
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        // для десктопів
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },

    // Автопрокрутка
    autoplay: {
      delay: 3000, // кожні 3 секунди
      disableOnInteraction: false, // автопрокрутка не зупиняється при взаємодії
    },

    // Навігаційні стрілки
    navigation: {
      nextEl: ".button-next",
      prevEl: ".button-prev",
    },
  });

  const swiper = new Swiper(".features__items", {
    loop: true,
    autoHeight: true,

    // Responsive breakpoints
    breakpoints: {
      320: {
        // для телефонів
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        // для планшетів
        slidesPerView: 3,
        spaceBetween: 30,
      },
      992: {
        // для планшетів
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        // для десктопів
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },

    // Автопрокрутка
    //        autoplay: {
    //            delay: 3000, // кожні 3 секунди
    //            disableOnInteraction: false, // автопрокрутка не зупиняється при взаємодії
    //        },

    // Навігаційні стрілки
    navigation: {
      nextEl: ".button-next-features",
      prevEl: ".button-prev-features",
    },
  });
});
