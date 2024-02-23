function drawChart(chartData) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        const data = new google.visualization.arrayToDataTable(chartData);

        const options = {
            title: 'Outcome Chart',
            backgroundColor: 'transparent',
            titleTextStyle: {
                color: '#444', // Change the text color here
            },
            legend: {
                textStyle: {
                    color: '#444', // Change the text color of legend here
                },
            },
        };

        const chart = new google.visualization.PieChart(
            document.getElementById('pieChart')
        );
        chart.draw(data, options);
    });
}

async function getOutcome() {
    try {
        const allOutcomes = await fetch(
            `http://localhost:3000/api/outcomes/${userID}/all`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );

        if (!allOutcomes.ok) {
            throw new Error('Failed to fetch outcomes');
        }

        const response = await allOutcomes.json();
        let outcomeData = response.data;

        if (!Array.isArray(outcomeData)) {
            if (outcomeData.category && outcomeData.amount) {
                outcomeData = [outcomeData];
            } else {
                throw new Error('Outcome data is not in the expected format');
            }
        }

        const aggregatedData = outcomeData.reduce((acc, outcome) => {
            if (acc[outcome.category]) {
                acc[outcome.category] += outcome.amount;
            } else {
                acc[outcome.category] = outcome.amount;
            }
            return acc;
        }, {});

        const chartData = [['Category', 'Amount']];
        Object.keys(aggregatedData).forEach(category => {
            chartData.push([category, aggregatedData[category]]);
        });

        drawChart(chartData);
    } catch (error) {
        console.error('Error fetching outcomes:', error);
    }
}

function refreshChart() {
    getOutcome();
}
getOutcome();
setInterval(refreshChart, 1000); // Update the chart with data every 1 seconds
