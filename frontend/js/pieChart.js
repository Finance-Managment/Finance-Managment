const refreshInterval = 5000; // Refresh every 5 seconds (adjust as needed)

function updateChart() {
    getOutcome();
}

setInterval(updateChart, refreshInterval);

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
        const outcomeData = response.data;
        // console.log(outcomeData);

        if (!Array.isArray(outcomeData)) {
            if (outcomeData.category && outcomeData.amount) {
                outcomeData = [outcomeData];
            } else {
                throw new Error('Outcome data is not in the expected format');
            }
        }

        const chartData = [['Category', 'Amount']];
        outcomeData.forEach(outcome => {
            chartData.push([outcome.category, outcome.amount]);
        });

        drawChart(chartData);
    } catch (error) {
        console.error('Error fetching outcomes:', error);
    }
}

function drawChart(chartData) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        const data = new google.visualization.arrayToDataTable(chartData);

        const options = {
            title: 'Outcome Chart'
        };

        const chart = new google.visualization.PieChart(document.getElementById('pieChart'));
        chart.draw(data, options);
    });
}

getOutcome();
