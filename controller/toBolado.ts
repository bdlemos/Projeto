import serviceEstoque from "../service/serviceEstoque";
import {Data} from "../model/data.interface";

export async function adicionarProduto(data:Data){
    await serviceEstoque.inserir(data);
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
    await serviceEstoque.remove(nome);
}

export async function recuperaProduto(nome: string){
    return await serviceEstoque.recuperaEstoque(nome);
}