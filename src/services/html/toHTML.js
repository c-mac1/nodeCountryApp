// Ai generated

export function toHTML(data, title = "Countries Report") {
  const timestamp = new Date().toLocaleString();

  const tableRows = data
    .map((country, index) => {
      const rowClass = index % 2 === 0 ? "even" : "odd";
      const flagImg = country.flag
        ? `<img src="${country.flag}" alt="${country.name} flag" width="30" height="20">`
        : "";

      return `
        <tr class="${rowClass}" data-name="${country.name}" data-capital="${country.capital}" data-population="${country.population?.replace(/,/g, "") || "0"}" data-languages="${country.languages}" data-currency="${country.currency}">
            <td>${flagImg}</td>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.population}</td>
            <td>${country.languages}</td>
            <td>${country.currency}</td>
        </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f5f5f5;
        }
        
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 10px;
        }
        
        .timestamp {
            text-align: center;
            color: #666;
            font-style: italic;
            margin-bottom: 30px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        th {
            background-color: #4CAF50;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: bold;
            cursor: pointer;
            user-select: none;
            position: relative;
        }
        
        th:hover {
            background-color: #45a049;
        }
        
        th.sortable::after {
            content: '↕';
            margin-left: 8px;
            font-size: 12px;
        }
        
        th.sort-asc::after {
            content: '↑';
            margin-left: 8px;
            font-size: 12px;
        }
        
        th.sort-desc::after {
            content: '↓';
            margin-left: 8px;
            font-size: 12px;
        }
        
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #ddd;
        }
        
        tr.even {
            background-color: #f9f9f9;
        }
        
        tr.odd {
            background-color: white;
        }
        
        tr:hover {
            background-color: #f0f8ff;
        }
        
        img {
            border: 1px solid #ddd;
            border-radius: 2px;
        }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <p class="timestamp">Report generated on: ${timestamp}</p>
    
    <table id="countriesTable">
        <thead>
            <tr>
                <th>Flag</th>
                <th class="sortable" data-column="name" data-type="text">Country</th>
                <th class="sortable" data-column="capital" data-type="text">Capital</th>
                <th class="sortable" data-column="population" data-type="number">Population</th>
                <th class="sortable" data-column="languages" data-type="text">Languages</th>
                <th class="sortable" data-column="currency" data-type="text">Currency</th>
            </tr>
        </thead>
        <tbody>
            ${tableRows}
        </tbody>
    </table>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const table = document.getElementById('countriesTable');
        const headers = table.querySelectorAll('th.sortable');
        let currentSort = { column: null, direction: 'asc' };
        
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const column = this.dataset.column;
                const type = this.dataset.type;
                
                // Toggle sort direction
                if (currentSort.column === column) {
                    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSort.direction = 'asc';
                }
                
                currentSort.column = column;
                
                // Update header styles
                headers.forEach(h => {
                    h.classList.remove('sort-asc', 'sort-desc');
                });
                
                this.classList.add(currentSort.direction === 'asc' ? 'sort-asc' : 'sort-desc');
                
                // Sort the table
                sortTable(column, type, currentSort.direction);
            });
        });
        
        function sortTable(column, type, direction) {
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            rows.sort((a, b) => {
                let aVal = a.dataset[column];
                let bVal = b.dataset[column];
                
                if (type === 'number') {
                    aVal = parseInt(aVal) || 0;
                    bVal = parseInt(bVal) || 0;
                    return direction === 'asc' ? aVal - bVal : bVal - aVal;
                } else {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                    if (direction === 'asc') {
                        return aVal.localeCompare(bVal);
                    } else {
                        return bVal.localeCompare(aVal);
                    }
                }
            });
            
            // Re-add rows and update row classes
            rows.forEach((row, index) => {
                row.className = index % 2 === 0 ? 'even' : 'odd';
                tbody.appendChild(row);
            });
        }
    });
    </script>
</body>
</html>`;
}
