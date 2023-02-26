import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies(),
    count: 9,
  };

  handleDelete = (movie) => {
    // filtering the chosen movie out
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    this.handleCount();
  };

  handleCount = () => {
    this.setState({ count: this.state.count - 1 });
  };

  aboveMessage = () => {
    if (this.state.count === 0)
      return <td>There is no movies in the database</td>;

    return <td>Showing {this.state.count} movies in the database</td>;
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        <table className="table">
          <thead>
            <tr>{this.aboveMessage()}</tr>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      this.handleDelete(movie);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
