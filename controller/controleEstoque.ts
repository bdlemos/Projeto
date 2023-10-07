import serviceEstoque from "../service/serviceEstoque";
import {Data} from "../model/data.interface";

/**
 * Adiciona um novo produto ao estoque
 * @param data
 */
export async function adicionarProduto(data:Data){
    try{
        await serviceEstoque.inserir(data);
    }catch (error){
        console.log(error);
    }
}

/*
* Cria um produto
*/
export function criaProduto(nome: string, peso: number, valor: number, qtd: number){
    return {NOME: nome, PESO: peso, VALOR: valor, QTD: qtd} as Data;
}

/**
 * Lista todos os produtos do estoque
 */
export function listaEstoque(){
    serviceEstoque.listaEstoque();
}

/**
 * Atualiza o arquivo CSV
 */
export async function AtualizaCSV(){
    await serviceEstoque.salvaEstoque();
}

/**
 * Carrega o estoque
 */
export async function carregaEstoque(){
    await serviceEstoque.EstoqueService();
}

/**
 * Remove um produto do estoque
 * @param nome
 */
export async function removeProduto(nome: string){
    try{
        await serviceEstoque.remove(nome);
        console.log('Produto removido com sucesso');
    }catch (error){
        console.log(error);
    }
}

/**
 * Recupera um produto do estoque
 * @param nome
 */
export async function recuperaProduto(nome: string){
    return await serviceEstoque.recuperaEstoque(nome);
}

/**
 * Retorna o valor total do estoque
 */
export async function valorTotal (){
    return serviceEstoque.Estoque.reduce((total, element) => {
        return total + element.VALOR*element.QTD;},0);
}

/*
* Retorna o peso total do estoque
*/
export async function pesoTotal (){
    return serviceEstoque.Estoque.reduce((total, element) => {
        return total + element.PESO*element.QTD;},0);
}

/*
* Retorna a média de peso dos itens do estoque
*/
export async function mediaPeso (){
    return await pesoTotal()/await qtdTotalItems();
}

/*
* Retorna a média de valor dos itens do estoque
*/
export async function mediaValor (){
    return await valorTotal()/await qtdTotalItems();
}

/*
* Retorna a quantidade total de itens do estoque
*/
export async function qtdTotalItems (){
    return serviceEstoque.Estoque.reduce((total, element) => {
        return total + element.QTD*1;
    },0);
}

/*
* Retorna a quantidade total de produtos únicos do estoque
*/
export async function qtdTotalProdutos (){
    return serviceEstoque.Estoque.length;
}