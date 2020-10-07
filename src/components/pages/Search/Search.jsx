import { Field, Form, Formik } from 'formik';
import React, { useRef, useState, useCallback } from 'react';
import BookCard from '../../generic/BookCard/BookCard';
import Loader from '../../generic/Loader/Loader';
import './Search.scss';
import useBookSearch from '../../../hooks/useBookSearch';

const Search = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [title, setTitle] = useState('');
  const [filters, setFilters] = useState({
    author: '',
    pubDate: '',
    language: '',
  });
  const { loading, books, error, hasMore } = useBookSearch(title, pageNumber);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 11);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const filterResults = (filters) => {};

  return (
    <section className="search">
      <div className="search__header">
        <h2 className="search__title"> Search for your book!</h2>
        <Formik
          initialValues={{ title: '' }}
          onSubmit={(values) => {
            if (values.title !== title) {
              setTitle(values.title);
            }
          }}
        >
          <Form className="search__browser">
            <Field name="title" placeholder="Type the book title" />
            <button className="search__btn" type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
      <aside className="filters ">
        <h2 className="filters__header">Filters</h2>
        <Formik
          initialValues={{
            authors: '',
            language: '',
            publishedDate: '',
            categories: '',
          }}
          onSubmit={(values) => filterResults(values)}
        >
          <Form className="search__settings ">
            <label>
              Authors:
              <Field name="authors" />
            </label>
            <label>
              Language:
              <Field name="language" />
            </label>
            <label>
              Date of publication:
              <Field name="publishedDate" type="date" />
            </label>
            <label>
              Category:
              <Field name="categories" />
            </label>
            <button className="search__btn" type="submit">
              Filter
            </button>
          </Form>
        </Formik>
      </aside>
      <section className="search__results">
        <ul className="search__list container">
          {books.map(({ id, volumeInfo }, index) => {
            if (books.length === index + 1) {
              return (
                <BookCard
                  key={id}
                  info={volumeInfo}
                  forwardRef={lastElementRef}
                />
              );
            } else {
              return <BookCard key={id} info={volumeInfo} />;
            }
          })}
          {loading && <Loader />}
          {error && (
            <p style={{ color: 'red' }}>
              {' '}
              Sorry smoething went wrong! Try again!
            </p>
          )}
        </ul>
      </section>
    </section>
  );
};

export default Search;
