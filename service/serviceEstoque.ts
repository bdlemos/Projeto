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
      console.log('NOME:',element.NOME, ' QTD:', element.QTD, ' VALOR:', element.VALOR, ' PESO:', element.PESO);
    });
  }

  async inserir(novo:Data){
    try{
      await this.recuperaEstoque(novo.NOME);
      console.log('Produto já existe');
    }catch (error){
      this.Estoque.push(novo);
      this.salvaEstoque();
      console.log('Produto adicionado com sucesso');
    }
  }

  async remove(nome: string){
    var i = 0;
    for (i = 0; i < this.Estoque.length; i++){
      if (this.Estoque[i].NOME == nome){
        this.Estoque.splice(i, 1);
        this.salvaEstoque();
        return;
      }
    }
    throw 'Produto não existe';
  }
}

export default new EstoqueService();