import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';

export const ALL_MOVIE_QUERY = gql`
  query allMovie($limit: Int!, $offset: Int!) {
    allMovie(limit: $limit, offset: $offset, sort: { title: ASC }) {
      title
      slug {
        current
      }
      _id
      releaseDate
    }
  }
`;
export const allMovieQueryVars = {
  limit: 10,
  offset: 0,
};

export default function Movies() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_MOVIE_QUERY,
    {
      variables: allMovieQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMoreMovie = networkStatus === NetworkStatus.fetchMore;

  const loadMoreMovie = () => {
    fetchMore({
      variables: {
        offset: allMovie.length,
        limit: 10,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return Object.assign({}, previousResult, {
          // Append the new Movie results to the old one
          allMovie: [...previousResult.allMovie, ...fetchMoreResult.allMovie],
        });
      },
    });
  };

  if (error) return <pre>eRROR LOADING MOVEI</pre>;
  if (loading && !loadingMoreMovie) return <div>Loading</div>;

  const { allMovie } = data;
  // får ikke metadata fra sanity, f.eks totalt antall filmer.
  const areMoreMovie = true;

  return (
    <section>
      <ul>
        {allMovie.map((movie, index) => (
          <li key={movie._id}>
            <div>
              <span>{index + 1}. </span>
              <a href="#">{movie.title}</a>
            </div>
          </li>
        ))}
      </ul>
      {areMoreMovie && (
        <button onClick={() => loadMoreMovie()} disabled={loadingMoreMovie}>
          {loadingMoreMovie ? 'Loading...' : 'Show More'}
        </button>
      )}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  );
}
