import { htmlTemplate } from "../../templates/htmlTemplate.js";
import { logger } from "../../utils/logger.js";
import { validateData } from "../../utils/validateData.js";

// AI generated
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function generateTableRows(data) {
  logger.debug("Generating HTML table rows for", data.length, "countries");

  return data
    .map((country, index) => {
      const rowClass = index % 2 === 0 ? "even" : "odd";

      // Escape all text content to prevent XSS
      const safeName = escapeHtml(country.name);
      const safeCapital = escapeHtml(country.capital);
      const safePopulation = escapeHtml(country.population);
      const safeLanguages = escapeHtml(country.languages);
      const safeCurrency = escapeHtml(country.currency);

      const flagImg = country.flag
        ? `<img src="${escapeHtml(country.flag)}" alt="${safeName} flag" width="30" height="20">`
        : "";

      // Store raw data for sorting (remove commas from population for numerical sort)
      const populationForSort = country.population?.replace(/,/g, "") || "0";

      return `
        <tr class="${rowClass}" data-name="${safeName}" data-capital="${safeCapital}" data-population="${populationForSort}" data-languages="${safeLanguages}" data-currency="${safeCurrency}">
            <td>${flagImg}</td>
            <td>${safeName}</td>
            <td>${safeCapital}</td>
            <td>${safePopulation}</td>
            <td>${safeLanguages}</td>
            <td>${safeCurrency}</td>
        </tr>`;
    })
    .join("");
}

export function toHTML(data, title = "Countries Report") {
  validateData(data);
  const safeTitle = escapeHtml(title);
  const timestamp = new Date().toLocaleString();
  const tableRows = generateTableRows(data);

  // Replace template placeholders with actual content
  const html = htmlTemplate
    .replace(/{{TITLE}}/g, safeTitle)
    .replace(/{{TIMESTAMP}}/g, timestamp)
    .replace(/{{TABLE_ROWS}}/g, tableRows);

  logger.success("HTML document generated successfully");
  return html;
}
