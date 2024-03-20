import {
  Article,
  GNewsArticle,
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
    image:
      item.multimedia[0]?.url === undefined
        ? "/next.svg"
        : `https://static01.nyt.com/${item.multimedia[0]?.url}`,
    category: item.news_desk,
  }));
  return articles;
};

export const normalizeGNewsData = (data: GNewsArticle[]): Article[] => {
  const articles = data.map((item) => ({
    title: item.title,
    description: item.description,
    publishDate: item.publishedAt,
    source: item.source.name,
    image: item.image ?? "",
    category: "",
  }));
  return articles;
};

export const convertToCategoryFilterQuery = (selectedValues: string[]) => {
  let categoryFilter = "";
  if (selectedValues.length > 1) {
    categoryFilter = `news_desk.containes:(${selectedValues
      .map((value) => `"${value.toLowerCase()}"`)
      .join(", ")})`;
  }
  if (selectedValues.length == 1) {
    categoryFilter = `news_desk:(${selectedValues
      .map((value) => `"${value.toLowerCase()}"`)
      .join(", ")})`;
  }

  return categoryFilter;
};

export const convertToSourceFilterQuery = (selectedValues: string[]) => {
  let categoryFilter = "";
  if (selectedValues.length > 1) {
    categoryFilter = `source.containes:(${selectedValues
      .map((value) => `"${value.toLowerCase()}"`)
      .join(", ")})`;
  }
  if (selectedValues.length == 1) {
    categoryFilter = `source:(${selectedValues
      .map((value) => `"${value.toLowerCase()}"`)
      .join(", ")})`;
  }

  return categoryFilter;
};
