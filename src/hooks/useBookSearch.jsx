import axios from 'axios';
import { useEffect, useState } from 'react';

const useBookSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios({
          method: 'GET',
          url: `https://www.googleapis.com/books/v1/volumes`,
          params: { q: query, startIndex: pageNumber },
        });

        setBooks((prevBooks) => [
          ...new Set([...prevBooks, ...response.data.items]),
        ]);
        setHasMore(response.data.items.length > 0);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }
    if (query.length > 0) {
      fetchData();
    }
  }, [query, pageNumber]);
  return { loading, books, error, hasMore };
};

export default useBookSearch;
