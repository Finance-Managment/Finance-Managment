// Function to draw income chart
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

// Function to fetch income data
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

// Function to draw outcome chart
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

// Function to fetch outcome data
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

// Function to refresh both income and outcome charts
function refreshCharts() {
    getIncome();
    getOutcome();
}

// Function to reset the charts every month
function resetChartsMonthly() {
    // Reset the charts initially
    refreshCharts();

    // Set interval to refresh charts every month
    setInterval(() => {
        // Reset the charts
        refreshCharts();

        // Calculate milliseconds until the end of the current month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const remainingMilliseconds = endOfMonth - currentDate;

        // Set interval to refresh charts every month
        setTimeout(resetChartsMonthly, remainingMilliseconds);
    }, 1000); // Check every second for the end of the month
}

// Call the function to reset charts monthly
resetChartsMonthly();
