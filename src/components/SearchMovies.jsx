import React, { useState } from "react";
import MovieCard from "./MovieCard";

const SearchMovies = () => {
  // states - input query, movies

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("submit");

    const url = `https://api.themoviedb.org/3/search/movie?api_key=a19d585cfed78d15fd2d843ee8012d3e&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie name
        </label>
        <input
          type="text"
          className="input"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="i.e. Harry Potter"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      <div className="card-list">
        {movies.filter(movie => movie.poster_path).map(movie => (
            <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default SearchMovies;
