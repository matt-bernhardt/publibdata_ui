var w = 1000, h = 100;

// Plot shell
var visPop = d3.select("div#pop div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// Plot shell
var visBudget = d3.select("div#budget div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// Visits
var visVisits = d3.select("div#visits div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// Circulation
var visCirc = d3.select("div#circ div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// ILL Received
var visIllIn = d3.select("div#illReceived div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// ILL Provided
var visIllOut = d3.select("div#illProvided div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// Computers
var visComputers = d3.select("div#computers div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// Internet
var visInternet = d3.select("div#internet div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// Program Total
var visProgTotal = d3.select("div#programTotal div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// Program - Children
var visProgChildren = d3.select("div#programChildren div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// Program - Teen
var visProgTeen = d3.select("div#programTeen div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);

// Program - Adult
var visProgAdult = d3.select("div#programAdult div.right").append("svg:svg")
	.attr("width",w)
	.attr("height",h);


d3.json("/library_year/2016", function(error, data) {

	if ( error ) {
		console.log(error);
	} else {

		var records = cleanAllData(data.hits.hits);

		buildFrame(visPop);
		plotAllGeneric(records, visPop, 'Municipality Population-- do not change or edit - click to see definition', 0, 650000);

		buildFrame(visBudget);
		plotAllGeneric(records, visBudget, 'Total Appropriated Municipal Income--Operating', 0, 35000000);

		buildFrame(visVisits);
		plotAllGeneric(records, visVisits, 'Visitors', 0, 3750000);

		buildFrame(visCirc);
		plotAllGeneric(records, visCirc, 'Direct Circ', 0, 5000000);

		buildFrame(visIllIn);
		plotAllGeneric(records, visIllIn, 'ILL Received', 0, 250000);

		buildFrame(visIllOut);
		plotAllGeneric(records, visIllOut, 'ILL Provided', 0, 175000);

		buildFrame(visComputers);
		plotAllGeneric(records, visComputers, "1 Number of public use Internet computers available in the library (including children's area) and its branches and bookmobiles", 0, 800);

		buildFrame(visInternet);
		plotAllGeneric(records, visInternet, 'Number of Users of Public Internet Computers Per Year - IMLS', 0, 850000);

		buildFrame(visProgTotal);
		plotAllGeneric(records, visProgTotal, '8 Total Attendance at All Programs', 0, 250000);

		buildFrame(visProgChildren);
		plotAllGeneric(records, visProgChildren, "6 Total Attendance at all Children's Programs", 0, 150000);

		buildFrame(visProgTeen);
		plotAllGeneric(records, visProgTeen, '4 Total attendance at YA programs', 0, 10000);

		buildFrame(visProgAdult);
		plotAllGeneric(records, visProgAdult, '2 Total attendance at all adult programs', 0, 85000);

	}
});

var api_url = window.location.pathname.replace('/library/','/library_location/');
d3.json( api_url, function(error, data) {

	if ( error ) {
		console.log( error );
	} else {

		var libraryData = cleanLibraryData(data.hits.hits);

		plotAllLibrary(libraryData, visPop, 'Municipality Population-- do not change or edit - click to see definition', 0, 650000);

		plotAllLibrary(libraryData, visBudget, 'Total Appropriated Municipal Income--Operating', 0, 35000000);

		plotAllLibrary(libraryData, visVisits, 'Visitors', 0, 3750000);

		plotAllLibrary(libraryData, visCirc, 'Direct Circ', 0, 5000000);

		plotAllLibrary(libraryData, visIllIn, 'ILL Received', 0, 250000);

		plotAllLibrary(libraryData, visIllOut, 'ILL Provided', 0, 175000);

		plotAllLibrary(libraryData, visComputers, "1 Number of public use Internet computers available in the library (including children's area) and its branches and bookmobiles", 0, 800);

		plotAllLibrary(libraryData, visInternet, 'Number of Users of Public Internet Computers Per Year - IMLS', 0, 850000);

		plotAllLibrary(libraryData, visProgTotal, '8 Total Attendance at All Programs', 0, 250000);

		plotAllLibrary(libraryData, visProgChildren, "6 Total Attendance at all Children's Programs", 0, 150000);

		plotAllLibrary(libraryData, visProgTeen, '4 Total attendance at YA programs', 0, 10000);

		plotAllLibrary(libraryData, visProgAdult, '2 Total attendance at all adult programs', 0, 85000);
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
	var newData = [];

	for (i = 0; i < data.length; i++) {
		newData.push(data[i]._source);
	}

	return newData;
}

cleanLibraryData = function(data) {
	var newData = [];

	for (i = 0; i < data.length; i++) {
		// This step is necessary because it wasn't possible to just query the API for 2016
		// TODO: Query the API for just a single year
		// Once that's done, this function can go away
		if (data[i]._source['Year'] == 2016) {
			newData.push(data[i]._source);
		}
	}

	return newData;
}

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

plotAllLibrary = function(data, element, field, min, max) {

	// Scale
	var plotRange = d3.scaleLinear()
		.domain([min,max]) // Range of data
		.range([0,w]); // Range of plot

	// Highlight line
	var highlight = element.append("g")
		.attr("class","highlight");

	highlight.selectAll("line")
		.data(data)
		.enter()
		.append("line")
			.attr("x1", function(d) { return plotRange( d[field] ) })
			.attr("y1", h * 0.2)
			.attr("x2", function(d) { return plotRange( d[field] ) })
			.attr("y2", h * 0.8);

};
