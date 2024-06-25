import Carrinho from "../carrinho.js";
import Item from "../item.js";

describe("Testes no carrinho", () => {
  it("Deve inicializar vazio", () => {
    const carrinho = new Carrinho();

    expect(carrinho.subtotal).toBeNull();
    expect(carrinho.frete).toBeNull();
    expect(carrinho.total).toBeNull();
  });

  it("Deve ter itens", () => {
    const banana = new Item("banana", 1.99, 2);
    const apple = new Item("maça", 6.79, 1.2);

    const carrinho = new Carrinho();
    carrinho.adiciona(banana);
    carrinho.adiciona(apple);

    expect(carrinho.itens[0]).toBe(banana);
    expect(carrinho.itens[1]).toBe(apple);
    expect(carrinho.itens).toContain(banana);
    expect(carrinho.itens).toContain(apple);
  });

  it("Deve ter a propriedade total na inicialização", () => {
    const carrinho = new Carrinho();

    expect(carrinho).toHaveProperty("total");
  });

  it("Deve lançar erro ao finalizar compra sem itens no carrinho", () => {
    function englobaErroCarrinho() {
      const carrinho = new Carrinho();
      carrinho.finalizaCompra();
    }

    expect(englobaErroCarrinho).toThrowError("Carrinho de compras vazio");
  });

  it("Deve ter frete", () => {
    const carrinho = new Carrinho();
    carrinho.adicionaFrete(50);

    expect(carrinho.frete).toBe(50);
  });

  it("Deve calcular o frete", () => {
    const banana = new Item("banana", 1.99, 2);
    const apple = new Item("maça", 6.79, 1.2);

    const carrinho = new Carrinho();
    carrinho.adiciona(banana);
    carrinho.adiciona(apple);

    expect(carrinho.calculaTotal()).toBe(12.128);
  });

  it("Deve finalizar compras corretamente", () => {
    const banana = new Item("banana", 1.99, 2);
    const apple = new Item("maça", 6.79, 1.2);

    const carrinho = new Carrinho();
    carrinho.adiciona(banana);
    carrinho.adiciona(apple);
    carrinho.calculaTotal();
    carrinho.adicionaFrete(5);

    expect(carrinho.finalizaCompra()).toStrictEqual({
      subtotal: 12.128,
      frete: 5,
      total: 17.128,
    });
  });
});
