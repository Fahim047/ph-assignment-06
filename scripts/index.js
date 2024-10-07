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
    <span>Breed: ${breed || 'N/A'}</span>
  </div>
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/calender.svg"
      alt=""
    />
    <span>Birth: ${date_of_birth || 'N/A'}</span>
  </div>
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/gender.svg"
      alt=""
    />
    <span>Gender: ${gender || 'N/A'}</span>
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
  <button class="adopt-btn btn btn-sm text-[#0E7A81]">Adopt</button>
  <button class="details-btn btn btn-sm text-[#0E7A81]">Details</button>
</div>
    `;

		petsContainer.appendChild(div);

		const likeBtn = div.querySelector('.like-btn');
		likeBtn.addEventListener('click', () => addToFavorite(image));
		const detailsBtn = div.querySelector('.details-btn');
		detailsBtn.addEventListener('click', () => showDetails(item));
		const adoptBtn = div.querySelector('.adopt-btn');
		adoptBtn.addEventListener('click', () => adoptPet());
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
const showDetails = (item) => {
	const {
		pet_name,
		image,
		breed,
		date_of_birth,
		price,
		gender,
		pet_details,
		vaccinated_status,
	} = item;
	const detailsModal = document.getElementById('details-modal');
	const modalContent = detailsModal.querySelector('.modal-content');
	modalContent.innerHTML = `
<img class="pet-image w-full rounded-md" src=${image} alt="not available" />
<h4 class="font-extrabold text-2xl">${pet_name || 'N/A'}</h4>
<div class="space-y-1 grid grid-cols-2 gap-2 text-gray-500 text-sm">
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/breed.svg"
      alt="breed"
    />
    <span>Breed: ${breed || 'N/A'}</span>
  </div>
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/calender.svg"
      alt="calender"
    />
    <span>Birth: ${date_of_birth || 'N/A'}</span>
  </div>
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/gender.svg"
      alt="gender"
    />
    <span>Gender: ${gender || 'N/A'}</span>
  </div>
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/dollar.svg"
      alt="money"
    />
    <span>Price: ${price ? price + '$' : 'N/A'}</span>
  </div>
  <div class="flex items-center gap-2">
    <img
      class="size-4"
      src="./images/icons/vaccine.svg"
      alt="vaccine"
    />
    <span>Vaccinated status: ${vaccinated_status || 'N/A'}</span>
  </div>
</div>
<div class="border-t py-4 space-y-2">
	<h4 class="font-bold">Details Information</h4>
	<p>${pet_details}</p>
</div>
	`;
	detailsModal.showModal();
};
const adoptPet = () => {
	const adoptModal = document.getElementById('adopt-modal');
	const modalContent = adoptModal.querySelector('.modal-content');
	modalContent.innerHTML = `
		<div class="text-center space-y-4">
      <h2 class="text-3xl font-bold text-green-600">🎉 Congratulations!</h2>
      <h3 id="counter" class="text-4xl font-extrabold text-blue-500 mt-4">3</h3>
      <p class="text-lg text-gray-700">You have successfully adopted the pet.</p>
    </div>
	`;
	adoptModal.showModal();
	const timer = setInterval(() => {
		const counter = adoptModal.querySelector('#counter');
		counter.innerText = Number(counter.innerText) - 1;

		if (counter.innerText === '0') {
			clearInterval(timer);
			counter.innerText = '1';
			adoptModal.close();
		}
	}, 1000);
	event.target.innerText = 'Adopted';
	event.target.disabled = true;
};

loadCategories();
loadAllPets();
