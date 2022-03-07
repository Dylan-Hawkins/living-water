        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback
        google.charts.setOnLoadCallback(initialize);





//        var QueryAsk = 'https://docs.google.com/spreadsheets/d/1Okh_IlYoVzDZG6Eup-FUaHuHCcdWdf4ZWtpQU2u8Cx8/edit#gid=2074838797';
        var QueryAsk = 'https://docs.google.com/spreadsheets/d/1Okh_IlYoVzDZG6Eup-FUaHuHCcdWdf4ZWtpQU2u8Cx8/edit#gid=2074838797';
        function update_Query(){
            newQuer = document.getElementById('link').value;
            let QueryAsk = newQuer;
        }

        function initialize() {

            var opts = {sendMethod: 'auto'};
//            if(document.getElementById('link') == null){
//                var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1Okh_IlYoVzDZG6Eup-FUaHuHCcdWdf4ZWtpQU2u8Cx8/edit#gid=2074838797', opts);
//            }

           var query = new google.visualization.Query(document.getElementById('link').value, opts);

//            var query = new google.visualization.Query(QueryAsk, opts);
            query.send(handleQueryResponse);
        }

        function handleQueryResponse(response) {
            if (response.isError()) {
                alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            var data = response.getDataTable();
            google.charts.load('current', {'packages':['corechart', 'controls']});
                  google.charts.setOnLoadCallback(drawDashboard);
                  google.charts.setOnLoadCallback(stats);
                   function stats(){

                      var stats_Chart = new google.visualization.ChartWrapper({
                                'chartType': 'Table',
                                'containerId': 'stats',
                                'dataSourceUrl' : 'https://docs.google.com/spreadsheets/d/1Okh_IlYoVzDZG6Eup-FUaHuHCcdWdf4ZWtpQU2u8Cx8/edit#gid=2074838797',
                                'query' : 'SELECT S, T, U',
                                'options': {
                                    'title' : '',
                                    'subtitle' : '1: Low Risk, 3: High Risk, 4: Very High Risk',
                                    'width': 700,
                                    'height': 200,
                                    'legend': 'top'
                                }

                            });
                      stats_Chart.draw();
                   }
                  function drawDashboard() {
                    var choice = document.getElementById("ChartChoice").value;
                    var textPos = 'none';
                    var dashboard = new google.visualization.Dashboard(
                        document.getElementById('dashboard_div'));
                    if(choice == 'Histogram'){
                        textPos = 'out';
                        }

                    var dateRangeSlider = new google.visualization.ControlWrapper({

                      'controlType': 'CategoryFilter',
                      'containerId': 'Turbidity_date_filter',
                      'options': {
                        'useFormattedValue' : true,
                        'title' : 'Date',
                        'filterColumnIndex': '3',
                        'filterColumnLabel': 'Func. Loc.','ui': {'sortValues' : true, 'caption': 'Choose Date', 'labelStacking': 'vertical','allowTyping': false,'allowMultiple': true}
                      }
                    });

                    var categorySelector = new google.visualization.ControlWrapper({
                                  'controlType': 'CategoryFilter',
                                  'containerId': 'Turbidity_cat_filter',

                                  'options': {
                                    'title' : 'Device',
                                    'filterColumnIndex': '1',
                                    'filterColumnLabel': 'Func. Loc.','ui': {'sortValues' : true, 'caption': 'Choose Identifier', 'labelStacking': 'vertical','allowTyping': false,'allowMultiple': true}
                                  }
                                });



                   var t_Chart = new google.visualization.ChartWrapper({
                              'chartType': choice,
                              'containerId': 'Turbidity_div',
                              'options': {
                              'title' : 'Turbidity',
                                'width': 500,
                                'height': 500,
                                'legend': 'top',
                                'hAxis' : {'textPosition' : textPos}
                              },
                                'view': {'columns': [0, 4]}
                            });
                    var nitrate_Chart = new google.visualization.ChartWrapper({
                              'chartType': choice,
                              'containerId' : 'Nitrate_div',
                              'options': {
                              'title' : 'Nitrate',
                                'width': 500,
                                'height': 500,
                                'legend': 'top',
                                'hAxis' : {'textPosition' : textPos}
                              },
                                'view': {'columns': [0, 5]}
                            });
                    var nitrite_Chart = new google.visualization.ChartWrapper({
                              'chartType': choice,
                              'containerId': 'Nitrite_div',

                              'options': {
                              'title' : 'Nitrite',
                                'width': 500,
                                'height': 500,
                                'legend': 'top',
                                'hAxis' : {'textPosition' : textPos}

                              },
                                'view': {'columns': [0, 6]}
                            });
                    var pH_Chart = new google.visualization.ChartWrapper({
                              'chartType': choice,
                              'containerId': 'pH_div',
                              'options': {
                              'title' : 'pH',
                                'width': 500,
                                'height': 500,

                                'legend': 'top',
                                'hAxis' : {'textPosition' : textPos}

                              },
                                'view': {'columns': [0, 7]}
                            });
                    var totalChlorine_Chart = new google.visualization.ChartWrapper({
                              'chartType': choice,
                              'containerId': 'totalChlorine_div',
                              'options': {
                              //'filterColumnIndex': '0, 1',
                              'title' : 'Total Chlorine (mg/l)',
                                'width': 500,
                                'height': 500,
//                                'pieSliceText': 'value',
                                'legend': 'top',
                                'hAxis' : {'textPosition' : textPos}
                              },
                                'view': {'columns': [0, 8]}
                            });


                    var infoTable_Chart = new google.visualization.ChartWrapper({
                        'chartType': 'Table',
                        'containerId': 'dataTable_div',
                        'options': {
                            'title' : 'Info Table',
                            'width': 700,
                            'height': 500,
                            'legend': 'top'
                        },
                        'view': {'columns': [0,1,3,15,17]}

                    });
                    var commentTable_Chart = new google.visualization.ChartWrapper({
                        'chartType': choice,
                        'containerId': 'riskTable_div',
                        'options': {
                            'title' : 'E. Coli Risk',

                            'width': 500,
                            'height': 500,
                            'legend': 'top',
                            'hAxis' : {'textPosition' : textPos}
                        },
                        'view': {'columns': [0,10]}

                    });
                      var mpn_Chart = new google.visualization.ChartWrapper({
                          'chartType': choice,
                          'containerId': 'mpnChart_div',
                          'options': {
                              'title' : 'MPN (MPN/100ml)',

                              'width': 500,
                              'height': 500,
                              'legend': 'top',
                              'hAxis' : {'textPosition' : textPos}
                          },
                          'view': {'columns': [0,11]}

                      });

                      var confidence_Chart = new google.visualization.ChartWrapper({
                          'chartType': choice,
                          'containerId': 'confIntChart_div',
                          'options': {
                              'title' : 'Upper 95% Confidence Interval',
                              'width': 500,
                              'height': 500,
                              'legend': 'top',
                              'hAxis' : {'textPosition' : textPos}
                          },
                          'view': {'columns': [0,12]}

                      });

                    //pH_Chart.setChartType(BarChart);
                    dashboard.bind(categorySelector, dateRangeSlider);
                    dashboard.bind(categorySelector, nitrite_Chart);
                    dashboard.bind(dateRangeSlider, nitrite_Chart);
                    dashboard.bind(categorySelector, t_Chart);
                    dashboard.bind(dateRangeSlider, t_Chart);
                    dashboard.bind(categorySelector, nitrate_Chart);
                    dashboard.bind(dateRangeSlider, nitrate_Chart);
                    dashboard.bind(categorySelector, pH_Chart);
                    dashboard.bind(dateRangeSlider, pH_Chart);
                    dashboard.bind(categorySelector, totalChlorine_Chart);
                    dashboard.bind(dateRangeSlider, totalChlorine_Chart);
                    dashboard.bind(categorySelector, infoTable_Chart);
                    dashboard.bind(dateRangeSlider, infoTable_Chart);
                    dashboard.bind(categorySelector, mpn_Chart);
                    dashboard.bind(dateRangeSlider, mpn_Chart);
                    dashboard.bind(categorySelector, confidence_Chart);
                    dashboard.bind(dateRangeSlider, confidence_Chart);
                    dashboard.bind(categorySelector, commentTable_Chart);
                    dashboard.bind(dateRangeSlider, commentTable_Chart);
                    dashboard.draw(data);

                  }

}
       function update_chart(){
           google.charts.load('48', {packages: ['corechart']});
           google.charts.setOnLoadCallback
           google.charts.setOnLoadCallback(initialize);
  }







