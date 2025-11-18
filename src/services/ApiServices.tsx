import axios from "axios";
import { GNEWS_API_KEY, NEWS_API_KEY } from "./Appconstant";


export async function fetchNews(query) {
  if (!query) return { data: [], error: null };

  const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&apiKey=${NEWS_API_KEY}&pageSize=15`;

  try {
    const res = await axios.get(newsApiUrl);
    const articles = res.data.articles.map((item) => ({
      title: item.title,
      description: item.description,
      source: { name: item.source?.name || "" },
      publishedAt: item.publishedAt,
      urlToImage: item.urlToImage,
      url: item.url,
    }));
    return { data: articles, error: null };
  } catch (err) {}

  const gnewsUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    query
  )}&token=${GNEWS_API_KEY}&lang=en&max=15`;

  try {
    const res = await axios.get(gnewsUrl);
    const articles = res.data.articles.map((item) => ({
      title: item.title,
      description: item.description,
      source: { name: item.source?.name },
      publishedAt: item.publishedAt,
      urlToImage: item.image,
      url: item.url,
    }));
    return { data: articles, error: null };
  } catch (err) {
    return { data: [], error: "Network error" };
  }
}
