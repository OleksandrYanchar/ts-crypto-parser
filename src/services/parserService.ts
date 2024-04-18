import axios from 'axios';
import cheerio from 'cheerio';
import { Reports } from '../models/reports.js'; 
import { extractNames } from '../utils/CoinNames.js';

interface ReportData {
  shortName: string;
  readableName: string;
  price: number;
  generatedDate: string;
  generatedTime: string;
}

export class CryptoParser {
  baseUrl: string;

  constructor(baseUrl = process.env.PARCED_SITE) {
    if (!baseUrl) {
        console.error("Base URL is not defined. Check environment variables.");
        throw new Error("Base URL is undefined");
    }
    this.baseUrl = baseUrl;
    console.log(`CryptoParser initialized with URL: ${this.baseUrl}`);
}


  
  async fetchData(): Promise<string> {
    console.log(`Making request to: ${this.baseUrl}`);  // Confirm URL is correct
    try {
      const response = await axios.get(this.baseUrl, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
      });
      console.log('Data fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response ? {
          status: error.response.status,
          headers: error.response.headers,
          data: error.response.data
        } : 'No response received');
      } else {
        console.error('Non-Axios error:', error);
      }
      throw new Error('Failed to fetch HTML content');
    }
  }
  
  

  parseData(html: string, shortNames?: string[]): ReportData[] {
    const $ = cheerio.load(html);
    const cryptos: ReportData[] = [];

    $('tbody tr').each((index, element) => {
        const combinedName = $(element).find('td:nth-child(3) div a p').text().trim(); // Assuming this selector finds the combined name
        const priceText = $(element).find('td:nth-child(4) div a span').text().trim();
        const price = parseFloat(priceText.replace(/[$,]/g, ''));

        // Regex to extract the uppercase short name and the preceding readable name
        const match = combinedName.match(/([A-Za-z ]+)([A-Z]{2,5})$/);
        if (match && !isNaN(price)) {
          const { shortName, readableName } = extractNames(match[0]); 

            const today = new Date();
            const dateString = today.toISOString().split('T')[0];
            const timeString = today.toTimeString().split(' ')[0];

            cryptos.push({
                shortName,
                readableName,
                price,
                generatedDate: dateString,
                generatedTime: timeString
            });
        } else {
            console.log(`Skipped entry due to missing or invalid data: ${combinedName}, ${price}`);
        }
    });

    console.log('Parsed Cryptos:', cryptos.length > 0 ? cryptos : 'No cryptos found');
    return cryptos;
}






async saveDataToDB(data: ReportData[]): Promise<void> {
  for (const entry of data) {
      if (!entry.readableName) {
          console.error('Invalid data entry missing readableName:', entry);
          continue;  // Skip saving this particular entry
      }
      try {
          await Reports.create(entry);
          console.log('Data saved to database successfully');
      } catch (error) {
          console.error('Failed to save data to the database:', error);
          throw new Error('Failed to save data to the database');
      }
  }
}

}