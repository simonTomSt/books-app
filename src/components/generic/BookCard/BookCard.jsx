import React from 'react';
import './BookCard.scss';
import sample from './sample.png';
const BookCard = ({ info, forwardRef }) => {
  // console.log(info);
  const {
    title,
    authors,
    description,
    language,
    publishedDate,
    imageLinks,
    previewLink,
    printType,
    publisher,
    categories,
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
    <article className="book" ref={forwardRef}>
      <div className="book__content">
        <h3 className="book__title">{title && title}</h3>{' '}
        {authors && (
          <p className="book__infor">
            <span> {authors.length > 1 ? 'Authors: ' : 'Author: '} </span>
            {authors.join(', ')}
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
        {printType && (
          <p className="book__info">
            <span>Type: </span> {printType.toLowerCase()}{' '}
          </p>
        )}
        {publisher && (
          <p className="book__info">
            <span>Publisher: </span> {publisher}{' '}
          </p>
        )}
        {description && (
          <p className="book__description">
            {' '}
            <span>Description:</span> {cutDescription()}
          </p>
        )}
        {previewLink && (
          <a href={previewLink} target="_blank" rel="noopener noreferrer">
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
