'use strict';
// fetch('https://gorest.co.in/public-api/posts/945');
// fetch('https://gorest.co.in/public-api/users/1954');
{
  let numPage = NaN;
  let firstPage;
  let activePage;
  let lastPage;

  const loadArticles = async (cb, num) => {
    let result;
    // console.log('num', num);
    if (Number(num) === 1) {
      location.search = '';
      result = await fetch('https://gorest.co.in/public-api/posts');
    } else {
      // location.hash = `?page=${num}`;
      result = await fetch(`https://gorest.co.in/public-api/posts?page=${num}`);
    }

    const data = await result.json();
    const nav = data.meta;
    const pages = nav.pagination.pages;

    if (num < (pages - 2)) {
      numPage = num;
      firstPage = numPage - 1;
      activePage = firstPage + 1;
      lastPage = activePage + 1;
    } else {
      firstPage = pages - 2;
      activePage = pages - 1;
      lastPage = pages;
    }


    // console.log('data', data);
    cb(data);
  };

  const renderArticles = async (data) => {
    const data2 = await data.data;
    const pages2 = await data.meta;

    const wrapperArticles = document.querySelector('.blog__row');

    const articles = data2.map(item => {
      const card = document.createElement('div');
      card.classList.add('article');
      const url = '/ShopOnline/article.html';

      card.insertAdjacentHTML('beforeend', `
        <div class="article__images">
          <a href="${url}?id=${item.id}"><img src="css/blog/img/no-image.png" alt="" class="article__image"></a>
        </div>
        <div class="article__information">
          <div class="article__text">
            <a href="${url}?id=${item.id}" class="article__title">${item.title}</a>
            <p class="article__data">22 октября 2021, 12:45</p>
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


    if (firstPage <= 1) {
      firstPage = 1;
      activePage = 2;
      lastPage = 3;
    }

    const numPages = pages2.pagination.pages;
    if (Number(num) === numPages)  {
      firstPage = numPages - 2;
      activePage = numPages - 1;
      lastPage = numPages;
    }

    const pagesBlock = document.querySelector('.pages');
    pagesBlock.innerHTML = `
     <a href="?page=${firstPage}" class="pages__link_previous">
       <svg class="pages__image" width="29" height="19" viewBox="0 0 29 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
         <path d="M28.375 7.95833H6.52958L12.0487 2.42375L9.875 0.25L0.625 9.5L9.875 18.75L12.0487 16.5763L6.52958 11.0417H28.375V7.95833Z"/>
       </svg>
     </a>
     <div class="pages__list">
       <a href="?page=${firstPage}" class="pages__link">${firstPage}</a>
       <a href="?page=${activePage}" class="pages__link">${activePage}</a>
       <a href="?page=${lastPage}" class="pages__link">${lastPage}</a>
     </div>
     <a href="?page=${lastPage + 1}" class="pages__link_next pages__link_type_active">
       <svg class="pages__image" width="29" height="19" viewBox="0 0 29 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
         <path d="M0.625 7.95833H22.4704L16.9513 2.42375L19.125 0.25L28.375 9.5L19.125 18.75L16.9513 16.5763L22.4704 11.0417H0.625V7.95833Z"/>
       </svg>
     </a>`;

    const prev = document.querySelector('.pages__link_previous');
    const next = document.querySelector('.pages__link_next');
    const link = document.querySelectorAll('.pages__link');

    if ((num === 1) || (num === '')) {
      prev.classList.add('pages__link_type_disable');
    }

    if (Number(num) === pages2.pagination.pages) {
      console.log('11')
      next.classList.add('pages__link_type_disable');
      next.href = `?page=${lastPage}`;
    }

    link.forEach(item => {
      const str = item.href;
      let id = str.split('=');
      if ((Number(id[1]) === 1) && (num === '')) {
        item.classList.add('pages__link_type_active');
      }
      if (Number(id[1]) === Number(num)) {
        item.classList.add('pages__link_type_active');
      }
    });
  };

  let num = window.location.search.substring(6);

  loadArticles(renderArticles, num);
}
