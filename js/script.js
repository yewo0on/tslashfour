/*  초기 로딩 효과  */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.remove("loading");
    bannerSwiper.autoplay.start(); //자동재생 켜기
  }, 2400); // 사라지기 시작하는 타이밍 조정 (옵션)
});

/*  Initialize Swiper  */
var bannerSwiper = new Swiper(".bannerSwiper", {
  loop: true,
  speed: 1200,
  ease: "ease-in-out",
  autoplay: {
    delay: 2500,
    disableOnInteraction: false, // 상호작용 후 알아서 자동재생됨
  },
  navigation: {
    nextEl: ".banner-next",
    prevEl: ".banner-prev",
  },
  on: {
    init: function () {
      this.autoplay.stop();
    },
  },
});

var categorySwiper = new Swiper(".categorySwiper", {
  slidesPerView: 1.5,
  spaceBetween: 5,
  slidesOffsetAfter: 20,
  breakpoints: {
    640: {
      slidesPerView: 2.5, //브라우저가 640보다 클 때
    },
    1024: {
      slidesPerView: "auto", //브라우저가 1024보다 클 때
    },
  },
});

var nbImgSwiper = new Swiper(".nbImgSwiper", {
  loop: false,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true, // 슬라이드가 겹치면서 부드럽게 전환
  },
  speed: 600, // fade 시간
  navigation: {
    nextEl: ".nbImg-next",
    prevEl: ".nbImg-prev",
  },
});

var newSwiper = new Swiper(".newSwiper", {
  loop: false,
  slidesPerView: 2.1,
  spaceBetween: 5,
  breakpoints: {
    1024: {
      slidesPerView: 2, //브라우저가 1024보다 클 때
      grid: {
        rows: 2,
      },
    },
  },
});
var bestSwiper = new Swiper(".bestSwiper", {
  loop: false,
  slidesPerView: 2.1,
  spaceBetween: 5,
  breakpoints: {
    1024: {
      slidesPerView: 2, //브라우저가 1024보다 클 때
      grid: {
        rows: 2,
      },
    },
  },
});

var tSwiper = new Swiper(".tSwiper", {
  slidesPerView: 1.5,
  spaceBetween: 10,
  navigation: {
    nextEl: ".tSwiper-next",
    prevEl: ".tSwiper-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2.1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3.1,
      spaceBetween: 10,
    },
  },
});

/* loading scroll event */
window.addEventListener("scroll", function () {
  body.classList.remove("loading");
});

/*  Popup Close Event  */
const popUp = document.querySelector("#popup");
const closeBtn = document.querySelector(".popup_btn .close_btn");
const dayCloseBtn = document.querySelector(".popup_btn .dayClose_btn");

// "close_btn" 버튼 클릭 시 팝업 닫기
closeBtn.addEventListener("click", () => {
  popUp.style.display = "none";
});

// "dayClose_btn" 버튼 클릭 시 팝업 닫기
dayCloseBtn.addEventListener("click", closePopup);

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function showPopup() {
  let popup = document.querySelector("#popup");
  let popupCookie = getCookie("hidePopup");

  if (popupCookie === null) {
    popup.style.display = "block"; // 조건 충족 시에만 보임
  }
}

function closePopup() {
  let popup = document.querySelector("#popup"); // 첫 번째 팝업만 선택
  popup.style.display = "none";
  setCookie("hidePopup", "true", 1); // 오늘 하루 동안 숨김 (쿠키 만료시간 1일)
}

// 페이지 로드 시 팝업 표시 함수 호출
showPopup();

/*  Header Menu Event   */
const menuIcon = document.querySelector(".header_wrap .menu_icon");
const body = document.body;
const nav = document.querySelector("#header nav");

// 메뉴 - 아이콘 클릭 이벤트
if (menuIcon) {
  menuIcon.addEventListener("click", function () {
    menuIcon.classList.toggle("on");
    body.classList.toggle("off"); //backdrop
    if (nav) nav.classList.toggle("on");
  });
}

