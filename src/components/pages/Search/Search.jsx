import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import BookCard from '../../generic/BookCard/BookCard';
import Loader from '../../generic/Loader/Loader';
import './Search.scss';

const Search = () => {
  const [loader, setLoader] = useState(false);
  let [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [filters, setFilters] = useState({
    author: '',
    pubDate: '',
    language: '',
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(
          `https://www.googleapis.com/books/v1/volumes?q=${title}`
        );
        setLoader(false);
        setData([...response.data.items]);
      } catch (error) {
        console.log(error);
      }
    }
    if (title.length > 0) {
      fetchData();
    }
  }, [title]);

  return (
    <section className="search">
      <div className="search__header">
        <h2 className="search__title"> Search for your book!</h2>
        <Formik
          initialValues={{ title: '' }}
          onSubmit={(values) => {
            if (values.title !== title) {
              setLoader(true);
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
      <div className="search__filters">
        <Formik
          initialValues={{
            intitle: '',
            inauthor: '',
            inpublisher: '',
            langRestrict: '',
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form className="filters__form">
            <label>
              Title:
              <Field name="intitle" />
            </label>
            <label>
              Author:
              <Field name="inauthor" />
            </label>
            <label>
              Year of publication:
              <Field name="inpublisher" />
            </label>
            <label>
              Language:
              <Field name="langRestrict" />
            </label>
            <button className="search__btn" type="submit">
              Filtruj
            </button>
          </Form>
        </Formik>
      </div>
      <section className="search__results">
        {loader ? (
          <Loader />
        ) : (
          <ul className="search__list container">
            {data.length > 0 &&
              data.map(({ id, volumeInfo }) => (
                <BookCard key={id} info={volumeInfo} />
              ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default Search;
