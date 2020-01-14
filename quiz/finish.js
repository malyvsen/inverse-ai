function finish() {
  download(JSON.stringify(asked), 'results.json', 'text/plain')

  mainArea().innerHTML = `
  <h1>It's done!</h1>
  <p>Thanks for your time.
  Your results have been downloaded - I'll need you to send them to me to include you in the study.</p>
  `;

  let correctness = asked.map(question => question.correct);
  let accuracy = [];
  correctness.reduce((a, b, id) => accuracy[id] = a + b, 0);
  accuracy = accuracy.map((v, id) => v / (id + 1));
  beatChance = accuracy[accuracy.length - 1] > 1/batchSize;

  if (beatChance) {
    mainArea().innerHTML += `
    <h2>You learned AI-speak!</h2>
    <p>You were better than random guessing. Have a look at your results!</p>
    `;
  } else {
    mainArea().innerHTML += `
    <h2>You didn't learn AI-speak :(</h2>
    <p>That's okay, I still want you in my study. Have a look at your results.</p>
    `;
  }

  mainArea().innerHTML += `<div id="chart" style="width:100%; height:400px;"></div>`;

  accuracyChart(accuracy);
}


function accuracyChart(accuracy) {
  echarts.init(document.getElementById('chart')).setOption({
    legend: {textStyle: {
      color: 'white',
      fontSize: 16
    }},
    xAxis: {
      splitLine: {show: false},
      axisLine: {lineStyle: {color: 'white'}},
      name: 'Question number',
      nameLocation: 'center'
    },
    yAxis: {
      splitLine: {show: false},
      axisLine: {lineStyle: {color: 'white'}}
    },
    series: [{
      name: 'Your accuracy',
      type: 'line',
      data: accuracy.map((v, id) => [id + 1, v])
    }, {
      name: 'Random guessing',
      type: 'line',
      data: accuracy.map((v, id) => [id + 1, 1/batchSize])
    }],
    textStyle: {
      fontFamily: 'Quicksand',
      color: 'white'
    },
    color: ['dodgerblue', 'orange']
  });
}
