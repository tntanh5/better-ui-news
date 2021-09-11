import { gql } from "apollo-angular";

export const GET_ARTICLES = gql`
  query GetArticles($pageNumber: Int) {
    articles(pageNumber: $pageNumber) {
      title
      description
      subtitle
      url
    }
  }
`;

export const GET_ONE_ARTICLE = gql`
  query GetOneArticle($url: String!) {
    article(url: $url) {
      title
      coverImageUrl
      content
      description
      subtitle
      url
    }
  }
`;