import axios from 'axios';
import { useEffect, useState } from 'react';

const useBookSearch = (query, title, startIndex, langRestrict, printType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query, langRestrict, printType]);

  useEffect(() => {
    async function fetchData() {
      setEmpty(false);
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=${printType}&langRestrict=${langRestrict}&startIndex=${startIndex}`
        );
        if (!response.data) {
          setBooks([]);
        } else if (
          response.data.items.length > 0 &&
          response.data.items.length
        ) {
          setBooks((prevBooks) => [
            ...new Set([...prevBooks, ...response.data.items]),
          ]);
        }
        setHasMore(response.data.items.length >= 10);

        setLoading(false);
      } catch (error) {
        if (error.message === "Cannot read property 'length' of undefined") {
          setLoading(false);
          setEmpty(true);
          return;
        }
        setError(true);
      }
    }
    if (title.length > 0) {
      fetchData();
    }
  }, [query, startIndex, langRestrict, printType]);
  return {
    loading,
    books,
    error,
    hasMore,
    empty,
  };
};

export default useBookSearch;
