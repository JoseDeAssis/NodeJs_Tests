import { afterEach, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let server;
let idResponse;
beforeEach(() => {
  const PORT = 3000;
  server = app.listen(PORT);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const response = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body[0].email).toEqual('e@e.com');
  });
});

describe('POST em /editoras', () => {
  it('Deve adicionar uma nova editora', async () => {
    const response = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'São Paulo',
        email: 'c@c.com',
      })
      .expect(201);

    idResponse = response.body.content.id;
  });

  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app).post('/editoras').send({}).expect(400);
  });
});

describe('PUT em /editoras/id', () => {
  it.each([
    ['nome', { nome: 'Casa do Código' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');

    await requisicao
      .request(app)
      .put(`/editoras/${idResponse}`)
      .send(param)
      .expect(204);
    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /editoras', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app).delete(`/editoras/${idResponse}`).expect(200);
  });
});

describe('GET em /editoras/id', () => {
  it('Deletar o retornar um recurso selecionado', async () => {
    await request(app).get(`/editoras/${idResponse}`).expect(200);
  });
});

//

/* Podemos utilizar jest.fn() quando a implementação original da função - ou seja,
  o código que ela executa - não é importante para o teste, e pode ser substituída
  pelo que definimos durante o teste, normalmente retornando um objeto. */

/* No caso de jest.spyOn(), não há substituição da implementação original da função e
  queremos testar se, por exemplo, a função está sendo “chamada”, se está recebendo
  determinado parâmetro, etc. Nesse caso, apenas executar a função com jest.spyOn()
  ainda vai executar a função “original” e o código dentro dela. Porém, também é possível
  “mocar” (ou seja, substituir a implementação original de uma função). */
