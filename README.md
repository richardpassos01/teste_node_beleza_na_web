# Projeto v1.0.0

### Iniciando o projeto

Atualizar os pacotes, `$ npm install`, e rodar o projeto digitando `$ npm start ou node server.js` dentro do diretorio onde o repositorio foi clonado.


## Objetivos

### Crie endpoints para as seguintes ações:

- [x]  Criação de produto onde o payload será o json informado acima (exceto as propriedades isMarketable e inventory.quantity)
- [x] Edição de produto por sku
- [x] Recuperação de produto por sku
- [x]  Deleção de produto por sku
 
 
### Requisitos
 
- [x] Toda vez que um produto for recuperado por sku deverá ser calculado a propriedade: inventory.quantity
 	 * Não entendi muito bem o que seria o produto ser recuperado, então na edição faço um incremento dessa propriedade.


- [x] Toda vez que um produto for recuperado por sku deverá ser calculado a propriedade: isMarketable
	 * Mesma regra aplicada, quando editado o isMarketable é setado para true.


- [x] Caso um produto já existente em memória tente ser criado com o mesmo sku uma exceção deverá ser lançada
	 * Crio um UUID direto no banco, no meu caso, no  arquivo que simula o banco, isto evita chaves duplicadas.


- [x]  Ao atualizar um produto, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição


## Próximos passos

* Testes unitários
* Realizar o crud em banco s