import Swiper, { Autoplay, EffectCoverflow } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-coverflow';

class setSlider {
  static swiperslides() {
    const swiperslides = new Swiper(".swiperSide", {
      slidesPerView: 8,
      spaceBetween: 11,
      breakpoints: {
        0: {
          slidesPerView: 3,
        },
        520: {
          slidesPerView: 5,
        },
        950: {
          slidesPerView: 8,
        }
      }
    });
  }

  static swiperHero() {
    const slideHero = new Swiper(".swiper-hero", {
      modules: [Autoplay, EffectCoverflow],
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      spaceBetween: 43,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
    });
  }
}



export default setSlider;
