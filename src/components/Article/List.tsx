import { Box, Grid } from "@mui/material";
import ArticleCard from "./Card";
import { Article } from "@/types";

type Props = {
  articles: Article[];
  title?: string;
};

const ArticleList = ({ articles }: Props) => {
  return (
    <Box sx={{ padding: 5 }}>
      <Grid container spacing={2} alignItems="stretch">
        {articles.length > 0
          ? articles.map(
              (article, idx) =>
                article.title !== "[Removed]" && (
                  <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                    <ArticleCard article={article} />
                  </Grid>
                )
            )
          : "No Results Found"}
      </Grid>
    </Box>
  );
};

export default ArticleList;
