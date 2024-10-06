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
const loadAllPets = async () => {
	const url = 'https://openapi.programming-hero.com/api/peddy/pets';
	const res = await fetch(url);
	const data = await res.json();
	displayPets(data.pets);
};
const displayPets = (pets) => {
	console.log(pets);
	const petsContainer = document.getElementById('pets-container');

	pets.map((item) => {
		const { pet_name, image, breed, date_of_birth, price, gender } = item;
		const div = document.createElement('div');
		div.classList = 'p-4 space-y-2 border border-gray-200 rounded-md';
		div.innerHTML = `
    
<img src=${image} alt=${breed} />
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
<div class="flex justify-between gap-1 border-t py-2">
  <button class="btn btn-sm">👍</button>
  <button class="btn btn-sm">Adopt</button>
  <button class="btn btn-sm">Details</button>
</div>
    `;

		petsContainer.appendChild(div);
	});
};

loadCategories();
loadAllPets();
