var async, bloodyTrail, zombie, zombieSeed;

console.log('\nRunning Zombie\n');

async = require('async');

zombieSeed = require('zombie');

zombie = new zombieSeed();

bloodyTrail = [
  function(step) {
    var onTheRun;
    console.log('Going towards smell\n');
    onTheRun = Date.now();
    return zombie.visit('https://news.ycombinator.com/news', function(err) {
      if (err) {
        return step(err);
      } else {
        return step(null, zombie.document, onTheRun);
      }
    });
  }, function(doc, onTheRun, step) {
    var i, title, titles, titlesStr, _i, _len;
    console.log('\nArrived at ' + (Date.now() - onTheRun) / 1000 + 'sec\n');
    titles = doc.querySelectorAll('td.title a');
    titlesStr = '';
    for (i = _i = 0, _len = titles.length; _i < _len; i = ++_i) {
      title = titles[i];
      titlesStr += i + ') ' + title.innerHTML + '\n';
    }
    return step(null, titlesStr);
  }, function(results, step) {
    console.log('Eating.\n');
    return step(null, results);
  }
];

async.waterfall(bloodyTrail, function(error, results) {
  if (error) {
    return console.log('Async error:', error);
  } else {
    return console.log('Digestion results:\n', results);
  }
});
