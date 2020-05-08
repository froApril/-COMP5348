function display_article(){
    var stateObj = {foo:'bar'};
    history.pushState(stateObj,'page 1','article');

    document.getElementById("default").style.display='none';
    document.getElementById("article analyze").style.display='';
    setoverviewGraph();
    document.getElementById("individual analytics").style.display='none';
    document.getElementById('author analytics').style.display='none';
}
function setoverviewGraph() {
    if(flag_over==0){
        document.getElementById("overgraphs").style.display='none';
    }
    document.getElementById("showPie").addEventListener('click',function(){
        flag_over=1;
        document.getElementById("overgraphs").style.display='';
        document.getElementById("overallBarChart").style.display='none';
        document.getElementById("overallPieChart").style.display='';
    })
    document.getElementById("showBar").addEventListener('click',function(){
        flag_over=1;
        document.getElementById("overgraphs").style.display='';
        document.getElementById("overallBarChart").style.display='';
        document.getElementById("overallPieChart").style.display='none';
    })

}

function display_individual(){
    var stateObj = {foo:'bar'};
    history.pushState(stateObj,'page 1','article');
    document.getElementById("default").style.display='none';
    document.getElementById("article analyze").style.display='none';
    document.getElementById("individual analytics").style.display='';
    if(flag==0){
        document.getElementById('indi_graphs_buttons').style.display='none';
    }
    else{
        document.getElementById('indi_graphs_buttons').style.display='';
    }
    setindividualGraph();
    document.getElementById('author analytics').style.display='none';
}
function setindividualGraph(){
    if(flag==0){
        document.getElementById("indi_graphs").style.display='none';
    }
    document.getElementById("showPie_indi").addEventListener('click',function(){
        document.getElementById('UserBarChart').style.display='none';
        document.getElementById("indi_graphs").style.display='';
        document.getElementById("individualBarChart").style.display='none';
        document.getElementById("individualPieChart").style.display='';
    })
    document.getElementById("showBar_indi").addEventListener('click',function(){
        document.getElementById('UserBarChart').style.display='none';
        document.getElementById("indi_graphs").style.display='';
        document.getElementById("individualBarChart").style.display='';
        document.getElementById("individualPieChart").style.display='none';
    })

}
function display_author() {
    var stateObj = {foo:'bar'};
    history.pushState(stateObj,'page 1','article');
    document.getElementById("default").style.display='none';
    document.getElementById("article analyze").style.display='none';
    document.getElementById("individual analytics").style.display='none';
    document.getElementById('author analytics').style.display='';
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

window.onload =function() {
    if(!getQueryVariable("index")){
        document.getElementById("article analyze").style.display='none';
        document.getElementById("individual analytics").style.display='none';
        document.getElementById('author analytics').style.display='none';
    }
    else{
        document.getElementById("default").style.display='none';
        switch(getQueryVariable("index")){
            case "1":
                display_article();
                break;
            case "2":
                display_individual();
                break;
            case "3":
                display_author();
                break;
        }
    }
   

}