$(document).ready(function () {
  // gnb 메뉴 클릭 이벤트
  const gnbTitles = $(".gnb .more .gnb_tit");
  gnbTitles.click(function (e) {
    e.preventDefault();

    $(gnbTitles).not(this).removeClass("on");
    $(gnbTitles).not(this).siblings(".lnb").stop(true, true).slideUp(400);

    $(this).toggleClass("on"); //클릭된 애만 배경색 회색 + 화살표 위로
    $(this).siblings(".lnb").stop().slideToggle(500); //클릭된 애만 슬라이드 업다운
  });

  // lnb 메뉴 클릭 이벤트
  const lnbTitles = $(".lnb .lnb_tit");
  lnbTitles.click(function (e) {
    e.preventDefault();

    const $parent = $(this).closest(".lnb");
    const $clicked = $(this);
    const $clickedBtn = $(this).closest(".more");
    const $submenu = $clicked.next(".sub"); // 서브메뉴
    const isOpen = $submenu.is(":visible");

    // 다른 서브메뉴 닫기 + 글자 회색처리
    $parent
      .find(".lnb_tit")
      .not($clicked)
      .addClass("off")
      .next(".sub")
      .stop(true, true)
      .slideUp(500);

    if (isOpen) {
      // 서브메뉴가 열려있으면
      $submenu.stop(true, true).slideUp(400, function () {
        // 슬라이드 닫기
        $clickedBtn.removeClass("on");
        if ($(".lnb .sub:visible").length === 0) {
          // 열려있는 서브메뉴가 0개일 때
          $(".lnb .lnb_tit").removeClass("off"); // 글자 모두 검정
        }
      });
    } else {
      // 서브메뉴가 닫혀있으면
      $clicked.removeClass("off"); // 클릭된 애는 검정 글자로
      $submenu.stop(true, true).slideDown(500); // 서브메뉴 열기
      $clickedBtn.addClass("on");
    }
  });
});

/** 메뉴 구현 자바스크립트 버전
 * 
// 메뉴 - gnb 클릭 이벤트
const gnbTitles = document.querySelectorAll(".gnb .more .gnb_tit");

gnbTitles.forEach((gnbTit) => {
  gnbTit.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelectorAll(".gnb .more .gnb_tit").forEach((otherTit) => {
      if (otherTit !== gnbTit) {
        // 자신을 제외한 모든 .gnb_tit에서 "on" 클래스 제거
        otherTit.classList.remove("on");
        // 해당 .gnb_tit의 형제인 .lnb 닫기
        const otherLnb = otherTit.parentElement.querySelector(".lnb");
        if (otherLnb) otherLnb.classList.remove("on");
      }
    });
    gnbTit.classList.toggle("on"); // 클릭된 애만 배경색 회색 + 화살표 위로
    gnbTit.nextElementSibling.classList.toggle("on"); // 클릭된 애만 슬라이드 업다운
  });
});

// 메뉴 - lnb 클릭 이벤트
const lnbTitles = document.querySelectorAll(".lnb .lnb_tit");
lnbTitles.forEach((lnbTit) => {
  lnbTit.addEventListener("click", (e) => {
    e.preventDefault();

    const parentLnb = lnbTit.closest(".lnb");
    const clickedBtn = lnbTit.closest(".more");
    const submenu = lnbTit.parentElement.querySelector(".sub");
    const isOpen = submenu.classList.contains("on");

    parentLnb.querySelectorAll(".lnb_tit").forEach((otherTit) => {
      if (otherTit !== lnbTit) {
        otherTit.classList.add("off"); // 글자 색 회색

        const otherSub = otherTit.parentElement.querySelector(".sub");
        if (otherSub) {
          otherSub.classList.remove("on"); // 다른 sub 메뉴를 모두 닫음
        }

        const otherBtn = otherTit.closest(".more");
        if (otherBtn) {
          otherBtn.classList.remove("on"); // 다른 lnb_tit 배경색 제거
        }
      }
    });

    if (isOpen) {
      // 현재 클릭된 메뉴를 다시 클릭한 경우
      submenu.classList.remove("on"); // 서브 메뉴 닫기
      clickedBtn.classList.remove("on"); // 메뉴 비활성화

      // 모든 서브메뉴 닫혔는지 확인
      const anyVisible = parentLnb.querySelector(".sub.on");
      if (!anyVisible) {
        // 모든 서브메뉴가 닫혀 있으면 모두 검정글자로
        parentLnb
          .querySelectorAll(".lnb_tit")
          .forEach((t) => t.classList.remove("off"));
      }
    } else {
      // 닫혀 있던 메뉴 클릭 시
      submenu.classList.add("on"); // 서브 메뉴 열기
      lnbTit.classList.remove("off"); // 클릭한 제목 검정 글자
      clickedBtn.classList.add("on"); // 버튼 스타일 활성화
    }
  });
});
 */

// 메뉴 - 검색 이벤트
const searchBar = document.querySelector("nav #search_bar");
const searchTrems = document.querySelector("nav .search_terms");
const userService = document.querySelector("nav .user_service");

