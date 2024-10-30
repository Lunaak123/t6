document.getElementById('view-first-sheet').addEventListener('click', async () => {
    const excelUrl = document.getElementById('excel-url').value;
    if (!excelUrl) {
        alert("Please enter a valid Excel file URL.");
        return;
    }

    try {
        const response = await fetch(excelUrl);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

        // Directly open the first sheet (if available)
        const firstSheetName = workbook.SheetNames[0];
        if (firstSheetName) {
            window.location.href = `sheet.html?sheetName=${encodeURIComponent(firstSheetName)}&fileUrl=${encodeURIComponent(excelUrl)}`;
        } else {
            document.getElementById('error-message').textContent = "No sheets found in the Excel file.";
        }
    } catch (error) {
        console.error("Error loading Excel file:", error);
        alert("Failed to load the Excel file. Please check the URL and try again.");
    }
});
