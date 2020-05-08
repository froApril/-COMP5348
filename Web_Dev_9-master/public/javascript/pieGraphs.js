google.charts.load('current', {packages: ['corechart']});


function drawOverallPie(){
   	
		
	var overallPieOptions = {'title':"Distribution of Revisions by User Type",
		    'width':800,
		    'height':450
		};
	
	
	
	const xhr = new XMLHttpRequest();
	xhr.open('get', '/article/overall/pie', true);
	xhr.responseType = 'json';
	xhr.send();
	
	xhr.onreadystatechange=function(){
		if(xhr.status==200 && xhr.readyState==4) {
			overallPieData = new google.visualization.DataTable();
			overallPieData.addColumn('string', 'UserType');
			overallPieData.addColumn('number', 'NumEdits');
			
			const userTypes = xhr.response.userCount;
			
			overallPieData.addRow(["Unregistered", userTypes[0]]);
			overallPieData.addRow(["Regular", userTypes[1]]);
			overallPieData.addRow(["Admin", userTypes[2]]);
			overallPieData.addRow(["Bot", userTypes[3]]);
			var chart = new google.visualization.PieChart(document.getElementById('overallPieChart'));
			chart.draw(overallPieData, overallPieOptions);
			
		}
	}
}	

function drawIndividualPie(title, from, to) {
	
	var individualPieOptions = {'title':"Distribution of Revisions by User Type",
		    'width':700,
		    'height':450
		};
	
	
	  const xhr = new XMLHttpRequest();
	  xhr.open('post', 'article/individual/pie', true);
	  xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.responseType ='json';
	    
	  xhr.send(JSON.stringify({'title':title, 'from':from, 'to':to}));
	  xhr.onreadystatechange = function() {
	    if(xhr.status==200 && xhr.readyState==4) {
	    	individualPieData = new google.visualization.DataTable();
	    	individualPieData.addColumn('string', 'UserType');
	    	individualPieData.addColumn('number', 'NumEdits');
			
			const userTypes = xhr.response.userCount;
			
			individualPieData.addRow(["Unregistered", userTypes[0]]);
			individualPieData.addRow(["Regular", userTypes[1]]);
			individualPieData.addRow(["Admin", userTypes[2]]);
			individualPieData.addRow(["Bot", userTypes[3]]);
			var chart = new google.visualization.PieChart(document.getElementById('individualPieChart'));
			chart.draw(individualPieData, individualPieOptions);
	    }
	      
	  };
}



