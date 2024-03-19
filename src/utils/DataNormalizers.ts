import {
  Article,
  NewYorkTimesArticle,
  NewYorkTimesSearchArticle,
  NewsApiArticle,
} from "@/types";

export const normalizeNewsApiData = (data: NewsApiArticle[]): Article[] => {
  const articles = data.map((item) => ({
    title: item.title,
    description: item.description,
    publishDate: item.publishedAt,
    source: item.source.name,
    image: item.urlToImage,
    category: "",
  }));
  return articles;
};

export const normalizeNewYorkTimesData = (
  data: NewYorkTimesArticle[]
): Article[] => {
  const articles = data.map((item) => ({
    title: item.title,
    description: item.abstract,
    publishDate: item.published_date,
    source: item.source,
    image: item.media[0]?.["media-metadata"][2].url ?? "",
    category: item.section,
  }));
  return articles;
};

export const normalizeNewYorkTimesSearchData = (
  data: NewYorkTimesSearchArticle[]
): Article[] => {
  const articles = data.map((item) => ({
    title: item.headline.main,
    description: item.snippet,
    publishDate: item.pub_date,
    source: item.source,
    image: `https://static01.nyt.com/${item.multimedia[0]?.url}`,
    category: item.news_desk,
  }));
  return articles;
};
