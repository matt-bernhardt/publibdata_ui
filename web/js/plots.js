var w = 1000, h = 100;

d3.json("/library_year/2016", function(error, data) {

	if ( error ) {
		console.log(error);
	} else {

		var records = cleanAllData(data.hits.hits);

		// Plot shell
		var visPop = d3.select("div#pop div.right").append("svg:svg")
			.attr("width",w)
			.attr("height",h);
		buildFrame(visPop);
		plotAllGeneric(records, visPop, 'Municipality Population-- do not change or edit - click to see definition', 0, 650000);

		// Plot shell
		var visBudget = d3.select("div#budget div.right").append("svg:svg")
			.attr("width",w)
			.attr("height",h);
		buildFrame(visBudget);
		plotAllGeneric(records, visBudget, 'Total Appropriated Municipal Income--Operating', 0, 35000000);
		// plotAllGeneric = function(data, element, field, min, max) {}

		// Visits
		var visVisits = d3.select("div#visits div.right").append("svg:svg")
			.attr("width",w)
			.attr("height",h);
		buildFrame(visVisits);
		plotAllGeneric(records, visVisits, 'Visitors', 0, 3750000);

		// Circulation
		var visVisits = d3.select("div#circ div.right").append("svg:svg")
			.attr("width",w)
			.attr("height",h);
		buildFrame(visVisits);
		plotAllGeneric(records, visVisits, 'Direct Circ', 0, 5000000);

		// plotInfo(records, visPop);

	}
});

/* ##########################################################################
#### Functions
# */
buildFrame = function(element) {

	// Scale grouping
	var scale = element.append("g")
		.attr("class","scale");

	// Horizontal scale
	scale.append("svg:line")
		.attr("x1",0)
		.attr("y1",h/2)
		.attr("x2",w)
		.attr("y2",h/2);

	// Minimum hashmark
	scale.append("svg:line")
		.attr("x1",0)
		.attr("y1",0)
		.attr("x2",0)
		.attr("y2",h);

	// Maximum hashmark
	scale.append("svg:line")
		.attr("x1",w)
		.attr("y1",0)
		.attr("x2",w)
		.attr("y2",h);
};

cleanAllData = function(data) {
	console.log('Cleaning data');
	console.log(data);

	var newData = [];

	for (i = 0; i < data.length; i++) {
		newData.push(data[i]._source);
	}

	console.log('Cleaned:');
	console.log(newData);

	return newData;
}

cleanData = function(data) {
	console.log('Cleaning data');
	console.log(data);

	// Build new data structure
	var newData = {};
	// newData.theirs is an array of all records, simplified
	newData.theirs = [];
	// newData.ours is an object of the record we are highlighting
	newData.ours = [];

	// Iterate over original data, simplifying data structuree
	// I know, this should be a map function
	for (i = 0; i < data.length; i++) {
		newData.theirs.push(data[i]._source);

		// Check whether we should calll out each record
		if (data[i]._source['Year'] == 2016) {
			newData.ours.push(data[i]._source);
		}
	}

	console.log('Cleaned:');
	console.log(newData);

	return newData;
};

plotAllGeneric = function(data, element, field, min, max) {

	// Scale
	var plotRange = d3.scaleLinear()
		.domain([min,max]) // Range of data
		.range([0,w]); // Range of plot

	// Context lines
	var context = element.append("g")
		.attr("class","context");

	context.selectAll("line")
		.data(data)
		.enter()
		.append("line")
			.attr("x1", function(d) { return plotRange( d[field] ) })
			.attr("y1", h * 0.35)
			.attr("x2", function(d) { return plotRange( d[field] ) })
			.attr("y2", h * 0.65);

};

plotInfo = function(data, element) {
	console.log('Plotting:');
	console.log(data);
	console.log(element);

	// Scale
	var plotRange = d3.scaleLinear()
		.domain([0,700000]) // Range of data
		.range([0,w]); // Range of plot

	// Context lines
	var context = visPop.append("g")
		.attr("class","context");

	context.selectAll("line")
		.data(data.theirs)
		.enter()
		.append("line")
			.attr("x1", function(d) { return plotRange( d['Municipality Population-- do not change or edit - click to see definition'] )	})
			.attr("y1", h * 0.35)
			.attr("x2", function(d) { return plotRange( d['Municipality Population-- do not change or edit - click to see definition'] ) })
			.attr("y2", h * 0.65);

	// Highlight line
	var highlight = visPop.append("g")
		.attr("class","highlight");

	highlight.selectAll("line")
		.data(data.ours)
		.enter()
		.append("line")
			.attr("x1", function(d) { return plotRange( d['Municipality Population-- do not change or edit - click to see definition'] ) })
			.attr("y1", h * 0.25)
			.attr("x2", function(d) { return plotRange( d['Municipality Population-- do not change or edit - click to see definition'] ) })
			.attr("y2", h * 0.75);

};
