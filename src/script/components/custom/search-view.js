import './grid-movie';
import axios from "axios";

class searchView extends HTMLElement{

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="header-search">
      <div class="icon-back">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_304_3)">
          <path d="M20.6777 9.4558C20.5877 9.44119 20.4966 9.43445 20.4054 9.43563H4.88485L5.22328 9.27822C5.55408 9.12165 5.85503 8.90856 6.11264 8.64858L10.465 4.29623C11.0382 3.74904 11.1345 2.86878 10.6932 2.21056C10.1796 1.50916 9.19471 1.35687 8.49325 1.87046C8.43658 1.91198 8.38272 1.95723 8.3321 2.00593L0.461663 9.87637C-0.153412 10.4908 -0.153953 11.4874 0.460433 12.1025C0.460827 12.1029 0.46127 12.1033 0.461663 12.1037L8.3321 19.9741C8.94767 20.588 9.94432 20.5866 10.5582 19.9711C10.6065 19.9226 10.6516 19.871 10.6932 19.8167C11.1345 19.1585 11.0382 18.2783 10.465 17.7311L6.12051 13.3708C5.88956 13.1397 5.62403 12.9458 5.33347 12.7963L4.86124 12.5838H20.3188C21.1229 12.6137 21.8284 12.052 21.9795 11.2616C22.1186 10.4034 21.5358 9.59501 20.6777 9.4558Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_304_3">
          <rect width="22" height="22" fill="white"/>
          </clipPath>
          </defs>
          </svg>               
      </div>
      <input type="search" class="search" placeholder="Search">
      </div>
      <grid-movie></grid-movie>
    `

    this.close = this.querySelector('.icon-back');
    this.close.addEventListener('click', () => {
      this.classList.add('hide-height');
    });

    // this.gridMovie = this.querySelector('grid-movie');
    this.datamovies = [];

    this.querySelector('input.search').addEventListener('change', (element) => {
      (async () => {
        try {
          for (let i = 1; i <= 2; i++) {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?&page=${i}&query=${element.target.value}`, {
              params: {
                api_key: "8877432225b8fb59ee885919d8d1a513",
              },
            });
            this.datamovies.push(response.data.results);
          }
          if (this.datamovies) {
            this.querySelector('grid-movie').innerHTML = '';
            this.querySelector('grid-movie').movies = this.datamovies;
            this.datamovies = [];
          } else {
            throw `ERROR status code : `;
          }
        } catch (error) {
          alert(error);
        }
      })();
    });
  }
}

customElements.define('search-view', searchView);