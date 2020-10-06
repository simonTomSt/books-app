import React from 'react';
import './BookCard.scss';
import sample from './sample.png';
const BookCard = ({ info }) => {
  console.log(info);
  const {
    title,
    authors,
    description,
    language,
    publishedDate,
    imageLinks,
    pageCount,
    previewLink,
  } = info;
  const charLimit = 40;

  const cutDescription = () => {
    const words = description.split(' ');
    if (words.length < charLimit) {
      return description;
    } else {
      return words.slice(0, charLimit).join(' ') + ' [...]';
    }
  };
  return (
    <article className="book">
      <div className="book__content">
        <h3 className="book__title">{title}</h3>{' '}
        {authors && (
          <p className="ook__infor">
            <span> {authors.length > 1 ? 'Authors: ' : 'Author: '} </span>
            {authors}
          </p>
        )}
        {publishedDate && (
          <p className="book__info">
            <span> Date of publication:</span> {publishedDate}{' '}
          </p>
        )}
        {language && (
          <p className="book__dinfo">
            {' '}
            <span>Language:</span> {language}{' '}
          </p>
        )}
        {pageCount && (
          <p className="book__info">
            <span>Number of pages: </span> {pageCount}{' '}
          </p>
        )}
        {description && (
          <p className="book__description">
            {' '}
            <span>Description:</span> {cutDescription()}
          </p>
        )}
        {previewLink && (
          <a href={previewLink}>
            <button className="book__btn">See more</button>
          </a>
        )}
      </div>
      <img
        src={imageLinks ? imageLinks.smallThumbnail : sample}
        alt="book"
        className="book__img"
      />
    </article>
  );
};

export default BookCard;
