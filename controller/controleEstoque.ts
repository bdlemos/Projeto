import serviceEstoque from "../service/serviceEstoque";
import {Data} from "../model/data.interface";

export async function adicionarProduto(data:Data){
    try{
        await serviceEstoque.inserir(data);
    }catch (error){
        console.log(error);
    }
}

export function criaProduto(nome: string, peso: number, valor: number, qtd: number){
    return {NOME: nome, PESO: peso, VALOR: valor, QTD: qtd} as Data;
}

export function listaEstoque(){
    serviceEstoque.listaEstoque();
}

export async function AtualizaCSV(){
    await serviceEstoque.salvaEstoque();
}

export async function carregaEstoque(){
    await serviceEstoque.EstoqueService();
}

export async function removeProduto(nome: string){
    try{
        await serviceEstoque.remove(nome);
        console.log('Produto removido com sucesso');
    }catch (error){
        console.log(error);
    }
}

export async function recuperaProduto(nome: string){
    return await serviceEstoque.recuperaEstoque(nome);
}

export async function valorTotal (){
    return serviceEstoque.Estoque.reduce((total, element) => {
        return total + element.VALOR*element.QTD;},0);
}

// peso total
export async function pesoTotal (){
    return serviceEstoque.Estoque.reduce((total, element) => {
        return total + element.PESO*element.QTD;},0);
}

//media de peso do estoque
export async function mediaPeso (){
    return await pesoTotal()/await qtdTotalItems();
}

export async function mediaValor (){
    return await valorTotal()/await qtdTotalItems();
}

export async function qtdTotalItems (){
    return serviceEstoque.Estoque.reduce((total, element) => {
        return total + element.QTD*1;
    },0);
}

export async function qtdTotalProdutos (){
    return serviceEstoque.Estoque.length;
}