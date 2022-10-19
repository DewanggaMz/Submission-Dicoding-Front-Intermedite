class informasiView extends HTMLElement{

  set detail(detail) {
    this._detail = detail;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="poster">
      <img src="https://image.tmdb.org/t/p/w500/${this._detail.backdrop_path}" alt="${this._detail.title}">
    </div>
    <div class="informasi">
      <div class="heading">
        <h3 class="title">${this._detail.title}</h3>
      </div>
      <table class="detail-info">
        <tr>
          <th>Original Language</th>
          <td class="language">${this._detail.original_language}</td>
        </tr>
        <tr>
          <th>Release Date</th>
          <td>${this._detail.release_date}</td>
        </tr>
        <tr>
          <th>Popularity</th>
          <td>${this._detail.popularity}</td>
        </tr>
        <tr>
          <th>Vote Average</th>
          <td>${this._detail.vote_average}</td>
        </tr>
        <tr>
          <th>Vote Count</th>
          <td>${this._detail.vote_count}</td>
        </tr>
      </table>
      <div class="genre">
        <div class="heading-genre">
          <h4>Genre</h4>
        </div>
        <div class="content-genre"></div>
      </div>
      <div class="description">
        <p>${this._detail.overview}</p>
      </div>
    </div>
    <div class="icon-close">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_324_3)">
        <path d="M2.08556 21.8622C1.54618 21.8936 1.01572 21.7143 0.606039 21.3621C-0.201932 20.5493 -0.201932 19.2366 0.606039 18.4238L18.2979 0.731866C19.1383 -0.0544877 20.457 -0.0107747 21.2433 0.829586C21.9544 1.58952 21.9958 2.75756 21.3404 3.56594L3.54421 21.3621C3.13982 21.7092 2.61787 21.8881 2.08556 21.8622V21.8622Z" fill="black"/>
        <path d="M19.7567 21.8622C19.21 21.8599 18.6861 21.6429 18.298 21.2579L0.605993 3.56587C-0.14255 2.69175 -0.0407816 1.37624 0.833341 0.627628C1.61352 -0.0404879 2.76413 -0.0404879 3.54423 0.627628L21.3404 18.3196C22.1805 19.1062 22.224 20.4249 21.4374 21.265C21.4061 21.2985 21.3738 21.3308 21.3404 21.3621C20.9046 21.741 20.3311 21.9221 19.7567 21.8622V21.8622Z" fill="black"/>
        </g>
        <defs>
        <clipPath id="clip0_324_3">
        <rect width="22" height="22" fill="white"/>
        </clipPath>
        </defs>
        </svg>          
    </div>
    `
    this._detail.genres.forEach(object => {
      this.span = document.createElement('span');
      this.span.innerText = object.name;
      this.querySelector('.content-genre').appendChild(this.span);
    });

    this.close = this.querySelector('.icon-close');
    this.close.addEventListener('click', () => {
      this.classList.add('hide-height');
    });
  }

}

customElements.define('info-detail', informasiView);