let navbar = document.querySelector('.navbar');
let cartItemsContainer = document.getElementsByClassName(
  'cart-items-container'
);
let deleteItems = document.getElementsByClassName('delete');
let checkOutBtn = document.querySelector('.check');
let cartItems = document.getElementsByClassName('cart-item');
let menuBtn = document.querySelectorAll('.menu .btn');
let newBtn = document.createElement('a');
let backDrop = document.getElementById('backdrop');
let orderBtn = document.getElementsByClassName('orderBtn');
let orderBox = document.getElementById('orderBorder');
let deleteBtn = document.getElementsByClassName('delete1');
let orders = document.getElementsByClassName('orders');

newBtn.classList.add('btn');
newBtn.href = '#menu';
newBtn.innerText = 'ADD';
newBtn.style.marginTop = '20px';
newBtn.style.background = 'blue';
controller();

let i = 0;
function deleteSelected(e) {
  selectedEl = e.target.parentNode;
  selectedEl.remove();
  controller();
}

function deleteSelectedForOrderBox(e) {
  selectedEl = e.target.parentNode;
  selectedEl.remove();
  if (orders.length === 0) {
    orderBtn[0].innerText = 'YOU GOT NO ORDER AT ALL ! ';
    orderBtn[0].style.marginTop = '5px';
    orderBtn[0].style.marginLeft = '120px';
  }
}

function controller() {
  if (cartItems.length === 0) {
    checkOutBtn.innerText =
      'You have no item on your cart if you wanna add click below!';
    checkOutBtn.style.marginTop = '400px';
    checkOutBtn.style.backgroundColor = 'red';
    cartItemsContainer[0].append(newBtn);
  }
}

function toggleBackDrop() {
  backDrop.classList.toggle('visible');
}

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
  cartItem.classList.remove('active');
};

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () => {
  cartItem.classList.toggle('active');
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
};

window.onscroll = () => {
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};

function addCartHandler(e) {
  let selectedMenuItem = e.target.parentNode;
  let selectedMenuImg = selectedMenuItem.querySelector('img').src;
  let selectedMenuContent = selectedMenuItem.querySelector('h3').textContent;
  let selectedMenuPrice = selectedMenuItem.querySelector('.price').firstChild;

  cartItemsContainer[0].insertAdjacentHTML(
    'afterbegin',
    `
  <div class="cart-item">
  <span class="fas fa-times delete"></span>
  <img src="${selectedMenuImg}" alt="" />
  <div class="content">
    <h3>${selectedMenuContent}</h3>
    <div class="price">${selectedMenuPrice.textContent}</div>
  </div>
</div>
  `
  );
  [...deleteItems].forEach(item => {
    item.removeEventListener('click', deleteSelected);
    item.addEventListener('click', deleteSelected);
  });

  if (cartItems.length !== 0) {
    newBtn.remove();
    checkOutBtn.innerText = 'Checkout now';
    checkOutBtn.style.marginTop = '0';
    checkOutBtn.style.backgroundColor = '#d3ad7f';
  }
}

function orderBtnHandler() {
  toggleBackDrop();
  orderBox.classList.remove('visible');
}

function productsHandler() {
  orderBox.innerHTML = '';
  for (let i = 0; i < cartItems.length; i++) {
    let imageSrc = cartItems[i].querySelector('img').src;
    let content = cartItems[i].querySelector('h3').textContent;
    let price = cartItems[i].querySelector('.price').textContent;

    if (i === 0) {
      orderBox.insertAdjacentHTML(
        'afterbegin',
        ` <div class="products">
      <h2>Your products!</h2>
    </div>`
      );
    }
    orderBox.insertAdjacentHTML(
      'beforeend',
      `<div class="orders">
          <div class="imgBox">
            <img src="${imageSrc}" alt="" />
          </div>
          <div><h3>${content}</h3></div>
          <div class="price">${price} | <span>21.99</span></div>
          <button class="btn-1 delete1">Delete Product</button>
        </div>`
    );

    [...deleteBtn].forEach(item => {
      item.addEventListener('click', deleteSelectedForOrderBox);
    });

    if (i === cartItems.length - 1) {
      orderBox.insertAdjacentHTML(
        'beforeend',
        `<button class="btn-1 orderBtn">ORDER NOW! </button>`
      );
      orderBtn[0].addEventListener('click', orderBtnHandler);
    }
  }
}

menuBtn.forEach(item => {
  item.addEventListener('click', addCartHandler);
});

[...deleteItems].forEach(item => {
  item.addEventListener('click', deleteSelected);
});

checkOutBtn.addEventListener('click', () => {
  orderBox.classList.add('visible');
  productsHandler();
  backDrop.classList.add('visible');
});

backDrop.addEventListener('click', () => {
  toggleBackDrop();
  orderBox.classList.toggle('visible');
});

// function controller2() {
//   if (orders.length === 0) {
//     let newBtn = document.createElement('button');
//     newBtn.innerText = 'UR CARD IS EMPTY!';
//     newBtn.style.width = '100%';
//     newBtn.classList.add('btn-1');
//     newBtn.style.backgroundColor = 'red';
//     newBtn.style.position = 'absolute';
//     newBtn.style.left = '0';
//     newBtn.style.top = '53px';
//     newBtn.style.height = '50px';
//     newBtn.style.borderRadius = '15px';
//     newBtn.style.bottom = '0';
//     orderBox.append(newBtn);
//   }
// }
