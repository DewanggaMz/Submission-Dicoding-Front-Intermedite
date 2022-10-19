class movieItem extends HTMLElement{
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${this._movie.poster_path}" alt="${this._movie.title}">
    `
  }

}

customElements.define('movie-item', movieItem);