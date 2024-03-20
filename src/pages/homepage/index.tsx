import ArticleList from "@/components/Article/List";
import { Article } from "@/types";
import { Container, Typography } from "@mui/material";

type Props = {
  openNewsaArticles: Article[];
  // newYorkTimesArticles: Article[];
  // gNewsArticles: Article[];
};

const Homepage = ({
  openNewsaArticles,
}: // newYorkTimesArticles,
// gNewsArticles,
Props) => {
  return (
    <>
      <Typography marginLeft={5} marginBottom={-4} variant="h4">
        Latest News
      </Typography>
      <ArticleList
        articles={
          openNewsaArticles
          /*.concat(newYorkTimesArticles)*/
          /*.concat(gNewsArticles)*/
        }
      />
    </>
  );
};

export default Homepage;
