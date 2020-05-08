const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
  revid: Number,
  parentid: Number,
  minor: Boolean,
  user: String,
  userid: Number,
  timestamp: Date,
  size: Number,
  sha1: String,
  parsedcomment: String,
  title: String,
  usertype: String,
});

// methods go here
revisionSchema.static('getMostRevision',function(number,callback){
  return this.aggregate([{$group:{_id:"$title", numOfEdits:{$sum:1}}}, {$sort:{numOfEdits:-1}}, {$limit:number}],callback);
})

revisionSchema.static('getLeastRevision',function(number,callback){
  return this.aggregate([{$group:{_id:"$title", numOfEdits:{$sum:1}}}, {$sort:{numOfEdits:1}}, {$limit:number}],callback);
})

revisionSchema.static('getMostHistory',function(callback){
	var mostHistory = this.aggregate([{$project:{_id:"$title", age:{$subtract:[new Date(), "$timestamp"]}}}, {$sort:{age:-1}}, {$group:{_id:"$_id", age:{$first:"$age"}}}, {$sort:{age:-1}}, {$limit:2}]).allowDiskUse(true).exec(callback);
	return mostHistory;
})

revisionSchema.static('getLeastHistory',function(callback){
	var leastHistory = this.aggregate([{$project:{_id:"$title", age:{$subtract:[new Date(), "$timestamp"]}}}, {$sort:{age:-1}}, {$group:{_id:"$_id", age:{$first:"$age"}}}, {$sort:{age:1}}, {$limit:2}]).allowDiskUse(true).exec(callback);
	return leastHistory;
})

revisionSchema.static('getMostRegister',function(callback){
  return this.aggregate([{$match:{anon:{$exists:false}}}, {$group:{_id:"$title", numOfEdits:{$sum:1}}}, {$sort:{numOfEdits:-1}}, {$limit:1}],callback)
})
revisionSchema.static('getLeastRegister',function(callback){
  return this.aggregate([{$match:{anon:{$exists:false}}}, {$group:{_id:"$title", numOfEdits:{$sum:1}}}, {$sort:{numOfEdits:1}}, {$limit:1}],callback)
})
revisionSchema.static('getDistinctTitles',function(callback){
  return this.aggregate([{$group:{_id:"$title", numOfEdits:{$sum:1}}}, {$sort:{_id:1}}],callback);
})

revisionSchema.static('getTotalRevForTitle',function(title,from,to,callback){
	return this.aggregate([{$match:{"title": title}}, 
			 {$match:{timestamp:{$gte:new Date(from)}}},
			 {$match:{timestamp:{$lte:new Date(to)}}},
			 {$group:{_id:"$title", numOfEdits:{$sum:1}}}, 
			 {$sort:{numOfEdits:-1}}, 
			 {$limit:5}]
			,callback)
})

revisionSchema.static('articleTopFiveAuthors',function(title,from,to,callback){
  return this.aggregate([{$match:{"title": title}}, 
	  					 {$match:{timestamp:{$gte:new Date(from)}}},
	  					 {$match:{timestamp:{$lte:new Date(to)}}},
	  					 {$group:{_id:"$user", numOfEdits:{$sum:1}}}, 
	  					 {$sort:{numOfEdits:-1}}, 
	  					 {$limit:5}]
  						,callback)
})

revisionSchema.static('userTypePieChart', function(callback) {

	return this.aggregate([	
	{$facet:
		{"Unregistered":[{$match: {anon:{$exists:true}}}, 
				        {$count: "Unregistered"}],   
         "Regular":[ {$match: {anon:{$exists:false}}},
                     {$match: {usertype:"user"}},
                     {$count: "Regular"}
                      ],
         "Admin":[ {$match: {anon:{$exists:false}}},
                   {$match: {usertype:"admin"}},
                   {$count: "Admin"}
                    ],
         "Bot":[ {$match: {anon:{$exists:false}}},
                 {$match: {usertype:"bot"}},
                 {$count: "Bot"}
                  ]}},
    {$project: 
    	{"Unregistered": 
    		{$arrayElemAt:["$Unregistered.Unregistered", 0]},
         "Regular":
         	{$arrayElemAt:["$Regular.Regular", 0]},
         "Admin":
         	{$arrayElemAt:["$Admin.Admin", 0]},
         "Bot":
         	{$arrayElemAt:["$Bot.Bot", 0]}
}}], callback)

})

revisionSchema.static('individualPieChart', function(title, from, to, callback) {

	return this.aggregate([
		{$match:{timestamp:{$gte:new Date(from)}}},
	    {$match:{timestamp:{$lte:new Date(to)}}},
		{$match:{"title":title}},
		{$facet:
		{"Unregistered":[{$match: {anon:{$exists:true}}}, 
				        {$count: "Unregistered"}],   
         "Regular":[ {$match: {anon:{$exists:false}}},
                     {$match: {usertype:"user"}},
                     {$count: "Regular"}
                      ],
         "Admin":[ {$match: {anon:{$exists:false}}},
                   {$match: {usertype:"admin"}},
                   {$count: "Admin"}
                    ],
         "Bot":[ {$match: {anon:{$exists:false}}},
                 {$match: {usertype:"bot"}},
                 {$count: "Bot"}
                  ]}},
    {$project: 
    	{"Unregistered": 
    		{$arrayElemAt:["$Unregistered.Unregistered", 0]},
         "Regular":
         	{$arrayElemAt:["$Regular.Regular", 0]},
         "Admin":
         	{$arrayElemAt:["$Admin.Admin", 0]},
         "Bot":
         	{$arrayElemAt:["$Bot.Bot", 0]}
}}], callback)

})


