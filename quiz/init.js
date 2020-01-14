const batchSize = 4;

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
    for (let i = 0; i < movies.length; i += batchSize) {
      batches.push(movies.slice(i, i + batchSize));
    }

    toAsk = batches.map(batch => {return {options: batch, target: chance.pickone(batch)}});
  }

  let movieFile = 'https://raw.githubusercontent.com/malyvsen/inverse-ai/master/ai/movies/processed.csv';
  Papa.parse(movieFile, {download: true, header: true, complete: onComplete});
})();
