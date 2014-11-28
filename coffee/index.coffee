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

		news = []

		for title, i in doc.querySelectorAll('td.title a')
			unless title.innerHTML is 'More' then news[i] =
				title: title.innerHTML
				link: title.href

		for points, i in doc.querySelectorAll('td.subtext span[id^="score"]')
			news[i].points = points.innerHTML.split(' ')[0]

		for host, i in doc.querySelectorAll('td.title .comhead')
			host = host.innerHTML.trim().replace(/\(|\)/g, '')
			news[i].host = host.charAt(0).toUpperCase() + host.slice(1)

		step null, news

	(results, step) ->

		console.log 'Eating.\n'
		step null, results

]

async.waterfall bloodyTrail, (error, results) ->
	if error
		console.log 'Async error:', error
	else
		console.log 'Digestion results:\n'

		results.sort (a, b) -> b - a

		for feed in results
			console.log(feed.host + ': \n' + feed.title + ' // +' + feed.points + '\n' + feed.link + '\n')