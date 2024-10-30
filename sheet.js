// Function to load the Google Sheets API
function init() {
    gapi.load('client', {
        callback: () => {
            console.log('Google API client loaded.');
            loadSheetsApi();
        },
        onerror: (error) => {
            console.error('Error loading GAPI client for API', error);
        }
    });
}

// Load the Google Sheets API
function loadSheetsApi() {
    gapi.client.load('sheets', 'v4', () => {
        console.log('Google Sheets API loaded.');
        fetchData();
    });
}

// Fetch data from Google Sheets
function fetchData() {
    const sheetId = 'YOUR_SHEET_ID'; // Replace with your Sheet ID
    const range = 'Sheet1!A2:E'; // Adjust range as needed

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range,
    }).then(response => {
        const data = response.result.values;
        if (data && data.length > 0) {
            processData(data);
        } else {
            console.log('No data found.');
        }
    }, error => {
        console.error('Error fetching data from Google Sheets:', error);
    });
}

// Process data from the sheet
function processData(data) {
    const results = [];

    data.forEach((row, index) => {
        // Check for empty cells in the row
        if (row.length > 0 && row.some(cell => cell.trim() !== '')) {
            results.push(row);
        }
    });

    displayResults(results);
}

// Display results in the HTML
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No valid data found.</p>';
        return;
    }

    results.forEach((row, index) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        rowDiv.innerHTML = row.join(' | '); // Join row data with a separator
        resultsContainer.appendChild(rowDiv);
    });
}

// Event listener for applying operations
document.getElementById('applyOperations').addEventListener('click', function () {
    const operation = document.getElementById('operationSelect').value;
    // Implement operation logic here (if applicable)
});

// Initialize the app
function start() {
    gapi.load('client', init);
}

// Run the app
start();
