document.addEventListener('DOMContentLoaded', function () {
    // Assuming currencies is an array of currency codes, e.g., ['USD', 'EUR', ...]
    const currencies = [
        'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN',
        'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL',
        'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY',
        'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP',
        'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS',
        'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF',
        'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD',
        'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT',
        'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD',
        'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN',
        'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK',
        'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR',
        'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SOS', 'SRD', 'SSP',
        'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD',
        'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND',
        'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL'
    ];

    // Get the select elements   
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    // Dynamically generate options for each currency
    currencies.forEach(currencyCode => {
        const option = document.createElement('option');
        option.value = currencyCode;
        option.textContent = currencyCode;

        // Append options to both select elements
        fromCurrencySelect.appendChild(option.cloneNode(true));
        toCurrencySelect.appendChild(option);
    });
});

const getButtonClicked = async () => {
    const fromDropdown = document.getElementById('fromCurrency');
    // Get the selected index
    const selectedFromIndex = fromDropdown.selectedIndex;
    // Get the selected option
    const selectedFromOption = fromDropdown.options[selectedFromIndex];
    // Access the value and text of the selected option
    const selectedFromValue = selectedFromOption.value;
    const selectedFromText = selectedFromOption.text;


    const toDropdown = document.getElementById('toCurrency');
    // Get the selected index
    const selectedToIndex = toDropdown.selectedIndex;
    // Get the selected option
    const selectedToOption = toDropdown.options[selectedToIndex];
    // Access the value and text of the selected option
    const selectedToValue = selectedToOption.value;
    const selectedToText = selectedToOption.text;


    console.log(selectedFromValue + ' To ' + selectedToValue);

    const apiKey = '65d21c244c96c663c335dd54';

    const baseCurrency = selectedFromValue;

    const targetCurrency = selectedToValue;

    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}`;

    var conversionRate = 0

    

    // fetch(apiUrl)
    //     .then(response => response.json())
    //     .then(data => {

    //         if (data.result == 'success') {
    //             conversionRate = data.conversion_rate;
    //             console.log(conversionRate)

    //         }
    //         else {
    //             console.log('Error in getting conversion rate')
    //         }
    //     })
    //     .catch(error => {
    //         // Handle network or other errors
    //         console.error('Fetch error:', error);
    //     });
    
    try {
        // Use async/await to wait for the fetch to complete
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.result === 'success') {
            conversionRate = data.conversion_rate;
            console.log(conversionRate);
        };

        const inputNumber = document.getElementById('amount')
        const inputValue = inputNumber.value;
        console.log(inputValue) 
    
        const resultDisplay = document.getElementById('resultDisplay');
    
        if ((inputValue<=0) || (inputValue==null)) {
            resultDisplay.textContent = 'Please enter valid amount';
        }
    
        else {
            const resultingValue = inputValue * conversionRate;
            console.log(inputValue + ' times ' + conversionRate + ' equals ' + resultingValue);
            const roundedResultingValue = resultingValue.toFixed(2);
            resultDisplay.textContent = roundedResultingValue;
        }
    }

        catch (error) {
        console.error('Fetch error:', error);
        }

    



};