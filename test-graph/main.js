window.onload = function () {
	var arrowsData,
			greenLineTemp = 0,
			redLineTemp = 0,
			dataObj = [['Date', 'Red', 'Green']];

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "chart_data", false);

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var chartData = xhr.responseText.substring((xhr.responseText.indexOf('type_of_rho')) - 3);
				arrowsData = JSON.parse(chartData);

				for (var i = 0; i < arrowsData.length; i++) {
					if (arrowsData[i].type_of_rho != 'direct' & arrowsData[i].type_of_rho != 'reverse') {
						continue;
					} else {
						if (arrowsData[i].type_of_rho === 'reverse') {
							arrowsData[i].min_period_id = new Date(arrowsData[i].min_period_id);
							arrowsData[i].max_period_id = new Date (arrowsData[i].max_period_id)
							dataObj.push([arrowsData[i].min_period_id, redLineTemp, +arrowsData[i].tau]);
							dataObj.push([arrowsData[i].max_period_id, redLineTemp, +arrowsData[i].tau]);
							greenLineTemp = arrowsData[i].tau

						} else if (arrowsData[i].type_of_rho === 'direct') {
							arrowsData[i].min_period_id = new Date(arrowsData[i].min_period_id)
							arrowsData[i].max_period_id = new Date(arrowsData[i].max_period_id)
							dataObj.push([arrowsData[i].min_period_id, +arrowsData[i].tau, greenLineTemp]);
							dataObj.push([arrowsData[i].max_period_id, +arrowsData[i].tau, greenLineTemp]);
							redLineTemp = arrowsData[i].tau
						}
					}
				}
			}
		}
	}
	xhr.send();

	google.charts.load('current', {
		callback: function () {
			drawChart();
			window.addEventListener('resize', drawChart, false);
		},
		packages:['corechart']
	});

	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
		var data = google.visualization.arrayToDataTable(dataObj);

		var options = {
			title: 'Test task - "Graph"',
			hAxis: {
				title: 'Date',
				format: 'dd/MM/yyyy',
				titleTextStyle: {
					color: '#333'
				},
				slantedText: false,
				slantedTextAngle: 80
			},
			vAxis: {
				minValue: 0
			},
			explorer: {
				axis: 'horizontal',
				keepInBounds: true,
			},
			colors: ['#cb2747', '#00AC91'],
			pointSize: 3,
			backgroundColor: '#fafbfc',
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	}
}