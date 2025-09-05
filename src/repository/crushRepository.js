import { connection } from "./connections.js";

export async function listarCrush() {
  const comando = `
    select *
      from crush
  `;

  let [registros] = await connection.query(comando);
  return registros;
}


export async function inserirCrush(novoCrush) {
  const comando = `
    INSERT INTO crush (nome, idade, genero, cidade, interesses, data_conheceu, tem_contato, nota_paixao, status_relacionamento)
               values (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  let [info] = await connection.query(comando, [
    novoCrush.nome, 
    novoCrush.idade, 
    novoCrush.genero, 
    novoCrush.cidade, 
    novoCrush.interesses, 
    novoCrush.data_conheceu, 
    novoCrush.tem_contato, 
    novoCrush.nota_paixao, 
    novoCrush.status_relacionamento])
  return info.insertId;
}

export async function consultarCrush(id) {
  const comando = `
    SELECT * 
      FROM crush
     WHERE id = ?
  `

  let [registros] = await connection.query(comando, [id]);
  return registros[0];
}


export async function filtrarPorNome(nome) {
  const comando = `
    SELECT * 
      FROM crush
     WHERE nome like ?
  `

  let [registros] = await connection.query(comando, ['%'+nome+'%']);
  return registros;
}

export async function alterarCrush(id, novosDados) {
  const comando = `
    UPDATE crush
       SET nome = ?,
           idade = ?,
           genero = ?,
           cidade = ?,
           interesses = ?,
           data_conheceu = ?,
           tem_contato = ?,
           nota_paixao = ?,
           status_relacionamento = ?
     WHERE id = ?
  `

  let [info] = await connection.query(comando, [
    novosDados.nome, 
    novosDados.idade, 
    novosDados.genero, 
    novosDados.cidade, 
    novosDados.interesses, 
    novosDados.data_conheceu, 
    novosDados.tem_contato, 
    novosDados.nota_paixao, 
    novosDados.status_relacionamento,
    id
  ])
}


export async function deletarCrush(id) {
  const comando = `
    DELETE FROM crush
          WHERE id = ?
  `

  let [info] = await connection.query(comando, [id]);
}

export async function alterarImagemCrush(id, caminho) {
  const comando = `
    UPDATE crush
       SET img_crush = ?
     WHERE id = ?
  `

  const [info] = await connection.query(comando, [caminho, id])
}