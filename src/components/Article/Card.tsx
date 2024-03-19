import { Article } from "@/types";
import { formatDate } from "@/utils/DateFormatter";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

type Props = {
  article: Article;
};

const ArticleCard = ({ article }: Props) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={article.image || "/next.svg"}
        alt={article.title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          letterSpacing=".1px"
          lineHeight="25px"
        >
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Button variant="outlined" size="small">
          Read More
        </Button>
        <Typography variant="caption" color="text.secondary">
          {formatDate(article.publishDate)}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