searchBar.addEventListener("focus", () => {
  searchTrems.classList.add("on");
  userService.classList.add("off");
});
searchBar.addEventListener("blur", () => {
  searchTrems.classList.remove("on");
  userService.classList.remove("off");
});

/*  Category Hover Event   */
// on 클래스 - 크기 커지도록
const c_slide = document.querySelectorAll(".categorySwiper .swiper-slide");
c_slide.forEach((slide) => {
  slide.addEventListener("mouseenter", () => {
    c_slide.forEach((s) => s.classList.remove("on"));
    slide.classList.add("on");
  });
});

// hover 이벤트 - 슬라이드 이동
const firstSlide = categorySwiper.slides[0];
const lastSlideIndex = categorySwiper.slides.length - 1;
const lastSlide = categorySwiper.slides[lastSlideIndex];
firstSlide.addEventListener("mouseenter", function () {
  categorySwiper.slideTo(0); // 첫 번째 슬라이드로 이동
});
lastSlide.addEventListener("mouseenter", function () {
  categorySwiper.slideTo(lastSlideIndex); // 마지막 슬라이드로 이동
});

/*  NewBest Event  */

// 상품 이미지 호버
const nbImgs = document.querySelectorAll(".nb_products .pd_img > img");

nbImgs.forEach((img) => {
  img.addEventListener("mouseover", () => {
    img.src = img.dataset.hover;
  });

  img.addEventListener("mouseout", () => {
    img.src = img.dataset.original;
  });
});
// 슬라이드 연동
const newBtn = document.querySelector("#newBest .new_btn");
const bestBtn = document.querySelector("#newBest .best_btn");
const newProducts = document.querySelector(".newSwiper");
const bestProducts = document.querySelector(".bestSwiper");

newBtn.addEventListener("click", () => {
  toggleActive("new");
});
bestBtn.addEventListener("click", () => {
  toggleActive("best");
});
nbImgSwiper.on("slideChange", () => {
  if (nbImgSwiper.activeIndex === 0) {
    toggleActive("new");
  } else if (nbImgSwiper.activeIndex === 1) {
    toggleActive("best");
  }
});

function toggleActive(type) {
  if (type === "new") {
    nbImgSwiper.slideTo(0);
    newBtn.classList.add("active"); // 글자 검정
    newProducts.classList.remove("off"); // 상품 보이게
    bestBtn.classList.remove("active"); // 글자 회색
    bestProducts.classList.add("off"); // 상품 안보이게
  } else if (type === "best") {
    nbImgSwiper.slideTo(1);
    bestBtn.classList.add("active"); // 글자 검정
    bestProducts.classList.remove("off"); // 상품 보이게
    newBtn.classList.remove("active"); // 글자 회색
    newProducts.classList.add("off"); // 상품 안보이게
  }
}

/* tutorials Event */

// 기존 배경 이미지
const t_bg_imgs = [
  "main_tutorial_eye_browpowder.jpg",
  "main_tutorial_eye_browcara.jpg",
  "main_tutorial_face_glimmer.jpg",
  "main_tutorial_face_concealer.jpg",
  "main_tutorial_erasing.jpg",
  "main_tutorial_faceblush.jpg",
  "main_tutorial_lipbooster.jpg",
  "main_tutorial_eye_browpowder.jpg",
  "main_tutorial_facecube_re.jpg",
  "main_tutorial_lipshaper.jpg",
];
// t_info 클릭 시 바뀔 이미지
const t_gif_imgs = [
  ["tutorials_eye_browpowder.gif"],
  ["tutorials_eye_browcara.gif"],
  ["tutorials_face_glimmer.gif"],
  ["tutorials_face_concealer.gif"],
  ["tutorials_facecube_erasingcube.gif"],
  [
    "tutorials_faceblush_baebeige.gif",
    "tutorials_faceblush_dimbeige.gif",
    "tutorials_faceblush_rumbeige.gif",
  ],
  ["tutorials_lipbooster_calmblack.gif"],
  [
    "tutorials_facecube_white.gif",
    "tutorials_facecube_purple.gif",
    "tutorials_facecube_peach.gif",
  ],
  [
    "tutorials_lipshaper_outtaupe.gif",
    "tutorials_lipshaper_outteddy.gif",
    "tutorials_lipshaper_insalmon.gif",
    "tutorials_lipshaper_outrosy.gif",
  ],
  [
    "tutorials_lipchanger_nublack.gif",
    "tutorials_lipchanger_nulavender.gif",
    "tutorials_lipchanger_nured.gif",
    "tutorials_lipchanger_nucoco.gif",
    "tutorials_lipchanger_nublackcherry.gif",
    "tutorials_lipchanger_nuberry.gif",
    "tutorials_lipchanger_nuginger.gif",
  ],
];

