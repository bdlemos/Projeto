import readCSV from '../model/readCSV';
import writeCSV from '../model/writeCSV';
import { Data } from '../model/data.interface';

class EstoqueService {

  Estoque: Data[] = [];
  /**
  * Lê o arquivo CSV e armazena os dados em um array
  */
  async EstoqueService() {

    this.Estoque = await (readCSV('model/Estoque.csv') as Promise<Data[]>);
  }
  /**
  * Salva os dados do array em um arquivo CSV
  */
  async salvaEstoque() {
    
    await writeCSV('model/Estoque.csv', this.Estoque);
  }

  /**
   * Recupera um produto do estoque
   */
  async recuperaEstoque(nome: string) {
    for (var i = 0; i < this.Estoque.length; i++) {
      if (this.Estoque[i].NOME == nome) {
        return this.Estoque[i];
      }
    }
    throw 'Produto não existe';
  }

  /**
   * Lista todos os produtos do estoque
   */
  listaEstoque() {
    this.Estoque.forEach(element => {
      console.log('NOME:', element.NOME, ' QTD:', element.QTD, ' VALOR:', element.VALOR, ' PESO:', element.PESO);
    });
  }
  /**
   * Insere um novo produto no estoque
   */
  async inserir(novo: Data) {
    try {
      await this.recuperaEstoque(novo.NOME);
      console.log('Produto já existe');
    } catch (error) {
      this.Estoque.push(novo);
      this.salvaEstoque();
      console.log('Produto adicionado com sucesso');
    }
  }

  /**
 * Remove um produto do estoque
 */
  async remove(nome: string) {
    var i = 0;
    for (i = 0; i < this.Estoque.length; i++) {
      if (this.Estoque[i].NOME == nome) {
        this.Estoque.splice(i, 1);
        this.salvaEstoque();
        return;
      }
    }
    throw 'Produto não existe';
  }
}

export default new EstoqueService();