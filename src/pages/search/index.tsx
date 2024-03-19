import ArticleList from "@/components/Article/List";
import { Article } from "@/types";
import {
  normalizeNewYorkTimesSearchData,
  normalizeNewsApiData,
} from "@/utils/DataNormalizers";
import { Typography } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";

type Props = {
  openNewsaArticles: Article[];
  newYorkTimesArticles: Article[];
};

const SearchPage = ({ openNewsaArticles, newYorkTimesArticles }: Props) => {
  return (
    <>
      <Typography marginLeft={5} marginBottom={-4} variant="h4">
        Latest News
      </Typography>
      <ArticleList
        title={"Search Results"}
        articles={openNewsaArticles.concat(newYorkTimesArticles)}
      />
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const searchQuery = context.query.q as string;

  const openNewsResponse = await axios.get(
    `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=180d5ce6f1bd4016ab51a3be9126afe8`
  );
  const newYorkTimesResponse = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=8Af3wNwCKq5QdIrYh8QD79ismW98O8kr`
  );
  const openNewsaArticles = normalizeNewsApiData(
    openNewsResponse.data.articles
  );

  const newYorkTimesArticles = normalizeNewYorkTimesSearchData(
    newYorkTimesResponse.data.response.docs
  );

  return { props: { openNewsaArticles, newYorkTimesArticles } };
}) satisfies GetServerSideProps<{
  openNewsaArticles: Article[];
  newYorkTimesArticles: Article[];
}>;

export default SearchPage;