let autoBorderRotate;
let timeoutIds = []; // ⬅️ setTimeout 추적용 배열

const allInfo = document.querySelectorAll(".tSwiper .t_info");

function clearAllTimeouts() {
  timeoutIds.forEach(clearTimeout);
  timeoutIds = []; // 초기화
}

async function startBorderRotate() {
  const onInfo = document.querySelector("#tutorials .t_info.on");
  if (!onInfo) return;

  resetBorders(); // 테두리 초기화
  clearAllTimeouts(); // ⬅️ 이전 예약 제거

  const borderL = onInfo.querySelector(".border_l");
  const borderT = onInfo.querySelector(".border_t");
  const borderR = onInfo.querySelector(".border_r");
  const borderB = onInfo.querySelector(".border_b");

  timeoutIds.push(
    setTimeout(() => {
      borderL.style.height = "0";
      borderL.style.transition = "height 0.3s";
      borderL.style.height = "100%";

      timeoutIds.push(
        setTimeout(() => {
          borderT.style.width = "0";
          borderT.style.transition = "width 1.5s";
          borderT.style.width = "100%";

          timeoutIds.push(
            setTimeout(() => {
              borderR.style.height = "0";
              borderR.style.transition = "height 0.3s";
              borderR.style.height = "100%";

              timeoutIds.push(
                setTimeout(() => {
                  borderB.style.width = "0";
                  borderB.style.transition = "width 1.5s";
                  borderB.style.width = "100%";
                }, 300)
              );
            }, 1500)
          );
        }, 300)
      );
    }, 10)
  );

  // 반복 실행 예약
  autoBorderRotate = setTimeout(() => {
    startBorderRotate();
  }, 3700);
}

function stopBorderRotate() {
  clearTimeout(autoBorderRotate); // 애니메이션 반복 정지
  clearAllTimeouts(); // ⬅️ 타이머도 전부 제거
}

function resetBorders() {
  allInfo.forEach((info) => {
    const borderL = info.querySelector(".border_l");
    const borderT = info.querySelector(".border_t");
    const borderR = info.querySelector(".border_r");
    const borderB = info.querySelector(".border_b");

    if (borderL) borderL.style.height = "0";
    if (borderR) borderR.style.height = "0";
    if (borderT) borderT.style.width = "0";
    if (borderB) borderB.style.width = "0";

    [borderL, borderT, borderR, borderB].forEach((border) => {
      if (border) {
        border.style.transition = "none";
      }
    });
  });

  stopBorderRotate(); // 자동 반복 정지
}
//튜토리얼 - info 이미지 변경
const changeBgImg = function (t_info) {
  const slides = document.querySelectorAll(".tSwiper .swiper-slide");
  let onSlide = t_info.closest(".swiper-slide");
  let slideIndex = Array.from(slides).indexOf(onSlide);
  const infoList = onSlide.querySelectorAll(".t_info"); // t_info들 모음
  let infoIndex = Array.from(infoList).indexOf(t_info);

  if (slideIndex < 0 || infoIndex < 0) return;

  // 모든 슬라이드 기본 이미지로 초기화
  slides.forEach((slide, index) => {
    const defaultImg = `url(images/${t_bg_imgs[index]})`;
    const bgElem = slide.querySelector(".t_bg_img");
    if (bgElem && defaultImg) {
      bgElem.style.backgroundImage = defaultImg;
    }
  });
  // 클릭한 t_info의 배경 이미지를 gif 이미지로 바꿈
  const gifImage = `url(images/${t_gif_imgs[slideIndex][infoIndex]})`;
  const bgElem = onSlide.querySelector(".t_bg_img");
  if (bgElem && gifImage) {
    bgElem.style.backgroundImage = gifImage;
  }
  // *스크립트로 화면에 뿌리는건 경로가 html 기준* //
};

// 튜토리얼 - info 클릭 이벤트
allInfo.forEach((info) => {
  info.addEventListener("click", () => {
    allInfo.forEach((other) => {
      other.classList.remove("on");
    });
    info.classList.add("on");
    changeBgImg(info);
    resetBorders();
    startBorderRotate();
  });
});

// 튜토리얼 - 초기값 셋팅
const initialSlide = document.querySelector(".tSwiper .t_info.on");
if (initialSlide) {
  startBorderRotate();
  changeBgImg(initialSlide);
}
