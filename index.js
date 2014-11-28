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
    var host, i, news, points, title, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    console.log('\nArrived at ' + (Date.now() - onTheRun) / 1000 + 'sec\n');
    news = [];
    _ref = doc.querySelectorAll('td.title a');
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      title = _ref[i];
      if (title.innerHTML !== 'More') {
        news[i] = {
          title: title.innerHTML,
          link: title.href
        };
      }
    }
    _ref1 = doc.querySelectorAll('td.subtext span[id^="score"]');
    for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
      points = _ref1[i];
      news[i].points = points.innerHTML.split(' ')[0];
    }
    _ref2 = doc.querySelectorAll('td.title .comhead');
    for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
      host = _ref2[i];
      host = host.innerHTML.trim().replace(/\(|\)/g, '');
      news[i].host = host.charAt(0).toUpperCase() + host.slice(1);
    }
    return step(null, news);
  }, function(results, step) {
    console.log('Eating.\n');
    return step(null, results);
  }
];

async.waterfall(bloodyTrail, function(error, results) {
  var feed, _i, _len, _results;
  if (error) {
    return console.log('Async error:', error);
  } else {
    console.log('Digestion results:\n');
    results.sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      feed = results[_i];
      _results.push(console.log(feed.host + ': \n' + feed.title + ' // +' + feed.points + '\n' + feed.link + '\n'));
    }
    return _results;
  }
});
