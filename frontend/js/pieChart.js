function drawIncomeChart(incomeData) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        const data = new google.visualization.arrayToDataTable(incomeData);

        const options = {
            title: 'Income Chart',
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
            document.getElementById('incomeChart')
        );
        chart.draw(data, options);
    });
}

async function getIncome() {
    try {
        const allIncome = await fetch(
            `http://localhost:3000/api/incomes/${userID}/all`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );

        if (!allIncome.ok) {
            throw new Error('Failed to fetch income');
        }

        const response = await allIncome.json();
        let incomeData = response.data;

        if (!Array.isArray(incomeData)) {
            if (incomeData.category && incomeData.amount) {
                incomeData = [incomeData];
            } else {
                throw new Error('Income data is not in the expected format');
            }
        }

        const aggregatedData = incomeData.reduce((acc, income) => {
            if (acc[income.category]) {
                acc[income.category] += income.amount;
            } else {
                acc[income.category] = income.amount;
            }
            return acc;
        }, {});

        const chartData = [['Category', 'Amount']];
        Object.keys(aggregatedData).forEach(category => {
            chartData.push([category, aggregatedData[category]]);
        });

        drawIncomeChart(chartData);
    } catch (error) {
        console.error('Error fetching income:', error);
    }
}

function refreshCharts() {
    getIncome();
    getOutcome();
}

function drawOutcomeChart(outcomeData) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
        const data = new google.visualization.arrayToDataTable(outcomeData);

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
            document.getElementById('outcomeChart')
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

        drawOutcomeChart(chartData);
    } catch (error) {
        console.error('Error fetching outcomes:', error);
    }
}

async function refreshChart() {
    getIncome();
    getOutcome();
}

getIncome();
getOutcome();
setInterval(refreshCharts, 1000); // Update the charts with data every 1 second
