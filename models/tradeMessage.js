'use strict';

var host = 'https://market-trade-processor-api.herokuapp.com/tradeMessages/percountry';
var request = require('request');

/**
 *  Get tradeMessages quantity group by country from the pub server
 */
exports.getTradeMessagesGroupByCountry = function(callback) {
	request(host, function(err, resp, data){
    	if (data.error) return callback(err, []);
    	callback(null, JSON.parse(data));
  });
};