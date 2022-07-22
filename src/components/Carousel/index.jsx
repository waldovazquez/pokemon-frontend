import React from 'react';

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';

import styles from './carousel.module.css';

function Carousel({
  slides,
  currentSlide = 0,
  setCurrentSlide = () => { },
  style,
  colorLeft = '#2B2D42',
  colorRight = '#2B2D42',
}) {
  function nextSlide() {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  }

  function prevSlide() {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  }

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div
      style={style}
      className={styles.slider}
    >
      <BsFillArrowLeftCircleFill
        fontSize={32}
        color={colorLeft}
        className={styles.left__arrow}
        onClick={() => prevSlide()}
      />
      {slides.map((slide, index) => (
        <div key={slide.id}>
          {index === currentSlide && (
            <img
              src={slide.image}
              alt={slide.alt}
              className={styles.image}
            />
          )}
        </div>
      ))}
      <BsFillArrowRightCircleFill
        fontSize={32}
        color={colorRight}
        className={styles.right__arrow}
        onClick={() => nextSlide()}
      />
    </div>
  );
}

export default Carousel;
