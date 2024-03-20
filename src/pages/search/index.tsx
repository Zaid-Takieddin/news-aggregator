import ArticleList from "@/components/Article/List";
import Filter from "@/components/Filter";
import { SearchFilterContext } from "@/context/searchFilterContext";
import { Article } from "@/types";
import {
  convertToCategoryFilterQuery,
  convertToSourceFilterQuery,
  normalizeNewYorkTimesSearchData,
} from "@/utils/DataNormalizers";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

type Props = {
  newYorkTimesArticles: Article[];
};

const SearchPage = ({ newYorkTimesArticles }: Props) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const router = useRouter();

  const { category, setCategory, setSource, source } =
    useContext(SearchFilterContext);

  const handleApplyFilter = () => {
    const categoryFilter = convertToCategoryFilterQuery(category);
    const sourceFilter = convertToSourceFilterQuery(source);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (categoryFilter && sourceFilter) {
      params.delete("fq");
      params.append("fq", `${categoryFilter} AND ${sourceFilter}`);
    } else if (categoryFilter) {
      params.delete("fq");
      params.append("fq", categoryFilter);
    } else if (sourceFilter) {
      params.delete("fq");
      params.append("fq", sourceFilter);
    }

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
        }}
      >
        <Typography variant="h4">Search Results</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {showFilter ? (
            <>
              <Filter
                label="Sources"
                data={["Open News", "The New York Times"]}
                value={source}
                setValue={setSource}
              />
              <Filter
                label="Category"
                data={[
                  "Adventure Sports",
                  "Arts & Leisure",
                  "Arts",
                  "Automobiles",
                  "Blogs",
                  "Books",
                  "Booming",
                  "Business Day",
                  "Business",
                  "Cars",
                  "Circuits",
                  "Classifieds",
                  "Connecticut",
                  "Crosswords & Games",
                  "Culture",
                  "DealBook",
                  "Dining",
                  "Editorial",
                  "Education",
                  "Energy",
                  "Entrepreneurs",
                  "Environment",
                  "Escapes",
                  "Fashion & Style",
                  "Fashion",
                  "Favorites",
                  "Financial",
                  "Flight",
                  "Food",
                  "Foreign",
                  "Generations",
                  "Giving",
                  "Global Home",
                  "Health & Fitness",
                  "Health",
                  "Home & Garden",
                  "Home",
                  "Jobs",
                  "Key",
                  "Letters",
                  "Long Island",
                  "Magazine",
                  "Market Place",
                  "Media",
                  "Men's Health",
                  "Metro",
                  "Metropolitan",
                  "Movies",
                  "Museums",
                  "National",
                  "Nesting",
                  "Obits",
                  "Obituaries",
                  "Obituary",
                  "OpEd",
                  "Opinion",
                  "Outlook",
                  "Personal Investing",
                  "Personal Tech",
                  "Play",
                  "Politics",
                  "Regionals",
                  "Retail",
                  "Retirement",
                  "Science",
                  "Small Business",
                  "Society",
                  "Sports",
                  "Style",
                  "Sunday Business",
                  "Sunday Review",
                  "Sunday Styles",
                  "T Magazine",
                  "T Style",
                  "Technology",
                  "Teens",
                  "Television",
                  "The Arts",
                  "The Business of Green",
                  "The City Desk",
                  "The City",
                  "The Marathon",
                  "The Millennium",
                  "The Natural World",
                  "The Upshot",
                  "The Weekend",
                  "The Year in Pictures",
                  "Theater",
                  "Then & Now",
                  "Thursday Styles",
                  "Times Topics",
                  "Travel",
                  "U.S.",
                  "Universal",
                  "Upshot",
                  "UrbanEye",
                  "Vacation",
                  "Washington",
                  "Wealth",
                  "Weather",
                  "Week in Review",
                  "Week",
                  "Weekend",
                  "Westchester",
                  "Wireless Living",
                  "Women's Health",
                  "Working",
                  "Workplace",
                  "World",
                  "Your Money",
                ]}
                value={category}
                setValue={setCategory}
              />
              {/* <Filter label="Date" data={["Open News", "New York Times"]} /> */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginLeft: 1,
                  width: "95%",
                }}
              >
                <Button variant="contained" onClick={handleApplyFilter}>
                  Apply Filters
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setShowFilter(false)}
                >
                  Hide Filters
                </Button>
              </Box>
            </>
          ) : (
            <Button variant="contained" onClick={() => setShowFilter(true)}>
              Show Filters
            </Button>
          )}
        </Box>
      </Box>
      <ArticleList title={"Search Results"} articles={newYorkTimesArticles} />
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const searchQuery = context.query.q as string;
  const filterQuery = context.query.fq as string;

  const newYorkTimesResponse = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&fq=${filterQuery}&api-key=8Af3wNwCKq5QdIrYh8QD79ismW98O8kr`
  );

  const newYorkTimesArticles = normalizeNewYorkTimesSearchData(
    newYorkTimesResponse.data.response.docs
  );

  return { props: { newYorkTimesArticles } };
}) satisfies GetServerSideProps<{
  newYorkTimesArticles: Article[];
}>;

export default SearchPage;
