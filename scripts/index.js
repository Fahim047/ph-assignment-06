console.log('script is running...');

const loadCategories = async () => {
	const url = 'https://openapi.programming-hero.com/api/peddy/categories';
	const res = await fetch(url);
	const data = await res.json();
	displayCategories(data.categories);
};
const displayCategories = (categories) => {
	const categoriesContainer = document.getElementById('categories-container');

	categories.map((item) => {
		const btn = document.createElement('button');
		btn.classList = 'btn w-[100px] md:w-[150px]';
		btn.innerText = item.category;

		categoriesContainer.appendChild(btn);
	});
};

loadCategories();
