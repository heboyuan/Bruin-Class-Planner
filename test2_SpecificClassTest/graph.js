////////////////////////////////////////////////////////////////
/// This graphs the grade distribution
// Takes in: 1) a dictionary of 'GradeType':score percentage e.g. {'A':12.0}
//           2) an id of a node so that the graph can be displayed in the node
//              Note: you need to have an inline style specifying size of the node
//                    so that this graph can fit into the node
// 
// Caution: needs to import: <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
// before importing this js file
google.charts.load("visualization",  '1.1',  {packages:['corechart']});


function grade_dist_graph(score_data, node_id) {
  var arr = [
    ["Grade Type", "Percentage", {role:'style'}]
  ];
  for (var score in score_data){
    arr.push([score, score_data[score]/100, 'orange']);
  }
  var data = google.visualization.arrayToDataTable(arr);

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,{ calc: "stringify",
                   sourceColumn: 1,
                   type: "string",
                   role: "annotation" },
                 2]);


  var options = {
    theme:'material',
    title: "Grade Distribution",
    titleTextStyle:{
      fontName: 'Arial',
      fontSize: '20'
    },
    bar: {groupWidth: "50%"},

    vAxis:{
      viewWindow:{
        min:0,
        max:1
      },
      textStyle: {
        fontName: 'Arial',
        fontSize: '10'
      },
      title: '',
      format: 'percent'
    },
    annotations:{
      alwaysOutside: true,
      highContrast:true,
      textStyle:{
        fontName:'Arial',
        auraColor: 'white',
        opacity:0.8
      }
    },
    height:'100%',
    width:'100%',
    legend: { position: "none" },
    backgroundColor: '#f2f4f7',
    chartArea:{
      left: '10%',
      right: '5%',
      height: '80%'
    }

  }
  var chart = new google.visualization.ColumnChart(document.getElementById(node_id));
  chart.draw(view,options);

}

///////////////////////////////////////////////////////////////////////////////////
//////// This graphs a professor's rating
// Takes in: 1) a dictionary of 'rating_category':score percentage e.g. {'Easiness of class':4.0}
//           2) an id of a node so that the graph can be displayed in the node
//              Note: you need to have an inline style specifying size of the node
//                    so that this graph can fit into the node
//

function prof_score_graph(score_data, node_id){
  var arr = [
    ["Rating Categories", "Rating", {role:'style'}]
  ];
  for(var key in score_data){
    arr.push([key.split(' ')[0], score_data[key], 'orange']);
  }
  var data = google.visualization.arrayToDataTable(arr);
  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,{ calc: "stringify",
                   sourceColumn: 1,
                   type: "string",
                   role: "annotation" },
                 2]);


  var options = {
    theme:'material',
    titleTextStyle:{
      fontName: 'Arial',
      fontSize: '20'
    },
    bar: {groupWidth: "50%"},
    bars: 'horizontal',
    hAxis:{
      viewWindow:{
        min: 0,
        max: 5.0
      },
      textStyle: {
        fontName: 'Arial',
        fontSize: '30'
      },
      ticks: [0,1.0,2.0,3.0,4.0,5.0],
      title:'',
      format: 'decimal'
    },
    vAxis:{
      textStyle: {
        fontName: 'Arial',
        fontSize: '20'
      },
      title:''
    },
    annotations:{
      highContrast: true,
      textStyle:{
        fontName:'Arial',
        fontSize:20,
        auraColor: '#d799ae',
        opacity:0.7,
        right: 100
      }
    },
    height:'100%',
    width:'100%',
    legend: { position: "none" },
    backgroundColor: '#f2f4f7',
    chartArea: {
      left:'25%',
      right:'10%',
      height: '90%'
    }
  }
  var chart = new google.visualization.BarChart(document.getElementById(node_id));
  chart.draw(view,options);

}
