import ArticleCard from "./Card";
import { useState, useEffect } from "react";

type Props = {
  articles: Articles;
};

export type Articles = {
  status: string;
  totalResutl: number;
  articles: Article[];
};
export type Article = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
};

const ArticleList = ({ articles: articelsResult }: Props) => {
  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    if (articelsResult.status === "ok") setArticles(articelsResult.articles);
  }, []);

  return (
    <div>
      {articles?.map((article, idx) => (
        <ArticleCard key={idx} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
