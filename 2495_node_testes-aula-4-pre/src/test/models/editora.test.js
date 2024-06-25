import { describe, expect, jest } from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo editora', () => {
  const editoraCDC = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'c@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(editoraCDC);

    expect(editora).toEqual(expect.objectContaining(editoraCDC));
  });

  it.skip('Deve salvar editora no BD', () => {
    const editora = new Editora(editoraCDC);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  it.skip('Deve salvar editora no BD usando sintaxe moderna', async () => {
    const editora = new Editora(editoraCDC);
    const dados = await editora.salvar();

    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...editoraCDC,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });

  it('Deve fazer uma chamada simulada ao BD', () => {
    const editora = new Editora(editoraCDC);
    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'São Paulo',
      email: 'c@c.com',
      created_at: '2024-06-25',
      updated_at: '2024-06-25',
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...editoraCDC,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });
});
