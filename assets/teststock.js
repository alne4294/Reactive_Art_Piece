/*var parse = require('csv-parse');

//Image 5 (stock)
var stock = "l1";
var input = 'http://finance.yahoo.com/d/quotes.csv?s=AAPL&f='+stock+'&e=.csv"';
parse(input, function(err, output){
  console.log(output);

});*/

function getData() {
    var url = "http://query.yahooapis.com/v1/public/yql";
    var symbol = $("#symbol").val();
    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
        .done(function (data) {
        $("#result").text("Bid Price: " + data.query.results.quote.LastTradePriceOnly);
        console.output(data.query.results.quote.LastTradePriceOnly);
    })
        .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
            $("#result").text('Request failed: ' + err);
    });
}