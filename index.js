
const fetchData = async () => {
	const url = 'https://api.themoviedb.org/3/discover/movie?api_key=d194a96d2ccc62985ba76c92c7529744';
	const response = await fetch(url);
	const content = await response.json();
	const { results } = content;

	return results;
};

const displayFilmsList = (movie) => {
	const linkDiv = document.getElementById('root');
	const elementUL = document.createElement('ul');
	elementUL.setAttribute('id', 'filmList');
	linkDiv.appendChild(elementUL);

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

document.addEventListener("DOMContentLoaded", async () => {
	const filmsList = await fetchData();
	displayFilmsList(filmsList);


});