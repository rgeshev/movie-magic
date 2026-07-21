import movieRepository from "../repositories/movieRepository.js";

function getAll(filter = {}) {
  return movieRepository.getAll(filter);
}

function getById(movieId) {
  const id = Number(movieId);

  return movieRepository.getById(id);
}

function create(movieData, userId) {
  // movieData.rating = Number(movieData.rating);
  // movieData.year = Number(movieData.year);
  movieData.userId = userId;

  return movieRepository.create(movieData);
}

async function attachArtist(movieId, artistId) {
  const movieIdNumber = Number(movieId);
  const artistIdNumber = Number(artistId);

  const result = await movieRepository.attachArtist(
    movieIdNumber,
    artistIdNumber,
  );

  return result;
}

async function remove(movieId, userId) {
  const movie = await movieRepository.getById(movieId);

  if (!movie) {
    throw new Error("Movie not found");
  }

  if (movie.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return await movieRepository.remove(movieId);
}

export async function edit(movieId, movieData, userId) {
  movieData.rating = Number(movieData.rating);
  movieData.year = Number(movieData.year);
  movieData.userId = userId;
  
  await movieRepository.edit(movieId, movieData, userId);
}

const movieService = {
  getAll,
  create,
  getById,
  attachArtist,
  remove,
  edit,
};

export default movieService;
