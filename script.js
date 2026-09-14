const menuButton = document.querySelector('.menu');
const navbar = document.querySelector('.navbar');
const cartButton = document.querySelector('.cart-button');
const cartDrawer = document.querySelector('.cart-drawer');
const closeCartButton = document.querySelector('.close-cart');
const drawerBackdrop = document.querySelector('.drawer-backdrop');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.cart-total');
const menuCards = [...document.querySelectorAll('.card')];
const filterButtons = [...document.querySelectorAll('.filter-button')];
const searchInput = document.querySelector('.search-box input');
const basket = [];
const formatCurrency = (value) => new Intl.NumberFormat('en-IN', {
   style: 'currency',
   currency: 'INR',
   maximumFractionDigits: 0,
}).format(value);

menuButton.addEventListener('click', () => {
   const isOpen = navbar.classList.toggle('change');
   menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.navbar-link').forEach((link) => {
   link.addEventListener('click', () => {
      navbar.classList.remove('change');
      menuButton.setAttribute('aria-expanded', 'false');
   });
});

const setCartOpen = (isOpen) => {
   cartDrawer.classList.toggle('open', isOpen);
   drawerBackdrop.classList.toggle('open', isOpen);
   cartDrawer.setAttribute('aria-hidden', String(!isOpen));
   cartButton.setAttribute('aria-expanded', String(isOpen));
};

cartButton.addEventListener('click', () => setCartOpen(true));
closeCartButton.addEventListener('click', () => setCartOpen(false));
drawerBackdrop.addEventListener('click', () => setCartOpen(false));

const updateCart = () => {
   const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
   const quantity = basket.reduce((sum, item) => sum + item.quantity, 0);
   cartCount.textContent = quantity;
   cartTotal.textContent = formatCurrency(total);
   cartItems.innerHTML = basket.length
      ? basket.map((item) => `<div class="cart-line"><span>${item.name}<small>Qty ${item.quantity}</small></span><strong>${formatCurrency(item.price * item.quantity)}</strong></div>`).join('')
      : '<p class="empty-cart">Your basket is waiting for something delicious.</p>';
};

document.querySelectorAll('.card-btn').forEach((button) => {
   button.addEventListener('click', () => {
      const card = button.closest('.card');
      const existingItem = basket.find((item) => item.name === card.dataset.name);
      if (existingItem) existingItem.quantity += 1;
      else basket.push({ name: card.dataset.name, price: Number(card.dataset.price), quantity: 1 });
      updateCart();
      setCartOpen(true);
   });
});

const filterMenuByCategory = (category = document.querySelector('.filter-button.active').dataset.filter) => {
   const searchTerm = searchInput.value.toLowerCase().trim();
   menuCards.forEach((card) => {
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const matchesSearch = card.dataset.name.toLowerCase().includes(searchTerm);
      card.hidden = !(matchesCategory && matchesSearch);
   });
};

filterButtons.forEach((button) => {
   button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      filterMenuByCategory(button.dataset.filter);
   });
});

searchInput.addEventListener('input', () => filterMenuByCategory());

document.querySelector('.signup-form').addEventListener('submit', (event) => {
   event.preventDefault();
   const input = document.querySelector('.signup-form-input');
   input.value = '';
   input.placeholder = 'You are on the list. Thanks!';
});

const icons = document.querySelectorAll('.section-1-icons i');
let iconIndex = 0;
setInterval(() => {
   icons[iconIndex].classList.remove('change');
   iconIndex = (iconIndex + 1) % icons.length;
   icons[iconIndex].classList.add('change');
}, 4000);



