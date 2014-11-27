console.log '\nRunning Zombie\n'

async = require 'async'

zombieSeed = require 'zombie'
zombie = new zombieSeed()

bloodyTrail = [


	(step) ->

		console.log 'Going towards smell\n'

		onTheRun = Date.now()
		zombie.visit 'https://news.ycombinator.com/news', (err) ->
			if err then step err
			else step null, zombie.document, onTheRun


	(doc, onTheRun, step) ->

		console.log('\nArrived at ' + (Date.now() - onTheRun)/1000 + 'sec\n')

		titles = doc.querySelectorAll('td.title a')

		titlesStr = ''
		for title, i in titles
			titlesStr += title.innerHTML + '\n'

		step null, titlesStr


	(results, step) ->

		console.log 'Eating.\n'
		step null, results

]

async.waterfall bloodyTrail, (error, results) ->
	if error
		console.log 'Async error:', error
	else
		console.log 'Digestion results:\n', results