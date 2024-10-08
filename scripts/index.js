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
		btn.classList =
			'btn border bg-transparent max-w-[200px] h-[80px] hover:bg-[#0e798125] duration-300 flex items-center justify-center gap-2 rounded-md';
		btn.innerHTML = `
			<img class="size-10 object-fit" src="./images/icons/${item.category}.svg" alt="${item.category}" />
			<span class="text-lg font-bold">${item.category}</span>
		`;
		btn.addEventListener('click', () => {
			handleActiveBtn(btn, categoriesContainer);
			loadPetsByCategory(item.category);
		});

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
	petsContainer.classList = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4';
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
    
<img class="pet-image rounded-md" src=${image} alt=${breed} />
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
    <span>Price: <span class="pet-price">${price || 'N/A'}</span>${
			price ? '$' : ''
		}</span>
  </div>
</div>
<div class="flex justify-between gap-1 border-t pt-4">
  <button class="btn btn-sm like-btn">
  <img src="./images/icons/like.svg" alt="like" /></button>
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
const handleActiveBtn = (clickedBtn, container) => {
	const allBtns = container.querySelectorAll('button');
	allBtns.forEach((btn) => {
		btn.classList.remove('bg-[#0e798125]', 'border-[#0e7981]', '!rounded-full');
	});
	clickedBtn.classList.add(
		'bg-[#0e798125]',
		'border-[#0e7981]',
		'!rounded-full'
	);
};
const addToFavorite = (imageUrl) => {
	const favoritePetContainer = document.getElementById(
		'favorite-pet-container'
	);

	const img = document.createElement('img');
	img.src = imageUrl;
	img.alt = 'pet';
	img.classList = 'rounded-md';
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
			adoptModal.close();
			counter.innerText = '1';
		}
	}, 1000);
	event.target.innerText = 'Adopted';
	event.target.disabled = true;
};

const sortByPrice = () => {
	const petsContainer = document.getElementById('pets-container');
	const petCards = Array.from(petsContainer.childNodes);
	const sortedPetCards = petCards.sort((a, b) => {
		const priceA = Number(a.querySelector('.pet-price').innerText);
		const priceB = Number(b.querySelector('.pet-price').innerText);

		if (isNaN(priceA)) return 1;
		if (isNaN(priceB)) return -1;

		return priceB - priceA;
	});
	petsContainer.innerHTML = '';
	sortedPetCards.forEach((card) => {
		petsContainer.appendChild(card);
	});
};

const sortBtn = document.getElementById('sort-btn');
sortBtn.addEventListener('click', () => sortByPrice());

loadCategories();
loadAllPets();
