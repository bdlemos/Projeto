import readCSV from '../model/readCSV';
import writeCSV from '../model/writeCSV';
import { Data } from '../model/data.interface';

class EstoqueService{

  Estoque: Data[] = [];

  async EstoqueService(){
    this.Estoque = await (readCSV('/home/bdlemos/Área de Trabalho/Ijr/Semana3/Projeto/model/Estoque.csv') as Promise<Data[]>);
  }
  
  async salvaEstoque(){
    await writeCSV('/home/bdlemos/Área de Trabalho/Ijr/Semana3/Projeto/model/Estoque.csv', this.Estoque);
  }

  async recuperaEstoque (nome: string){
      for (var i = 0; i < this.Estoque.length; i++){
          if (this.Estoque[i].NOME == nome){
              return this.Estoque[i];
          }
      }
      throw 'Produto não existe';
  }

  listaEstoque(){
    this.Estoque.forEach(element => {
      console.log(element.NOME, ' ', element.QTD, ' ', element.VALOR, ' ', element.PESO);
    });
  }

  async inserir(novo:Data){
    try{
      await this.recuperaEstoque(novo.NOME);
      console.log('Produto já existe');
    }catch (error){
      this.Estoque.push(novo);
    }
  }

  async remove(nome: string){
    var i = 0;
    for (i = 0; i < this.Estoque.length; i++){
      if (this.Estoque[i].NOME == nome){
        this.Estoque.splice(i, 1);
        return this.Estoque;
      }
    }
    throw 'Produto não existe';
  }
}

export default new EstoqueService();

/* const main = async () => {
  try {
    const data = await readCSV('../model/Estoque.csv');
    //console.log('Dados lidos:', data);

    // Testa inserir novo produto
    console.log('Testa inserir novo produto');
    inserirNovoProduto(criaProduto('Arroz', 1, 2, 3), data);
    inserirNovoProduto(criaProduto('Feijão', 1, 2, 3), data);
    listaEstoque(data);

    //Testa remover produto
    //console.log('Testa remover produto');
    //removeProduto('Arroz', data);
    //removeProduto('Feijão', data);
    //removeProduto('Arroz', data);
    listaEstoque(data);

    await writeCSV('../model/Estoque.csv', data);
    console.log('Dados escritos em output.csv');
  } catch (error) {
    console.error('Erro:', error);
  }
};

main(); */
