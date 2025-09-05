import { connection } from "./connections.js";

export async function listarCursos() {
  const comando = `
    select *
      from curso
  `;

  let [registros] = await connection.query(comando);
  return registros;
}


export async function inserirCurso(novoCurso) {
  const comando = `
    INSERT INTO curso (nome, carga_horaria, area)
               values (?, ?, ?)
  `

  let [info] = await connection.query(comando, [novoCurso.nome, novoCurso.carga_horaria, novoCurso.area])
  return info.insertId;
}

export async function consultarCurso(id) {
  const comando = `
    SELECT * 
      FROM curso
     WHERE id = ?
  `

  let [registros] = await connection.query(comando, [id]);
  return registros[0];
}


export async function filtrarPorNome(nome) {
  const comando = `
    SELECT * 
      FROM curso
     WHERE nome like ?
  `

  let [registros] = await connection.query(comando, ['%'+nome+'%']);
  return registros;
}

export async function deletarCurso(id) {
  const comando = `
    DELETE FROM curso
          WHERE id = ?
  `

  let [info] = await connection.query(comando, [id]);
}

export async function alterarCurso(id, novosDados) {
  const comando = `
    UPDATE curso
       SET nome = ?,
           carga_horaria = ?,
           area = ?
     WHERE id = ?
  `

  let [info] = await connection.query(comando, [
    novosDados.nome,
    novosDados.carga_horaria,
    novosDados.area,
    id
  ])
}

export async function alterarImagemCurso(id, caminho) {
  const comando = `
    UPDATE curso
       SET img_curso = ?
     WHERE id = ?
  `

  const [info] = await connection.query(comando, [caminho, id])
}