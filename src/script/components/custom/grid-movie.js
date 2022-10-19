import './movie-item';

class gridMovie extends HTMLElement{
  set movies(movies) {
    this._movies = movies.flat();
    this.render();
  }

  render() {
    this._movies.forEach(movie => {
      if (movie.poster_path) {
        const movieItem = document.createElement('movie-item');
        movieItem.setAttribute('id', `${movie.id}`);
        movieItem.movie = movie;
        this.appendChild(movieItem);
      }
    });
  }

}

customElements.define('grid-movie', gridMovie);