"use strict";

const slider = document.querySelector(".slider");
const sliderItems = Array.from(slider.children);
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");

const hideSlide = (slide) => {
  slide.classList.add("hidden");
};

const enableSlider = (sliderItems) => {
  sliderItems.forEach((slide, index) => {
    //Скрываем все слайды кроме первого
    if (index != 0) {
      hideSlide(slide);
    }

    //Добавляем индексы
    slide.dataset.index = index;

    //Добавляем дата атрибут avtive для первого активного слайда
    sliderItems[0].setAttribute("data-active", "");

    //Клик по слайдам
    slide.addEventListener("click", () => {
      //Скрываем текущий слайд
      slide.classList.add("hidden");
      slide.removeAttribute("data-active");

      //Расчитываем индекс след слайда
      const nextSlideIndex = index + 1 === sliderItems.length ? 0 : index + 1;

      const nextSlide = slider.querySelector(
        `[data-index="${nextSlideIndex}"]`
      );

      //Отображаем след слайд
      nextSlide.classList.remove("hidden");
      nextSlide.setAttribute("data-active", "");
    });
  });
};

const showNextSlide = (direction) => {
  //Скрываем текущий слайд
  const currentSlide = slider.querySelector("[data-active]");
  const currentSlideIndex = +currentSlide.dataset.index;
  currentSlide.classList.add("hidden");
  currentSlide.removeAttribute("data-active");

  //Расчитывыем след индекс в зависимости от направления движения слайда
  let nextSlideIndex;
  if (direction === "next") {
    nextSlideIndex =
      currentSlideIndex + 1 === sliderItems.length ? 0 : currentSlideIndex + 1;
  } else if (direction === "prev") {
    nextSlideIndex =
      currentSlideIndex === 0 ? sliderItems.length - 1 : currentSlideIndex - 1;
  }

  //Показываем следующий слайд
  const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
  nextSlide.classList.remove("hidden");
  nextSlide.setAttribute("data-active", "");
};

btnNext.addEventListener("click", () => {
  showNextSlide("next");
});

btnPrev.addEventListener("click", () => {
  showNextSlide("prev");
});

enableSlider(sliderItems);
