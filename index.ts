import {recuperaProduto ,AtualizaCSV, adicionarProduto, carregaEstoque, criaProduto,listaEstoque, removeProduto} from './controller/toBolado';
import { Data } from './model/data.interface';

const main = async () => {
  try {
    await carregaEstoque();
    await adicionarProduto(criaProduto('Feijao', 1, 2, 3));
    await adicionarProduto(criaProduto('batatinha', 1, 2, 3));
    await removeProduto('Feijao');
    listaEstoque();
    AtualizaCSV();

  } catch (error) {
    console.error('Erro:', error);
  }
};

main();