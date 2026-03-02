

export function processCountryData(countries) {
    console.log('Processing country data...');
    
    return countries
        .map(country => {
            const name = country.name?.common || 'N/A';
            const capital = country.capital?.[0] || 'N/A';
            const population = country.population?.toLocaleString() || 'N/A';
            
            const languages = country.languages 
                ? Object.values(country.languages).join(', ')
                : 'N/A';
            
            let currency = 'N/A';
            if (country.currencies) {
                const currencyKey = Object.keys(country.currencies)[0];
                if (currencyKey) {
                    const curr = country.currencies[currencyKey];
                    currency = curr.symbol 
                        ? `${curr.name} (${curr.symbol})` 
                        : curr.name || 'Unknown';
                }
            }
            
            return {
                name,
                capital,
                population,
                languages,
                currency,
                flag: country.flags?.png || ''
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}