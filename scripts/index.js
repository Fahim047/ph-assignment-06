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
		btn.addEventListener('click', () => loadPetsByCategory(item.category));

		categoriesContainer.appendChild(btn);
	});
};
const loadAllPets = async () => {
	const url = 'https://openapi.programming-hero.com/api/peddy/pets';
	const res = await fetch(url);
	const data = await res.json();
	displayPets(data.pets);
};
const displayPets = (pets) => {
	const petsContainer = document.getElementById('pets-container');
	petsContainer.innerHTML = '';
	petsContainer.classList = 'grid grid-cols-3 gap-4';
	if (pets.length === 0) {
		petsContainer.classList =
			'flex flex-col justify-center items-center h-[300px]';
		petsContainer.innerHTML = `
    <img src="./images/error.webp" alt="" />
    <h2 class="text-3xl font-extrabold text-gray-500 text-center">No pets found!!!</h2>
    `;
		return;
	}
	pets.map((item) => {
		const { pet_name, image, breed, date_of_birth, price, gender } = item;
		const div = document.createElement('div');
		div.classList = 'p-4 space-y-2 border-2 border-gray-200 rounded-md';
		div.innerHTML = `
    
<img class="pet-image" src=${image} alt=${breed} />
<h4 class="font-bold">${pet_name}</h4>
<div class="space-y-1 text-gray-500 text-sm">
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/breed.svg"
      alt=""
    />
    <span>Breed: ${breed ? breed : 'N/A'}</span>
  </div>
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/calender.svg"
      alt=""
    />
    <span>Birth: ${date_of_birth ? date_of_birth : 'N/A'}</span>
  </div>
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/gender.svg"
      alt=""
    />
    <span>Gender: ${gender ? gender : 'N/A'}</span>
  </div>
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/dollar.svg"
      alt=""
    />
    <span>Price : ${price ? price + '$' : 'N/A'}</span>
  </div>
</div>
<div class="flex justify-between gap-1 border-t pt-4">
  <button class="btn btn-sm like-btn">
  <img src="./images/icons/like.svg" alt="" /></button>
  <button class="btn btn-sm text-[#0E7A81]">Adopt</button>
  <button class="btn btn-sm text-[#0E7A81]">Details</button>
</div>
    `;

		petsContainer.appendChild(div);

		const likeBtn = div.querySelector('.like-btn');
		likeBtn.addEventListener('click', () => addToFavorite(image));
	});
};

const loadPetsByCategory = async (category) => {
	const url = ` https://openapi.programming-hero.com/api/peddy/category/${category}`;

	const res = await fetch(url);
	const data = await res.json();
	displayPets(data.data);
};
const addToFavorite = (imageUrl) => {
	const favoritePetContainer = document.getElementById(
		'favorite-pet-container'
	);
	const img = document.createElement('img');
	img.src = imageUrl;
	favoritePetContainer.appendChild(img);
};

loadCategories();
loadAllPets();
