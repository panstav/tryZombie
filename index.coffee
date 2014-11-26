console.log '\nRunning Zombie\n'

async = require 'async'

zombieSeed = require 'zombie'
zombie = new zombieSeed()

bloodyTrail = [


	(step) ->

		console.log 'Going towards smell\n'

		onTheRun = Date.now()
		zombie.visit 'http://www.yadaim2.co.il/index.asp', (err) ->
			if err then step err
			else step null, zombie.document, onTheRun


	(doc, onTheRun, step) ->

		console.log('\nArrived at ' + (Date.now() - onTheRun)/1000 + 'sec\n')

		rot = doc.querySelectorAll('#fb-root')
		rotHTML = rot[0].outerHTML

		step null, rotHTML


	(results, step) ->

		console.log 'Eating.\n'
		step null, results

]

async.waterfall bloodyTrail, (error, results) ->
	if error
		console.log 'Async error:', error
	else
		console.log 'Digestion results:\n', results