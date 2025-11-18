import { useEffect, useState, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import { loadCache, saveCache } from "../utils/storage";
import { fetchNews } from "../services/ApiServices";
import { debounce } from "../utils/debounce";

export default function useNewsSearch() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchNews = async (text) => {
    if (!text) {
      setArticles([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    const net = await NetInfo.fetch();

    if (!net.isConnected) {
      const cached = await loadCache(text);
      setArticles(cached);
      setLoading(false);
      setError("Offline mode — showing cached results");
      return;
    }

    const { data, error } = await fetchNews(text);

    if (error) {
      setError(error);
    } else {
      setArticles(data);
      saveCache(text, data);
    }

    setLoading(false);
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      searchNews(text);
    }, 400),
    []
  );

  useEffect(() => {
    if (query.length > 1) {
      debouncedSearch(query);
    } else {
      setArticles([]);
      setError("");
    }
  }, [query]);

  return { query, setQuery, articles, loading, error };
}
