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
    } else {
      params.delete("fq");
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
                data={[
                  { id: "open news", name: "Open News" },
                  { id: "the new york times", name: "The New York Times" },
                ]}
                value={source}
                setValue={setSource}
              />
              <Filter
                label="Category"
                data={[
                  { id: "adventure sports", name: "Adventure Sports" },
                  { id: "arts & leisure", name: "Arts & Leisure" },
                  { id: "arts", name: "Arts" },
                  { id: "automobiles", name: "Automobiles" },
                  { id: "blogs", name: "Blogs" },
                  { id: "books", name: "Books" },
                  { id: "booming", name: "Booming" },
                  { id: "business day", name: "Business Day" },
                  { id: "business", name: "Business" },
                  { id: "cars", name: "Cars" },
                  { id: "circuits", name: "Circuits" },
                  { id: "classifieds", name: "Classifieds" },
                  { id: "connecticut", name: "Connecticut" },
                  { id: "crosswords & games", name: "Crosswords & Games" },
                  { id: "culture", name: "Culture" },
                  { id: "dealbook", name: "DealBook" },
                  { id: "dining", name: "Dining" },
                  { id: "editorial", name: "Editorial" },
                  { id: "education", name: "Education" },
                  { id: "energy", name: "Energy" },
                  { id: "entrepreneurs", name: "Entrepreneurs" },
                  { id: "environment", name: "Environment" },
                  { id: "escapes", name: "Escapes" },
                  { id: "fashion & style", name: "Fashion & Style" },
                  { id: "fashion", name: "Fashion" },
                  { id: "favorites", name: "Favorites" },
                  { id: "financial", name: "Financial" },
                  { id: "flight", name: "Flight" },
                  { id: "food", name: "Food" },
                  { id: "foreign", name: "Foreign" },
                  { id: "generations", name: "Generations" },
                  { id: "giving", name: "Giving" },
                  { id: "global home", name: "Global Home" },
                  { id: "health & fitness", name: "Health & Fitness" },
                  { id: "health", name: "Health" },
                  { id: "home & garden", name: "Home & Garden" },
                  { id: "home", name: "Home" },
                  { id: "jobs", name: "Jobs" },
                  { id: "key", name: "Key" },
                  { id: "letters", name: "Letters" },
                  { id: "long island", name: "Long Island" },
                  { id: "magazine", name: "Magazine" },
                  { id: "market place", name: "Market Place" },
                  { id: "media", name: "Media" },
                  { id: "men's health", name: "Men's Health" },
                  { id: "metro", name: "Metro" },
                  { id: "metropolitan", name: "Metropolitan" },
                  { id: "movies", name: "Movies" },
                  { id: "museums", name: "Museums" },
                  { id: "national", name: "National" },
                  { id: "nesting", name: "Nesting" },
                  { id: "obits", name: "Obits" },
                  { id: "obituaries", name: "Obituaries" },
                  { id: "obituary", name: "Obituary" },
                  { id: "oped", name: "OpEd" },
                  { id: "opinion", name: "Opinion" },
                  { id: "outlook", name: "Outlook" },
                  { id: "personal investing", name: "Personal Investing" },
                  { id: "personal tech", name: "Personal Tech" },
                  { id: "play", name: "Play" },
                  { id: "politics", name: "Politics" },
                  { id: "regionals", name: "Regionals" },
                  { id: "retail", name: "Retail" },
                  { id: "retirement", name: "Retirement" },
                  { id: "science", name: "Science" },
                  { id: "small business", name: "Small Business" },
                  { id: "society", name: "Society" },
                  { id: "sports", name: "Sports" },
                  { id: "style", name: "Style" },
                  { id: "sunday business", name: "Sunday Business" },
                  { id: "sunday review", name: "Sunday Review" },
                  { id: "sunday styles", name: "Sunday Styles" },
                  { id: "t magazine", name: "T Magazine" },
                  { id: "t style", name: "T Style" },
                  { id: "technology", name: "Technology" },
                  { id: "teens", name: "Teens" },
                  { id: "television", name: "Television" },
                  { id: "the arts", name: "The Arts" },
                  {
                    id: "the business of green",
                    name: "The Business of Green",
                  },
                  { id: "the city desk", name: "The City Desk" },
                  { id: "the city", name: "The City" },
                  { id: "the marathon", name: "The Marathon" },
                  { id: "the millennium", name: "The Millennium" },
                  { id: "the natural world", name: "The Natural World" },
                  { id: "the upshot", name: "The Upshot" },
                  { id: "the weekend", name: "The Weekend" },
                  { id: "the year in pictures", name: "The Year in Pictures" },
                  { id: "theater", name: "Theater" },
                  { id: "then & now", name: "Then & Now" },
                  { id: "thursday styles", name: "Thursday Styles" },
                  { id: "times topics", name: "Times Topics" },
                  { id: "travel", name: "Travel" },
                  { id: "u.s.", name: "U.S." },
                  { id: "universal", name: "Universal" },
                  { id: "upshot", name: "Upshot" },
                  { id: "urbaneye", name: "UrbanEye" },
                  { id: "vacation", name: "Vacation" },
                  { id: "washington", name: "Washington" },
                  { id: "wealth", name: "Wealth" },
                  { id: "weather", name: "Weather" },
                  { id: "week in review", name: "Week in Review" },
                  { id: "week", name: "Week" },
                  { id: "weekend", name: "Weekend" },
                  { id: "westchester", name: "Westchester" },
                  { id: "wireless living", name: "Wireless Living" },
                  { id: "women's health", name: "Women's Health" },
                  { id: "working", name: "Working" },
                  { id: "workplace", name: "Workplace" },
                  { id: "world", name: "World" },
                  { id: "your money", name: "Your Money" },
                ]}
                value={category}
                setValue={setCategory}
              />

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
