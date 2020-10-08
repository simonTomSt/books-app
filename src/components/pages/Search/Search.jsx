import { Field, Form, Formik } from 'formik';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import BookCard from '../../generic/BookCard/BookCard';
import Loader from '../../generic/Loader/Loader';
import './Search.scss';
import useBookSearch from '../../../hooks/useBookSearch';

const Search = () => {
  const [title, setTitle] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [langRestrict, setLangRestrict] = useState('');
  const [printType, setPrintType] = useState('all');
  const [query, setQuery] = useState('');
  const [queryParams, setQueryParams] = useState({
    inauthor: '',
    inpublisher: '',
  });
  const { loading, books, error, hasMore, empty } = useBookSearch(
    query,
    title,
    pageNumber,
    langRestrict,
    printType
  );

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const { inauthor, subject, inpublisher } = queryParams;
    const checkParam = (type, param) => {
      if (param.length > 0 && param) {
        return `+${type}:"${param}"`;
      } else {
        return '';
      }
    };
    setQuery(
      `"${title}"${checkParam('inauthor', inauthor)}${checkParam(
        'inpublisher',
        inpublisher
      )}`
    );
  }, [title, queryParams.inauthor, queryParams.inpublisher]);

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
            inauthor: '',
            langRestrict: '',
            printType: 'all',

            inpublisher: '',
          }}
          onSubmit={(values) => {
            setLangRestrict(values.langRestrict);
            setPrintType(values.printType);
            setQueryParams({
              inauthor: values.inauthor,

              inpublisher: values.inpublisher,
            });
          }}
        >
          <Form className="search__settings ">
            <label>
              Author:
              <Field name="inauthor" />
            </label>
            <label>
              Language:
              <Field name="langRestrict" />
            </label>
            <label>
              Select type of printing:
              <Field as="select" name="printType">
                <option value="all" label="all" />
                <option value="books" label="books" />
                <option value="magazines" label="magazines" />
              </Field>
            </label>

            <label>
              Publisher:
              <Field name="inpublisher" />
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
          {empty && <p> No results.</p>}
        </ul>
      </section>
    </section>
  );
};

export default Search;
