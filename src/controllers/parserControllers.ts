// src/controllers/cryptoController.ts
import { Request, Response } from 'express';
import { CryptoParser } from '../services/parserService.js';
import Reports from '../models/reports.js';
import { CONNREFUSED } from 'dns';


export async function parseCryptoData(req: Request, res: Response): Promise<void> {
  // Get the base URL from an environment variable or default to a specific URL
  const baseUrl = process.env.BASE_URL || 'https://coinmarketcap.com/';
  const shortNames: string[] = req.body.shortNames;
  const parser = new CryptoParser(baseUrl);

  try {
    console.log(`Making request to: ${baseUrl}`);
    const html = await parser.fetchData();
    const parsedData = parser.parseData(html, shortNames);
    await parser.saveDataToDB(parsedData);
    res.status(200).json({
      message: 'Data parsed and saved successfully',
      data: parsedData
    });
  } catch (error) {
    const message = (error as Error).message;
    console.error('Error during parsing and saving:', message);
    res.status(500).json({
      message: 'Failed to parse and save data',
      error: message
    });
  }
}
export const getAllReports = async (req: Request, res: Response) => {
        try {
          const reports = await Reports.find({});
          res.json(reports);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching reports', error: error });
        }
      };