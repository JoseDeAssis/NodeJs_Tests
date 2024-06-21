import Item from "../item.js";

describe("Teste dos itens", () => {
  it("Deve ter 3 campos: nome, valor e quantidade", () => {
    const item = new Item("Laranja", 5.5, 10);

    expect(item.nome).toBe("Laranja");
    expect(item.valor).toBe(5.5);
    expect(item.quantidade).toBe(10);
  });

  it("Deve ter o preço calculado de acordo com a quantidade", () => {
    const item = new Item("Acerola", 6.7, 2);
    const itemError = new Item("Batata", 0.1, 3);

    expect(item.pegaValorTotalItem()).toBe(13.4);
    expect(itemError.pegaValorTotalItem()).toBeCloseTo(0.3);
  });
});
