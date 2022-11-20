'use strict';

{
  const loadArticle = async (id) => {
    const pathArticle = await fetch( `https://gorest.co.in/public-api/posts/${id}`);
    const pathAuthor = await fetch( `https://gorest.co.in/public-api/users/${id}`);

    const dataArticle = await pathArticle.json();
    const dataAuthor = await pathAuthor.json();

    // console.log(data);
    const navigationItem = document.querySelector('.navigation__item');
    const articleTitle = document.querySelector('.article__title');
    const articleText = document.querySelector('.article__text');

    const blockAuthor = document.querySelector('.author');
    const blockEmail = document.querySelector('.email');

    const article = dataArticle.data
    const author = dataAuthor.data;

    navigationItem.innerHTML = article.title;
    articleTitle.innerHTML = article.title;
    articleText.innerHTML = article.body;

    blockAuthor.innerHTML = author.name;
    blockEmail.innerHTML = author.email;

  };

  let num = window.location.search.substring(4);
  loadArticle(num);

  const learnPreviousPage = () => {
    const link = document.querySelector('.article__back');
    const navigationLinkLast = document.querySelector('.navigation__link_last');
    const previousUrl = document.referrer;

    link.href = previousUrl;
    navigationLinkLast.href = previousUrl;
  }

  learnPreviousPage();
}
