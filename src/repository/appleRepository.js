import { connection } from "./connections.js";

export async function listarProd() {
  const comando = `
    select *
      from produtos_apple1
  `;

  let [registros] = await connection.query(comando);
  return registros;
}


export async function inserirProd(novoProduto) {
  const comando = `
    INSERT INTO produtos_apple1 (nome, categoria, modelo, capacidade_armazenamento, cor, preco, data_lancamento, status, descricao, criado_em, atualizado_em)
               values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  let [info] = await connection.query(comando, [novoProduto.nome, novoProduto.categoria, novoProduto.modelo, novoProduto.capacidade_armazenamento, novoProduto.cor, novoProduto.preco, novoProduto.data_lancamento, novoProduto.status, novoProduto.descricao, novoProduto.criado_em, novoProduto.atualizado_em])
  return info.insertId;
}

export async function consultarProd(id) {
  const comando = `
    SELECT * 
      FROM produtos_apple1
     WHERE id = ?
  `

  let [registros] = await connection.query(comando, [id]);
  return registros[0];
}


export async function filtrarPorNome(nome) {
  const comando = `
    SELECT * 
      FROM produtos_apple1
     WHERE nome like ?
  `

  let [registros] = await connection.query(comando, ['%'+nome+'%']);
  return registros;
}

export async function alterarProd(id, novosDados) {
  const comando = `
    UPDATE produtos_apple1
       SET nome = ?,
           categoria = ?,
           modelo = ?,
           capacidade_armazenamento = ?,
           cor = ?,
           preco = ?,
           data_lancamento = ?,
           status = ?,
           descricao = ?,
           criado_em = ?,
           atualizado_em = ?
     WHERE id = ?
  `

  let [info] = await connection.query(comando, [
    novosDados.nome,
    novosDados.categoria,
    novosDados.modelo,
    novosDados.capacidade_armazenamento,
    novosDados.cor,
    novosDados.preco,
    novosDados.data_lancamento,
    novosDados.status,
    novosDados.descricao,
    novosDados.criado_em,
    novosDados.atualizado_em,
    id
  ])
}

export async function deletarProd(id) {
    const comando = `
      DELETE FROM produtos_apple1
            WHERE id = ?
    `
  
    let [info] = await connection.query(comando, [id]);
  }