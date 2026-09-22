const form = document.getElementById('productForm');
const productList = document.getElementById('addClient');
let total = 0;

// Função auxiliar para formatar em Reais (ex: 1150 -> "1.150,00")
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

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
  novoProduto.innerHTML = `${quantidade}${unidadeMed} ${produto} R$ ${formatarMoeda(precoUni)} = R$ ${formatarMoeda(precoTotal)} <button class="excluir"><i class="fas fa-trash-alt"></i></button>`; 

  total += precoTotal;
  const totalElement = document.getElementById('total');
  totalElement.textContent = `Total dos itens: R$ ${formatarMoeda(total)}`;

  productList.appendChild(novoProduto);
  form.reset();
});

productList.addEventListener('click', function(event) {
  let button = event.target.closest('.excluir');
  if (button) {
      const item = button.parentNode;
      
      // Remove 'R$', remove os pontos de milhar, troca vírgula por ponto e converte para número
      const precoTexto = item.textContent.split('=')[1];
      const precoLimpo = precoTexto.replace('R$', '').replaceAll('.', '').replace(',', '.').trim();
      const precoItem = parseFloat(precoLimpo);

      total -= precoItem;
      
      // Correção de segurança para evitar valores como -0.00 por imprecisão de ponto flutuante
      if (Math.abs(total) < 0.0001) total = 0;

      const totalElement = document.getElementById('total');
      totalElement.textContent = `Total dos itens: R$ ${formatarMoeda(total)}`;
      
      item.remove();
  }
});
