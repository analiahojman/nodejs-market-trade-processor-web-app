'use strict';

/*
 *  Google Visualization config
 */
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

/*
 * Given a list of Trade Messages qty per country, taking the JSON form of 
 * [{"_id":"country1","trade_messages_per_country":190},{"_id":"country2","trade_messages_per_country":530}],
 * this function builds an array of arrays taking the google visualization chart form of: 
 * [[country1,tradeMessageQty1],[country2,tradeMessageQty2]]
 */
function buildDataTableRows(tradeMessages){
    // Build the chartData in Google Visualization Chart data format 
    var dataTableRows = [];
    tradeMessages.forEach(function(tradeMessage){

      var dataWraperElement = [tradeMessage._id,tradeMessage.trade_messages_per_country];
      dataTableRows.push(dataWraperElement);

    });

    return dataTableRows;
}

/*
 *  Given a list of Trade Messages per country, this function utilizes google visualization to draw a pie chart.
 */
function drawChart(tradeMessages) {

  var dataTableRows = buildDataTableRows(tradeMessages);

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Country');
  data.addColumn('number', 'Trade Messages Qty');
  data.addRows(dataTableRows);

  var options = {
    title: 'Real time Chart: Trade Messagess per originating country'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart_trade_msg_by_orig_country'));

  chart.draw(data, options);
}

/* 
 * On a new 'tradeMessage' event, the chart is re-painted based on the incoming data
 */
$(function(){

  var socket = io.connect();
  var newTradeMessageSubscriber = new Faye.Client('https://market-trade-processor-api.herokuapp.com/faye',{timeout: 20});


  /*
   * On connect receive the current tradeMessages per country.
   */
  socket.on('tradeMessage', function(tradeMessagesPerCountry){  
    drawChart(tradeMessagesPerCountry); 
  });

  /*
   * The web page subscribes to new trade messages update
   */
  newTradeMessageSubscriber.subscribe('/tradeMessage', function(message) {
    drawChart(message.text);
  });   

});
