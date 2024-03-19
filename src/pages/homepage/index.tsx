import ArticleList from "@/components/Article/List";
import { Article } from "@/types";
import { Container, Typography } from "@mui/material";

type Props = {
  openNewsaArticles: Article[];
  newYorkTimesArticles: Article[];
};

const Homepage = ({ openNewsaArticles, newYorkTimesArticles }: Props) => {
  return (
    <>
      <Typography marginLeft={5} marginBottom={-4} variant="h4">
        Latest News
      </Typography>
      <ArticleList articles={openNewsaArticles.concat(newYorkTimesArticles)} />
    </>
  );
};

export default Homepage;
