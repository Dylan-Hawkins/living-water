        google.charts.load('48', {packages: ['corechart']});


        function initialize() {
            var opts = {sendMethod: 'auto'};
            // Replace the data source URL on next line with your data source URL.
            var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1wxuVVa3d0JZAfBPtgZ6FChv67p__SZ3uprft-his7zU/edit#gid=1538410528', opts);

            // Optional request to return only column C and the sum of column B, grouped by C members.
            query.setQuery('select A, B, C, D');

            // Send the query with a callback function.
            query.send(handleQueryResponse);
        }

        function handleQueryResponse(response) {
            if (response.isError()) {
                alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            var data = response.getDataTable();
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, {width: 1000, height: 1000, is3D: true});

            // var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
            // chart.draw(data, {width: 1000, height: 1000, is3D: true});

        }

        google.charts.setOnLoadCallback(initialize);

