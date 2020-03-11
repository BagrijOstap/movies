
const fetchMovies = async () => {
	const url = 'https://api.themoviedb.org/3/discover/movie?api_key=d194a96d2ccc62985ba76c92c7529744';
	const response = await fetch(url);
	const content = await response.json();
	const { results } = content;

	return results;
};

const displayFilmsList = (movie) => {
	const elementDiv1 = document.getElementById('searchEndList');
	elementDiv1.innerHTML = '';
	const elementUL = document.createElement('ul');
	elementUL.setAttribute('id', 'filmList');
	elementDiv1.appendChild(elementUL);

	for (let i = 0; i < movie.length; i = i +1) {
		const movieObject = movie[i];
		const elementLi = document.createElement('li');
		const elementH4 = document.createElement('h4');
		const textContent = movieObject.title;
		elementH4.textContent = textContent;
		elementUL.appendChild(elementLi);
		elementLi.appendChild(elementH4);
		elementLi.addEventListener('click', () => {
			showFilmInfo(movie[i])
		});
	};
};

const buttonHandler = async () => {
	const inputValue = document.getElementById('searchInput').value;
	if (inputValue !== '') {
	const url = `https://api.themoviedb.org/3/search/movie?api_key=d194a96d2ccc62985ba76c92c7529744&query=${inputValue}`;
	const response = await fetch(url);
	const content = await response.json();
	displayFilmsList(content.results);
	} else {
		alert('enter your search information!');
	}
};

const showFilmInfo = async (movie) => {
	const elementDiv2 = document.getElementById('filmInfo');
	elementDiv2.innerHTML = '';
	const url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	const elementImg = document.createElement('img');
	elementImg.setAttribute('src', url);
	elementDiv2.appendChild(elementImg);
	const elementH1 = document.createElement('h1');
	elementH1.textContent = movie.original_title;
	elementDiv2.appendChild(elementH1);
	const elementP = document.createElement('p');
	elementP.textContent = movie.overview;
	elementDiv2.appendChild(elementP);
	const urlRecomendations = `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=d194a96d2ccc62985ba76c92c7529744`;

	const response = await fetch(urlRecomendations);
	const recomendationsContent = await response.json();
	const arrayElements = recomendationsContent.results.slice(0, 5);
	const recomendationsContainer = document.createElement('ul');
	for (let i = 0; i < arrayElements.length; i = i + 1) {
		const elementLi = document.createElement('li');
		arrayElement = arrayElements[i].original_title;
		elementLi.textContent = arrayElement;
		recomendationsContainer.appendChild(elementLi);
		elementLi.addEventListener('click', () => {
			showFilmInfo(arrayElements[i]);
		});
	};
	elementDiv2.appendChild(recomendationsContainer);
};

document.addEventListener("DOMContentLoaded", async () => {
	const filmsList = await fetchMovies();
	displayFilmsList(filmsList);
	const button = document.getElementById('buttonId');
	button.addEventListener('click', buttonHandler );
});