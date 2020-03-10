
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
	elementUL.setAttribute('id', 'filmList')
	elementDiv1.appendChild(elementUL);

	for (let i = 0; i < movie.length; i = i +1) {
		const movieObject = movie[i];
		const elementLi = document.createElement('li');
		const elementH4 = document.createElement('h4');
		const textContent = movieObject.title;
		elementH4.textContent = textContent;
		elementUL.appendChild(elementLi);
		elementLi.appendChild(elementH4);
	};
};

const buttonHandler = async () => {
	const inputValue = document.getElementById('searchInput').value;
	const url = `https://api.themoviedb.org/3/search/movie?api_key=d194a96d2ccc62985ba76c92c7529744&query=${inputValue}`;
	const response = await fetch(url);
	const content = await response.json();
	displayFilmsList(content.results);
};

document.addEventListener("DOMContentLoaded", async () => {
	const filmsList = await fetchMovies();
	displayFilmsList(filmsList);
	const button = document.getElementById('buttonId');
	button.addEventListener('click', buttonHandler );

});