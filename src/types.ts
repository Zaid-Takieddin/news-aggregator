export interface Article {
  title: string;
  description: string;
  publishDate: string;
  source: string;
  category: string;
  image: string;
}

export interface NewsApiArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface NewYorkTimesArticle {
  uri: string;
  url: string;
  id: number;
  asset_id: number;
  source: string;
  published_date: string;
  updated: string;
  section: string;
  subsection: string;
  nytdsection: string;
  adx_keywords: string;
  column: boolean;
  byline: string;
  type: string;
  title: string;
  abstract: string;
  des_facet: string[];
  org_facetstring: [];
  per_facet: string[];
  geo_facet: string[];
  media: {
    "media-metadata": { url: string }[];
  }[];
  eta_id: number;
}

export interface NewYorkTimesSearchArticle {
  abstract: string;
  byline: {
    original: string;
    organization: string;
    preson: {
      firstname: string;
      lastname: string;
      middlename: string;
      organization: string;
      qualifier: string;
      rank: number;
      role: string;
      title: string;
    }[];
  };
  document_type: string;
  headline: { main: string };
  keywords: [];
  lead_paragraph: string;
  multimedia: { url: string }[];
  news_desk: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
}

export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface SearchFilter {
  source: string[];
  category: string[];
}
