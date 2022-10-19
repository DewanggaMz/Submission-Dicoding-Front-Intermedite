import setSlider from "../sliders";
import './movie-item';

class MovieSlides extends HTMLElement{
  
  connectedCallback() {
    this.heading = this.getAttribute('heading') || null;
  }

  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="list-movies">
    <div class="heading">
      <h3>Trending Now</h3>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_284_10)">
        <path d="M8.63506 5.5C8.63506 5.69714 8.55978 5.89426 8.40955 6.04456L3.67975 10.7743C3.37888 11.0752 2.89106 11.0752 2.59031 10.7743C2.28956 10.4736 2.28956 9.98584 2.59031 9.68495L6.7755 5.5L2.59046 1.31503C2.2897 1.01416 2.2897 0.526486 2.59046 0.225759C2.89121 -0.0752611 3.37902 -0.0752612 3.6799 0.225758L8.4097 4.95544C8.55995 5.10581 8.63506 5.30293 8.63506 5.5Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_284_10">
        <rect width="11" height="11" fill="white" transform="translate(0 11) rotate(-90)"/>
        </clipPath>
        </defs>
        </svg>          
    </div>
    <div class="content">
      <div class="swiper swiperSide">
        <div class="swiper-wrapper movie-slides-items"></div>
      </div>
    </div>
  </div>
  `
    this._movies.forEach(movie => {
      const movieItem = document.createElement('movie-item');
      movieItem.movie = movie;
      movieItem.setAttribute('id', `${movie.id}`);
      movieItem.classList.add('swiper-slide');
      this.querySelector('.content .movie-slides-items').appendChild(movieItem);
    });
    setSlider.swiperslides();
  }
}

customElements.define('movie-slides', MovieSlides);