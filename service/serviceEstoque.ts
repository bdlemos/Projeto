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
    var i = 0;
    for (i = 0; i < data.length; i++){
        if (data[i].nome == nome){
            return data[i];
        }
    }
    return {nome: '', peso: 0, valor: 0, qtd: 0};
}

const listaEstoque = (data:Data[]) =>{
  data.forEach(element => {
    console.log(element.nome, ' ', element.qtd, ' ', element.valor, ' ', element.peso);
  });
}

const criaProduto = (nome: string, peso: number, valor: number, qtd: number): Data =>{
  return {nome: nome, peso: peso, valor: valor, qtd: qtd};
}

const inserirNovoProduto = (novo:Data, data:Data[]): Data[] =>{
  if(recuperaEstoque(novo.nome, data).nome == novo.nome){
    throw 'Produto já existe';
  }
  data.push(novo);
  return data;
}

const removeProduto = (nome: string, data:Data[]): Data[] =>{
  var i = 0;
  for (i = 0; i < data.length; i++){
    if (data[i].nome == nome){
      data.splice(i, 1);
      return data;
    }
  }
  throw 'Produto não existe';
}

const main = async () => {
  try {
    const data = await readCSV('Estoque.csv');
    //console.log('Dados lidos:', data);

    // Testa inserir novo produto
    console.log('Testa inserir novo produto');
    inserirNovoProduto(criaProduto('Arroz', 1, 2, 3), data);
    inserirNovoProduto(criaProduto('Feijão', 1, 2, 3), data);
    listaEstoque(data);

    //Testa remover produto
    console.log('Testa remover produto');
    removeProduto('Arroz', data);
    removeProduto('Feijão', data);
    removeProduto('Arroz', data);
    listaEstoque(data);

    await writeCSV('Estoque.csv', data);
    console.log('Dados escritos em output.csv');
  } catch (error) {
    console.error('Erro:', error);
  }
};

main();
