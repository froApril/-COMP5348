google.charts.load('current', {'packages':['corechart']});
	
	
	
	
function drawOverallBar(){

	var overallBarOptions = {'title':"Distribution of All Revisions by User Type and Year",
			'width':1200,
		    'height':600,
		    'vAxis':{title:'Number of Revisions'},
		    'hAxis':{title:'Year'},
		    'chartArea':{left:40}
	};

	const xhr = new XMLHttpRequest();
	xhr.open('get', '/article/overall/bar', true);
	xhr.responseType = 'json';
	xhr.send();	 
	xhr.onreadystatechange=function(){
		if(xhr.status==200 && xhr.readyState==4) {			
			var barDataArray = [];
			barDataArray.push(['Year', 'Unregistered', 'Regular', 'Admin', 'Bot']);			
			const userTypes = xhr.response.userCount;			
			var yearRange = [];	
			
			for(i = 0; i < userTypes[0].length; i++) {
				yearRange.push(userTypes[0][i]._id);
			}
			for(i = 0; i < userTypes[1].length; i++) {
				yearRange.push(userTypes[1][i]._id);
			}
			for(i = 0; i < userTypes[2].length; i++) {
				yearRange.push(userTypes[2][i]._id);
			}
			for(i = 0; i < userTypes[3].length; i++) {
				yearRange.push(userTypes[3][i]._id);
			}
		
			for(i = Math.min(...yearRange); i <= Math.max(...yearRange); i++) {
				barDataArray.push([i.toString(),0,0,0,0]);
			}

			for (i = 0; i < barDataArray.length - 1; i++) {
				for(j = 0; j < userTypes[0].length; j++) {
					if (parseInt(barDataArray[i+1][0]) == userTypes[0][j]._id) {
						barDataArray[i+1][1] = userTypes[0][j].Unregistered;
					}
				}
				
				for(j = 0; j < userTypes[1].length; j++) {
					if (parseInt(barDataArray[i+1][0]) == userTypes[1][j]._id) {
						barDataArray[i+1][2] = userTypes[1][j].Regular;
					}
				}
				
				for(j = 0; j < userTypes[2].length; j++) {
					if (parseInt(barDataArray[i+1][0]) == userTypes[2][j]._id) {
						barDataArray[i+1][3] = userTypes[2][j].Admin;
					}
				}
				
				for(j = 0; j < userTypes[3].length; j++) {
					if (parseInt(barDataArray[i+1][0]) == userTypes[3][j]._id) {
						barDataArray[i+1][4] = userTypes[3][j].Bot;
					}
				}
									
			}
			var overallBarData = google.visualization.arrayToDataTable(barDataArray);
			var chart = new google.visualization.ColumnChart(document.getElementById('overallBarChart'));
			chart.draw(overallBarData, overallBarOptions);
		}
	}
}	

