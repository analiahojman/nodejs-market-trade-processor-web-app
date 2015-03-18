'use strict';

var model = require('../models/tradeMessage');


/**
 *  Get trade messages qty group by country 
 */
exports.getTradeMessagesGroupByCountry = function (callback){
	model.getTradeMessagesGroupByCountry(function(err,tradeMessages){
		if (err) return callback(err, []);
    	callback(null, tradeMessages);
	});
};