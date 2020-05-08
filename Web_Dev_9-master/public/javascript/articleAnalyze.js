/* eslint-disable require-jsdoc */
var flag =0;
var flag_over =0;
setRevision = function() {
  const number = document.getElementById('articalNum').value;
  if(number>0) {
	  showRevision_H(number);
	  showRevision_L(number); 
  } else {
	  window.alert("Please enter a number greater than 0");
  }
};

function showRevision_H(number){
  const xhrH =new XMLHttpRequest();
  xhrH.open('post', 'article/revision/most', true);
  xhrH.setRequestHeader('Content-Type', 'application/json');
  xhrH.responseType ='json';
  var number ={
    'number': number
  }
  xhrH.send(JSON.stringify(number));
  xhrH.onreadystatechange= function() {
    if (xhrH.status==200 && xhrH.readyState===4) {
      const titles = xhrH.response.articlelist;
      const length =xhrH.response.length;
      const listHighest = document.getElementById('revision list highest');
      let html ='';
      for (let i=0; i<length; i++) {
        html = html+'<li>'+titles[i]+'</li>';
      }
      listHighest.innerHTML=html;
    }
  };
}
function showRevision_L(number){
  const xhrH =new XMLHttpRequest();
  xhrH.open('post', 'article/revision/least', true);
  xhrH.setRequestHeader('Content-Type', 'application/json');
  xhrH.responseType ='json';
  var number ={
    'number': number
  }
  xhrH.send(JSON.stringify(number));
  xhrH.onreadystatechange= function() {
    if (xhrH.status==200 && xhrH.readyState===4) {
      const titles = xhrH.response.articlelist;
      const length =xhrH.response.length;
      const listHighest = document.getElementById('revision list lowest');
      let html ='';
      for (let i=0; i<length; i++) {
        html = html+'<li>'+titles[i]+'</li>';
      }
      listHighest.innerHTML=html;
    }
  };
}


function showHistory_H() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/article/history/most', true);
  xhr.responseType ='json';
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.status==200 && xhr.readyState==4) {
      const titles = xhr.response.articlelist;
      const listLongestHist = document.getElementById('longest history');
      let html='';
      for (let i=0; i<2; i++) {
        html = html+'<li>'+titles[i]+'</li>';
      }
      listLongestHist.innerHTML=html;
    }
  };
}
function showHistory_L() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/article/history/least', true);
  xhr.responseType ='json';
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.status==200 && xhr.readyState==4) {
      const titles = xhr.response.articlelist;
      const listShortestHist = document.getElementById('shortest history');
      let html='';
      html = html+'<li>'+titles[0]+'</li>';
      listShortestHist.innerHTML=html;
    }
  };
}

function showUserNumber_H() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/article/User/most', true);
  xhr.responseType ='json';
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.status==200 && xhr.readyState==4) {
      const titles = xhr.response.articlelist;
      const listMostRegister = document.getElementById('most registeredNum');
      let html='';
      html = html+'<li>'+titles[0]+'</li>';
      listMostRegister.innerHTML=html;
    }
  };
}


function showUserNumber_L() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/article/User/least', true);
  xhr.responseType ='json';
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.status==200 && xhr.readyState==4) {
      const titles = xhr.response.articlelist;
      const listLeastRegister = document.getElementById('least registeredNum');
      let html='';
      html = html+'<li>'+titles[0]+'</li>';
      listLeastRegister.innerHTML=html;
    }
  };
}

var title_for_chart='';
function populateDatalist() {  
  const xhr = new XMLHttpRequest();
  xhr.open('get', '/article/title/list', true);
  xhr.responseType='json';
  xhr.send();
  
  xhr.onreadystatechange = function() {
    if (xhr.status==200 && xhr.readyState==4) {   
      const titles = xhr.response.articlelist;
      const dropdown = document.getElementById('searchTitle');
      let html='';

      for (let i = 0; i < titles.length; i++) {
        html = html + '<option value="' + titles[i][0] + '">[<i>' + titles[i][1] + ' total revisions</i>]</option>'; 
      }
      
      dropdown.innerHTML = html;

      document.getElementById('individualSearch').addEventListener('click', function() {
        // chuck in query here
    	  var fromYear = document.getElementById('fromYear').value;
          var toYear = document.getElementById('toYear').value;
          document.getElementById('UserBarChart').innerHTML = '';
          if (parseInt(fromYear) >= 1000 && parseInt(fromYear) <= 9999 && parseInt(toYear) >= 1000 && parseInt(toYear) <= 9999) {
        	  if (parseInt(fromYear) <= parseInt(toYear)) {
	        	  if(document.getElementsByName('findTitle')[0].value != '') {
                document.getElementById('individualAlert').innerHTML = '';
                const wikipediaGet = new XMLHttpRequest();
                wikipediaGet.responseType = 'json';
                wikipediaGet.open('get', `/article/revision/update/${document.getElementsByName('findTitle')[0].value}`, true);
                wikipediaGet.onreadystatechange = function() {
                  if(this.readyState == 4 && this.status == 200) {
                    if (this.response.update == 1) {
                      const updateAlert = document.getElementById('individualAlert');
                      updateAlert.innerHTML = '<h3>There were updates made to our Database. You may need to refresh for them to take effect.</h3>';
                    }
                  }
                }
                console.log('sending wikipedia request');
                wikipediaGet.send();
	        		  fromYear = fromYear + "-01-01";
	        		  toYear = toYear + "-12-31";
	                  const title = document.getElementsByName('findTitle')[0].value;
	                  title_for_chart = document.getElementsByName('findTitle')[0].value;
	                  const individualTitle = document.getElementById('individualTitle');      
	                  totalForTitle(title, fromYear, toYear);
	                  let titleHtml=title;        
	                  individualTitle.innerHTML = titleHtml;  
	                  articleTopAuthors(title, fromYear, toYear);
	                  drawIndividualPie(title, fromYear, toYear);
                    drawArticleYearBar(title, fromYear, toYear);
                    document.getElementById('indi_graphs_buttons').style.display='';
                    flag=1;
	                }     
	          } else {
	        	  window.alert("'From' year should be before 'To' year");
	          }
          } else {
        	  window.alert("Year should be a 4-digit number");
          }

        });

    }   
  };
}


