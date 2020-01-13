var movies = [];
var toAsk = [];
var asked = [];


(() => {
  function onComplete(results, file) {
    movies = results.data.slice(0, -1).map((movie, id) => ({
      id: id,
      title: movie.title,
      plot: movie.plot,
      img: '../ai/generated/' + id + '.png'})
    );
    movies = chance.shuffle(movies);

    let batches = [];
    let batchSize = 4;
    for (let i = 0; i < movies.length / batchSize; i += batchSize) {
      batches.push(movies.slice(i, i + 4));
    }

    toAsk = batches.map(batch => {return {options: batch, target: chance.pickone(batch)}});
  }

  let movieFile = 'https://raw.githubusercontent.com/malyvsen/inverse-ai/master/ai/movies/processed.csv';
  Papa.parse(movieFile, {download: true, header: true, complete: onComplete});
})();
