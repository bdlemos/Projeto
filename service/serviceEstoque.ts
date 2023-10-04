import fs from 'fs';
import csv from 'csv-parser';

interface Data {
    nome: string;
    peso: number;
    valor: number;
    qtd: number;
}


const readCSV = async (filePath: string): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const results: Data[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: Data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'nome', title: 'nome' },
      { id: 'peso', title: 'peso' },
      { id: 'valor', title: 'valor'},
      { id: 'qtd', title: 'qtd'},
    ],
  });

  return csvWriter.writeRecords(data);
};

const recuperaEstoque = (nome: string, data:Data[]): Data =>{
    var estoque = data;
    var i = 0;
    while (estoque[i].nome != nome){
        i++;
    }
    return estoque[i];
}

const listaEstoque = (data:Data[]) =>{
  data.forEach(element => {
    console.log(element.nome, ' ', element.qtd, ' ', element.valor, ' ', element.peso);
  });
}

const main = async () => {
  try {
    const data = await readCSV('Estoque.csv');
    //console.log('Dados lidos:', data);

    var jimbe = [ { nome: 'Arroz', peso: 1, valor: 10, qtd:1}, { nome: 'Feijão', peso: 1, valor: 5, qtd:100}, { nome: 'Macarrão', peso: 1, valor: 20, qtd:13}];
    //console.log(recuperaEstoque('Arroz', data));
    listaEstoque(data);

    await writeCSV('Estoque.csv', jimbe);
    console.log('Dados escritos em output.csv');
  } catch (error) {
    console.error('Erro:', error);
  }
};

main();
