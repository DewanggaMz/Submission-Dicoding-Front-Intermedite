import axios from "axios";
import '../components/custom/search-view';
import '../components/custom/informasi-view';
import '../components/custom/movie-slides';

const main = () => {
  const btnMenu = document.getElementById('btnMenu');
  const btnSearch = document.getElementById('btnSearch');
  const overlay = document.querySelector('.overlay');
  const menuMobile = document.getElementById('menuMobile');
  const toggle = document.getElementById('kategori');

  const containerMovie = document.querySelector(".container-movies > grid-movie");
  const trendingList = document.querySelector("movie-slides");
  const searchView = document.querySelector('search-view');
  const detailView = document.querySelector('info-detail');

  const containerPage = document.getElementById('pagination');
  const totalPages = 100;
  let pages = 1;

  const baseURL = 'https://api.themoviedb.org/3';
  const param = {
    params: {
      api_key: "8877432225b8fb59ee885919d8d1a513",
    },
  }

	const getDataTrending = async () => {
		try {
			const response = await axios.get(`${baseURL}/trending/movie/week`, param);
			if (response.status == 200) {
				trendingList.movies = response.data.results;
			} else {
				throw `ERROR status code : ${response.status}`;
			}
		} catch (error) {
			alert(error);
		}
	};

  const getMovies = async (entry = 'movie', page = 1) => {
    containerMovie.innerHTML = '';
    let pages = page;
		try {
      for (let i = 1; i <= 2; i++) {
        i == 1 ? pages = (page * 2) - 1 : pages = page * 2;
				const response = await axios.get(`${baseURL}/discover/${entry}?&page=${pages}`,param);
        if (response.status == 200) {
					containerMovie.movies = response.data.results;
				} else {
					throw `ERROR status code : ${response.status}`;
				}
			}
		} catch (error) {
			alert(error);
		}
	};

  const getDetail = async (id) => {
    try {
			const response = await axios.get(`${baseURL}/movie/${id}`, param);
			if (response.status == 200) {
        showDetail(response.data);
			} else {
				throw `ERROR status code : ${response.status}`;
			}
		} catch (error) {
			alert(error);
		}
  }

  const showDetail = (resData) => {
    detailView.classList.remove('hide-height');
    detailView.detail = resData;
  }

  const takeNode = (node) => {
    if (node.target.tagName == 'IMG') {
      const idMovie = node.target.parentElement.getAttribute('id');
      getDetail(idMovie);
    }
  }

  const pagination = (totalPages, page) => {
    pages = page;
    let elementPage = '';
    let active = '';
    let beforePages = page - 1;
    let afterPages = page + 1; 

    if (page > 1) elementPage += `<li class="nav prev"><span>Prev</span></li>`;

    if (page > 2) {
      elementPage += `<li class="page"><span>1</span></li>`;
      if (page > 3) {
        elementPage += `<li class="dots"><span>...</span></li>`;
      }
    }

    if (page == totalPages) {
      beforePages = beforePages - 2;
    } else if (page == totalPages - 1) {
      beforePages = beforePages - 1;
    }

    if (page == 1) {
      afterPages = afterPages + 2;
    } else if (page == 2) {
      afterPages = afterPages + 1;
    }

    for (let i = beforePages; i <= afterPages; i++) {
      if (i > totalPages) continue;
      if (i == 0) i = 1;
      page == i ? active = 'active' : active = '';
      elementPage += `<li class="page ${active}"><span>${i}</span></li>`
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 2) elementPage += `<li class="dots"><span>...</span></li>`      
      elementPage += `<li class="page"><span>${totalPages}</span></li>`;
    }

    if (page < totalPages) elementPage += `<li class="nav next"><span>Next</span></li>`;

    containerPage.innerHTML = elementPage;
  }
  pagination(totalPages, pages);

  trendingList.addEventListener('click', takeNode);
  containerMovie.addEventListener('click', takeNode);
  searchView.addEventListener('click', takeNode);
  toggle.addEventListener('change', (element) => { 
    pages = 1;
    pagination(totalPages, 1);
    element.target.checked ? getMovies('tv',pages) : getMovies('movie',pages);
  });

  containerPage.addEventListener('click', (element) => {
    if (element.target.classList.contains('prev') || element.target.parentElement.classList.contains('prev')) {
      pagination(totalPages, pages - 1);
    }
    else if (element.target.classList.contains('next') || element.target.parentElement.classList.contains('next')) {
      pagination(totalPages, pages + 1);
    }
    else if (element.target.classList.contains('page') || element.target.parentElement.classList.contains('page')) {
      pagination(totalPages, Number(element.target.innerText));
    } else {
      element.target.preventDefault();
    }

    toggle.checked ? getMovies('tv',pages) : getMovies('movie',pages);
  });


  btnSearch.addEventListener('click', () => {
    searchView.classList.remove('hide-height');
  })

  btnMenu.addEventListener('click', () => {
    overlay.classList.toggle('overlay-show');
    menuMobile.classList.toggle('menu-m-show');
  });
  
  overlay.addEventListener('click', () => {
    overlay.classList.toggle('overlay-show');
    menuMobile.classList.toggle('menu-m-show');
  });

  getDataTrending();
  getMovies('movie',pages);
}

export default main;