const form = document.getElementById('productForm');
const productList = document.getElementById('addClient');
let total = 0;

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const produto = document.getElementById('produto').value;
  const quantidadeInput = document.getElementById('quantidade');
  const precoUniInput = document.getElementById('precoUni');
  const unidadeMed = document.getElementById('unidadeMed').value;

  if (quantidadeInput.value === '' || isNaN(parseFloat(quantidadeInput.value)) || 
      precoUniInput.value === '' || isNaN(parseFloat(precoUniInput.value))) {
    alert('Por favor, digite valores numéricos válidos para quantidade e preço unitário.');
    return; 
  }

  const quantidade = parseFloat(quantidadeInput.value);
  const precoUniStr = precoUniInput.value;
  const precoUni = parseFloat(precoUniStr.replace(',', '.'));
  const precoTotal = quantidade * precoUni;

  const novoProduto = document.createElement('div');
  novoProduto.innerHTML = `${quantidade}${unidadeMed} ${produto} R$ ${precoUni.toFixed(2)} = R$ ${precoTotal.toFixed(2)} <button class="excluir"><i class="fas fa-trash-alt"></i></button>`; 

  total += precoTotal;
const totalElement = document.getElementById('total');
totalElement.textContent = `Total dos itens: R$ ${total.toFixed(2)}`;

  productList.appendChild(novoProduto);
    // Limpa os campos do formulário
    form.reset();
});

// O ouvinte de eventos é adicionado *fora* do evento de submit
productList.addEventListener('click', function(event) {
  let button = event.target.closest('.excluir'); // Busca o botão ou ícone pai
  if (button) {
      const item = button.parentNode;
      const precoItem = parseFloat(item.textContent.split('=')[1].replace('R$', '').replace(',', '.'));
      total -= precoItem;
      const totalElement = document.getElementById('total');
      totalElement.textContent = `Total dos itens: R$ ${total.toFixed(2)}`;
      item.remove();
  }

});