revisionSchema.static('userTypeBarChart', function(callback){
	return this.aggregate([
		
		{$facet:
			{"Unregistered":[{$match: {anon:{$exists:true}}},
                             {$project:{year:{$year:"$timestamp"}}},
                             {$group:{_id:"$year", "Unregistered":{$sum:1}}},
                             {$sort:{_id:1}}
                             ],   
			 "Regular":[ {$match: {anon:{$exists:false}}},
				 		 {$match: {usertype:"user"}},
	                     {$project:{year:{$year:"$timestamp"}}},
	                     {$group:{_id:"$year", "Regular":{$sum:1}}},
	                     {$sort:{_id:1}}
                             ],
         	 "Admin":[ {$match: {anon:{$exists:false}}},
	                   {$match: {usertype:"admin"}},
	                   {$project:{year:{$year:"$timestamp"}}},
	                   {$group:{_id:"$year", "Admin":{$sum:1}}},
	                   {$sort:{_id:1}}
	                      ],
             "Bot":[ {$match: {anon:{$exists:false}}},
                     {$match: {usertype:"bot"}},
                     {$project:{year:{$year:"$timestamp"}}},
                     {$group:{_id:"$year", "Bot":{$sum:1}}},
                     {$sort:{_id:1}}
                      ]                        
			}}
	 ], callback)

})	

revisionSchema.static('articleUserBarChart', function(title, from, to, callback){
	return this.aggregate([
		{$match:{"title":title}},
		{$match:{timestamp:{$gte:new Date(from)}}},
	    {$match:{timestamp:{$lte:new Date(to)}}},
		{$facet:
			{"Unregistered":[{$match: {anon:{$exists:true}}},
                             {$project:{year:{$year:"$timestamp"}}},
                             {$group:{_id:"$year", "Unregistered":{$sum:1}}},
                             {$sort:{_id:1}}
                             ],   
             "Regular":[ {$match: {anon:{$exists:false}}},
				 		 {$match: {usertype:"user"}},
	                     {$project:{year:{$year:"$timestamp"}}},
	                     {$group:{_id:"$year", "Regular":{$sum:1}}},
	                     {$sort:{_id:1}}
	                     ],
         	 "Admin":[ {$match: {anon:{$exists:false}}},
	                   {$match: {usertype:"admin"}},
	                   {$project:{year:{$year:"$timestamp"}}},
	                   {$group:{_id:"$year", "Admin":{$sum:1}}},
	                   {$sort:{_id:1}}
                      ],
             "Bot":[ {$match: {anon:{$exists:false}}},
                     {$match: {usertype:"bot"}},
                     {$project:{year:{$year:"$timestamp"}}},
                     {$group:{_id:"$year", "Bot":{$sum:1}}},
                     {$sort:{_id:1}}
                      ]}}
	 ], callback)
})

revisionSchema.static('getDistinctUser',function(callback){
	return this.aggregate([{$match:{anon:{$exists:false}}},{$group:{_id:"$user", numOfEdits:{$sum:1}}}, {$sort:{_id:1}}],callback);
})

revisionSchema.static('userArticlesBarChart', function(user,title,from,to,callback){
	return this.aggregate([
		{$match:{'title':title}},
		{$match:{timestamp:{$gte:new Date(from)}}},
	    {$match:{timestamp:{$lte:new Date(to)}}},
		{
			$facet:
			{ "1":[{$match: {'user':user[0]}},
				{$project:{year:{$year:"$timestamp"}}},
				{$group:{_id:"$year", "count":{$sum:1}}},
				{$sort:{_id:1}}
				],
				"2":[{$match: {'user':user[1]}},
				{$project:{year:{$year:"$timestamp"}}},
				{$group:{_id:"$year", "count":{$sum:1}}},
				{$sort:{_id:1}}
				],
				"3":[{$match: {'user':user[2]}},
				{$project:{year:{$year:"$timestamp"}}},
				{$group:{_id:"$year", "count":{$sum:1}}},
				{$sort:{_id:1}}
				],
				"4":[{$match: {'user':user[3]}},
				{$project:{year:{$year:"$timestamp"}}},
				{$group:{_id:"$year", "count":{$sum:1}}},
				{$sort:{_id:1}}
				],
				"5":[{$match: {'user':user[4]}},
				{$project:{year:{$year:"$timestamp"}}},
				{$group:{_id:"$year", "count":{$sum:1}}},
				{$sort:{_id:1}}
				]

			}
			}
	],callback)

})


revisionSchema.static('authorTitles', function(author, callback){
	return this.aggregate([{$match:{"user":author}}, {$group:{_id:"$title", numOfEdits:{$sum:1}, timestamps:{$push:"$timestamp"}}}, {$sort:{numOfEdits:-1}}], callback)
})

revisionSchema.static('getNumberRevisionsForYearAnon', function(year, callback) {
  return this.aggregate([{$match: {'timestamp': {$gte: new ISODate(`${year}-01-01T00:00:00Z`), $lte: new ISODate(`${year}-12-31T23:59:59Z`)}, 'anon': {$exists: true}}}, {$count}], callback);
});

revisionSchema.static('getNumberRevisionsForYearUsertype', function(year, usertype, callback) {
  return this.aggregate([{$match: {'timestamp': {$gte: new ISODate(`${year}-01-01T00:00:00Z`), $lte: new ISODate(`${year}-12-31T23:59:59Z`)}, 'usertype': usertype}}, {$count}], callback);
});

revisionSchema.static('getMostRecentRevisionDate', function(title, callback) {
  return this.aggregate([{$match: {'title': title}}, {$project: {'timestamp': 1}}, {$sort: {'timestamp': -1}}, {$limit: 1}], callback);
});

module.exports = mongoose.model('revision', revisionSchema, 'revisions');
