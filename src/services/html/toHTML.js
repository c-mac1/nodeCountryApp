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
        <tr class="${rowClass}">
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
    
    <table>
        <thead>
            <tr>
                <th>Flag</th>
                <th>Country</th>
                <th>Capital</th>
                <th>Population</th>
                <th>Languages</th>
                <th>Currency</th>
            </tr>
        </thead>
        <tbody>
            ${tableRows}
        </tbody>
    </table>
</body>
</html>`;
}
