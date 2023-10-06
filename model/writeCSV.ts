import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { Data } from './data.interface';

const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'NOME', title: 'NOME' },
      { id: 'PESO', title: 'PESO' },
      { id: 'VALOR', title: 'VALOR'},
      { id: 'QTD', title: 'QTD'},
    ],
  });

  return csvWriter.writeRecords(data);
};

export default writeCSV;