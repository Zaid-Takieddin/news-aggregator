import ArticleList from "@/components/Article/List";
import Filter from "@/components/Filter";
import DateSelector from "@/components/Filter/DatePicker";
import { FeedCustomizationContext } from "@/context/feedCustomizationContext";
import { Article, OpenNewsSources } from "@/types";
import { normalizeNewsApiData } from "@/utils/DataNormalizers";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

type Props = {
  openNewsArticles: Article[];
  openNewsSources: OpenNewsSources[];
  openNewsFilteredArticles: Article[];
};

const Homepage = ({
  openNewsArticles,
  openNewsSources,
  openNewsFilteredArticles,
}: Props) => {
  const [showCustomization, setShowCustomization] = useState<boolean>(false);
  const [showCustomArticles, setShowCustomArticles] = useState<boolean>(false);
  const router = useRouter();
  const { date, setDate, setSource, source } = useContext(
    FeedCustomizationContext
  );

  const handleApplyFilter = () => {
    const sourceFilter = source.join(",");
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("sources");
    params.append("sources", sourceFilter);
    params.delete("from");
    params.delete("to");
    params.append("from", dayjs(date).format("YYYY-MM-DD"));
    params.append("to", dayjs().format("YYYY-MM-DD"));
    setShowCustomArticles(true);
    router.replace({
      pathname: url.pathname,
      query: params.toString(),
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-end" },
          justifyContent: "space-between",
          marginX: 5,
          borderBottom: "1px solid",
          paddingBottom: 2,
        }}
      >
        <Typography variant="h4">Latest News</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {showCustomization ? (
            <>
              <Filter
                label="Sources"
                data={openNewsSources.map((source) => ({
                  id: source.id,
                  name: source.name,
                }))}
                value={source}
                setValue={setSource}
              />

              <DateSelector label="Date" value={date} setValue={setDate} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginLeft: 1,
                  width: "95%",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleApplyFilter}
                  disabled={!date || date?.length == 0 || source.length == 0}
                >
                  Apply
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => {
                    router.replace("/homepage");
                    setDate("");
                    setSource([]);
                    setShowCustomArticles(false);
                  }}
                >
                  Clear
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setShowCustomization(false)}
                >
                  Hide
                </Button>
              </Box>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => setShowCustomization(true)}
            >
              Customize Your Feed
            </Button>
          )}
        </Box>
      </Box>
      <ArticleList
        articles={
          showCustomArticles ? openNewsFilteredArticles : openNewsArticles
        }
      />
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const sourcesQuery = context.query.sources as string;
  const fromQuery = context.query.from as string;
  const toQuery = context.query.to as string;

  let openNewsFilteredResponse;
  let openNewsFilteredArticles = {};

  if (sourcesQuery || fromQuery || toQuery) {
    openNewsFilteredResponse = await axios.get(
      `https://newsapi.org/v2/top-headlines?apiKey=180d5ce6f1bd4016ab51a3be9126afe8&sources=${sourcesQuery}&from=${fromQuery}&to=${toQuery}`
    );

    openNewsFilteredArticles = normalizeNewsApiData(
      openNewsFilteredResponse.data.articles
    );
  }

  const openNewsResponse = await axios.get(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=180d5ce6f1bd4016ab51a3be9126afe8"
  );

  const openNewsSourcesResponse = await axios.get(
    "https://newsapi.org/v2/top-headlines/sources?apiKey=180d5ce6f1bd4016ab51a3be9126afe8"
  );

  const openNewsArticles = normalizeNewsApiData(openNewsResponse.data.articles);

  const openNewsSources = openNewsSourcesResponse.data.sources;

  return {
    props: { openNewsArticles, openNewsSources, openNewsFilteredArticles },
  };
}) satisfies GetServerSideProps<{
  openNewsArticles: Article[];
  openNewsSources: OpenNewsSources[];
  openNewsFilteredArticles: Article[] | {};
}>;

export default Homepage;
