//1151
// fetch('https://gorest.co.in/public-api/posts/945');
// fetch('https://gorest.co.in/public-api/users/1954');
let numPage = NaN;
let firstPage;
let activePage;
let lastPage;

const loadArticles = async (cb, num) => {
  let result;
  if (Number(num) === 1) {
    // location.hash = '';
    result = await fetch('https://gorest.co.in/public-api/posts');
  } else {
    // location.hash = `?page=${num}`;
    result = await fetch(`https://gorest.co.in/public-api/posts?page=${num}`);
  }

  const data = await result.json();
  numPage = num;
  firstPage = numPage - 1;
  activePage = firstPage + 1;
  lastPage = activePage + 1;

  console.log('data', data);
  console.log('location.hash', location.hash);
  cb(data);
};




const renderArticles = async (data) => {
  const data2 = await data.data;

  const wrapperArticles = document.querySelector('.blog__row');

  const articles = data2.map(item => {
    // console.log('item', item);
    const card = document.createElement('div');
    card.classList.add('article');
    card.insertAdjacentHTML('beforeend', `
        <div class="article__images">
          <a href="#"><img src="css/blog/img/article-1.jpg" alt="" class="article__image"></a>
        </div>
        <div class="article__information">
          <div class="article__text">
            <a href="#" class="article__title">${item.title}</a>
            <div class="article__data">22 октября 2021, 12:45</div>
          </div>
          <div class="info">
            <p class="info__views">1.2K</p>
            <p class="info__message">0</p>
          </div>
        </div>
    `);
    return card;
  });

  wrapperArticles.append(...articles);

  const pagination = await data.meta.pagination.pages;

  console.log('data.pagination', pagination);
  const pages = document.querySelector('.pages');
  if (firstPage <= 1) {
    firstPage = 1;
    activePage = 2;
    lastPage = 3;
  }

  pages.innerHTML = `
   <a href="?page=${firstPage}" class="pages__link pages__link_previous pages__link_type_disable">
     <svg class="pages__image" width="29" height="19" viewBox="0 0 29 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
       <path d="M28.375 7.95833H6.52958L12.0487 2.42375L9.875 0.25L0.625 9.5L9.875 18.75L12.0487 16.5763L6.52958 11.0417H28.375V7.95833Z"/>
     </svg>
   </a>
   <div class="pages__list">
     <a href="?page=${firstPage}" class="pages__link">${firstPage}</a>
     <a href="?page=${activePage}" class="pages__link pages__link_type_active">${activePage}</a>
     <a href="?page=${lastPage}" class="pages__link">${lastPage}</a>
   </div>
   <a href="?page=${lastPage + 1}" class="pages__link pages__link_next pages__link_type_active">
     <svg class="pages__image" width="29" height="19" viewBox="0 0 29 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
       <path d="M0.625 7.95833H22.4704L16.9513 2.42375L19.125 0.25L28.375 9.5L19.125 18.75L16.9513 16.5763L22.4704 11.0417H0.625V7.95833Z"/>
     </svg>
   </a>`;
};

let num = window.location.search.substring(6);
console.log(num);

loadArticles(renderArticles, num);