function totalForTitle(title, from, to) {
  
  const xhr = new XMLHttpRequest();
  xhr.open('post', 'article/title/total', true);
  
  xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType ='json';
  
  xhr.send(JSON.stringify({'title':title, 'from':from, 'to':to}));
  xhr.onreadystatechange = function() {
    
    if (xhr.status==200 && xhr.readyState==4) {
      
      const totals = xhr.response.articlelist;
      try {
    	  const totalField = document.getElementById('individualTotal');
          let html='';
          html = html+"Number of revisions = " + totals[0][0].numOfEdits;
          totalField.innerHTML = html;

          console.log(totals[0]);
      } catch(err) {
        document.getElementById('individualTotal').innerHTML = 'No results found';
    	  document.getElementById('topAuthors').innerHTML = '';
      }
     
    }
  };  
}
var topFive =[];

function articleTopAuthors(title, from, to) {
  const xhr = new XMLHttpRequest();
  xhr.open('post', 'article/title/authors', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType ='json';
    
    xhr.send(JSON.stringify({'title':title, 'from':from, 'to':to}));
  xhr.onreadystatechange = function() {
    if(xhr.status==200 && xhr.readyState==4) {
      topFive = [];	
      const topAuthors = xhr.response.authorList;
      const length = xhr.response.length;
      const authorField = document.getElementById('topAuthors');
      let html='';
      for(i = 0; i < length; i++){
        topFive.push(topAuthors[i][0]);
        html = html + '<li>' + topAuthors[i][0] + ': ' + topAuthors[i][1] + ' revisions</li>';
      }

      

      if (length > 0) {
    	  authorField.innerHTML = 'Top ' + length + ' authors on this article are: <ol>' + html + '</ol>';  
        userList();
      }
      
    }
  };
}

authorSearch = function() {
	  const author = document.getElementById('findAuthor').value;
	  document.getElementById('authorTimes').innerHTML = '';
	  authorTitles(author);
	};

function authorTitles(author) {
	  const xhr = new XMLHttpRequest();
	  xhr.open('post', 'article/author/titles', true);
	  xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.responseType ='json';
	    var author ={
	      'author': author
	    }
	  xhr.send(JSON.stringify(author));
	  xhr.onreadystatechange = function() {
	    if(xhr.status==200 && xhr.readyState==4) {
	      const articleList = xhr.response.authorTitles;
	      const length = xhr.response.length;
	      const authorTitleField = document.getElementById('authorTitles');
	      let html='';
	      for(i = 0; i < length; i++){
	        html = html + '<li id=' + articleList[i][0] + '>' + articleList[i][0] + ': ' + articleList[i][1] + ' revisions</li>';
	        console.log("articleList[i][0] = " + articleList[i][0])
	      }
	      authorTitleField.innerHTML = 'Articles edited by ' + author.author + ' are: <ol>' + html + '</ol>';   
      
	      document.getElementById('displayTimestamps').addEventListener('click', function() {
	    	  console.log("length = " + length);
	    	  var timestamps = document.getElementById('authorTimes');
	    	  var html = '';
	    	     		  
	    		  for(i=0; i < length; i++) {
		    	      
	    			  if (articleList[i][2].length > 1) {
	    				  html= html + '<li>' +  articleList[i][0] + '</li><ul>';
	    				  console.log("articleList[i].length = " + articleList[i].length);

			    		  for(j = 0; j < articleList[i][2].length; j++) {
				    		  html = html + '<li>' + articleList[i][2][j] + '</li>';  
				    	  }
			    		  
			    	  }    	  
			    	  html = html + '</ul>'		    	   
	    		  }
	    	  timestamps.innerHTML = '<ol>' + html + '</ol>';       
		      });
	    }
	 };
}



function userList(){
    var users = topFive;
    console.log("topFive = " + topFive);
    const checkboxes = document.getElementById('searchUser');
    const button  = document.getElementById('graphButton');
    let html = '';
    for(let i = 0; i<users.length;i++){
      if(i == 0){
        html = '<p> View the number of revisions (by year) from these top users:</p>';
        let create_button = '<br><input type="button" id="graphbutton" name = "graphbutton" value= "Show graphs">' 
        button.innerHTML = create_button;
      }
      html  = html + '<input type = "checkbox" name= "topfive" value ="'+ users[i]+'">' + users[i]+'<br>'
    }
    checkboxes.innerHTML = html;
    
    document.getElementById("graphbutton").addEventListener('click',function(){
      document.getElementById("indi_graphs").style.display='none';
      document.getElementById('UserBarChart').style.display='';
      var userSearchList=[];
      var index=[];
      var checkboxs = document.getElementsByName('topfive');
      for(var i=0; i< checkboxs.length; i++){
        if(checkboxs[i].checked){
          userSearchList.push(topFive[i]);
          index.push((i+1).toString());
        }
      }
      if(userSearchList.length==0){
        alert("Please select user(s)");
      }
      else{
    	  var fromYear = document.getElementById('fromYear').value + "-01-01";
          var toYear = document.getElementById('toYear').value + "-12-31";
        drawUserBar(topFive,title_for_chart,index,fromYear,toYear);
      }
    })
   
}