function drawArticleYearBar(title, from, to) {
	var overallBarOptions = {'title':"Distribution of Revisions by User Type and Year",
			'width':1200,
		    'height':600,
		    'vAxis':{title:'Number of Revisions'},
		    'hAxis':{title:'Year'},
		    'chartArea':{left:40}
	};

	
	 const xhr = new XMLHttpRequest();
	  xhr.open('post', 'article/individual/bar', true);
	  xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.responseType ='json';
	    
	    xhr.send(JSON.stringify({'title':title, 'from':from, 'to':to}));
	  xhr.onreadystatechange = function() {
	    if(xhr.status==200 && xhr.readyState==4) {
	    	var barDataArray = [];
			barDataArray.push(['Year', 'Unregistered', 'Regular', 'Admin', 'Bot']);		
			const userTypes = xhr.response.userCount;	
			var yearRange = [];	
			
			for(i = 0; i < userTypes[0].length; i++) {
				yearRange.push(userTypes[0][i]._id);
			}
			for(i = 0; i < userTypes[1].length; i++) {
				yearRange.push(userTypes[1][i]._id);
			}
			for(i = 0; i < userTypes[2].length; i++) {
				yearRange.push(userTypes[2][i]._id);
			}
			for(i = 0; i < userTypes[3].length; i++) {
				yearRange.push(userTypes[3][i]._id);
			}	
			for(i = Math.min(...yearRange); i <= Math.max(...yearRange); i++) {
				barDataArray.push([i.toString(),0,0,0,0]);
			}
			for (i = 0; i < barDataArray.length - 1; i++) {
				for(j = 0; j < userTypes[0].length; j++) {
					if (parseInt(barDataArray[i+1][0]) == userTypes[0][j]._id) {
						barDataArray[i+1][1] = userTypes[0][j].Unregistered;
					}
				}
				
				for(j = 0; j < userTypes[1].length; j++) {
					if (parseInt(barDataArray[i+1][0]) == userTypes[1][j]._id) {
						barDataArray[i+1][2] = userTypes[1][j].Regular;
					}
				}
				
				for(j = 0; j < userTypes[2].length; j++) {
					if (parseInt(barDataArray[i+1][0]) == userTypes[2][j]._id) {
						barDataArray[i+1][3] = userTypes[2][j].Admin;
					}
				}
				
				for(j = 0; j < userTypes[3].length; j++) {
					if (parseInt(barDataArray[i+1][0]) == userTypes[3][j]._id) {
						barDataArray[i+1][4] = userTypes[3][j].Bot;
					}
				}
									
			}
			
			var overallBarData = google.visualization.arrayToDataTable(barDataArray);
			var chart = new google.visualization.ColumnChart(document.getElementById('individualBarChart'));
			chart.draw(overallBarData, overallBarOptions);
			
	    }
	  }
}
function drawUserBar(user,title,index,from,to){
	var UserBarOptions = {'title':"Yearly Distribution of Revisions by Top Users",
			'width':1200,
		    'height':600,
		    'vAxis':{title:'Number of Revisions'},
		    'hAxis':{title:'Year'},
		    'chartArea':{left:40}
	};
	
	const xhr = new XMLHttpRequest();
	xhr.open('post', 'article/user/bar', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	  xhr.responseType ='json';
	  
	  var author ={
		'author': user,
		'title': title,
		'from':from,
		'to':to
	  }
	xhr.send(JSON.stringify(author));
	xhr.onreadystatechange=function(){
		if(xhr.status==200 && xhr.readyState==4) {
			const dataset = xhr.response.dataset;
			var barDataArray = [];
			barDataArray.push(['Year']);		
			var selected_data =[];
			for(var i =0;i<index.length;i++){
				barDataArray[0].push(user[index[i]-1]);
				selected_data.push(dataset[0][index[i]]);
			}
			var yearRange = new Set();
			for(var i=0;i<selected_data.length;i++){
				var temp =selected_data[i];
				for(var j = 0; j<temp.length;j++){
					yearRange.add(temp[j]._id);
				}
			}
			var yearArray = Array.from(yearRange);
			var minYear = Math.min(...yearArray);
			var maxYear = Math.max(...yearArray);
			
			for(i = minYear; i <=maxYear; i++) {
				var temp =[];
				temp.push(i.toString());
				for(var j=0;j<index.length;j++){
					temp.push(0);
				}
				barDataArray.push(temp);
			}
			
		
			for(var i =1; i<barDataArray.length;i++){
				var temp = barDataArray[i];
				for(var j=0;j<selected_data.length;j++){
					var data = selected_data[j];
					for(var x =0;x<data.length;x++){
						if(parseInt(data[x]._id) ==temp[0]){
							barDataArray[i][j+1]=data[x].count;
						}
					}
				}
			}
			var BarData = google.visualization.arrayToDataTable(barDataArray);
			var chart = new google.visualization.ColumnChart(document.getElementById('UserBarChart'));
			chart.draw(BarData, UserBarOptions);
		 }
	}
} 