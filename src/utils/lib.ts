const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmQyY2FkMDU2ZDc4ZjY4MmQ3NTg4NTZiZTdlNzVhYyIsIm5iZiI6MTc1NjY2MDQ0Ny40NDcsInN1YiI6IjY4YjQ4MmRmOWI4YTg3YWU4YTE1N2VkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qcIrnTnN8my10HYouHG_ByXrygrNVsAMMskzraluqkQ",
  },
};

fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", options)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
