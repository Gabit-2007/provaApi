import { connection } from "./connections.js";

export async function listarCarros() {
  const comando = `
    select *
      from carros3
  `;

  let [registros] = await connection.query(comando);
  return registros;
}


export async function inserirCarros(novoCarros) {
  const comando = `
    INSERT INTO carros3 (marca, modelo, ano_fabricacao, ano_modelo, cor, placa, chassi, tipo_combustivel, quilometragem, preco, descricao, criado_em, atualizado_em)
               values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  let [info] = await connection.query(comando, [novoCarros.marca, novoCarros.modelo, novoCarros.ano_fabricacao, novoCarros.ano_modelo, novoCarros.cor, novoCarros.placa, novoCarros.chassi, novoCarros.tipo_combustivel, novoCarros.quilometragem, novoCarros.preco, novoCarros.descricao, novoCarros.criado_em, novoCarros.atualizado_em])
  return info.insertId;
}

export async function consultarCarros(id) {
  const comando = `
    SELECT * 
      FROM carros3
     WHERE id = ?
  `

  let [registros] = await connection.query(comando, [id]);
  return registros[0];
}


export async function filtrarPorNome(nome) {
  const comando = `
    SELECT * 
      FROM carros3
     WHERE nome like ?
  `

  let [registros] = await connection.query(comando, ['%'+nome+'%']);
  return registros;
}

export async function alterarCarros(id, novosDados) {
  const comando = `
    UPDATE carros3
       SET marca = ?, 
           modelo = ?, 
           ano_fabricacao = ?, 
           ano_modelo = ?, 
           cor = ?, 
           placa = ?, 
           chassi = ?, 
           tipo_combustivel = ?, 
           quilometragem = ?, 
           preco = ?,
           descricao = ?,
           criado_em = ?,
           atualizado_em = ?
     WHERE id = ?
  `

  let [info] = await connection.query(comando, [
    novosDados.marca,
    novosDados.modelo,
    novosDados.ano_fabricacao,
    novosDados.ano_modelo,
    novosDados.cor,
    novosDados.placa,
    novosDados.chassi,
    novosDados.tipo_combustivel,
    novosDados.quilometragem,
    novosDados.preco,
    novosDados.descricao,
    novosDados.criado_em,
    novosDados.atualizado_em,
    id
  ])
}

export async function deletarCarros(id) {
    const comando = `
      DELETE FROM carros3
            WHERE id = ?
    `
  
    let [info] = await connection.query(comando, [id]);
  }