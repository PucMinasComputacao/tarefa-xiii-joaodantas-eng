const API = 'http://localhost:3000/lugares';
const API_CATEGORIAS = 'http://localhost:3000/categorias';

async function fetchItems() {
  const resposta = await fetch(API);
  const lugares = await resposta.json();
  return lugares;
}

async function fetchCategorias() {
  const resposta = await fetch(API_CATEGORIAS);
  const categorias = await resposta.json();
  return categorias;
}

function createCard(lugar) {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <img src="${lugar.imagem}" alt="${lugar.nome}" onerror="this.src='https://via.placeholder.com/300x200?text=Sem+Imagem'" />
    <div class="card-corpo">
      <span class="card-categoria">${lugar.categoria}</span>
      <h2>${lugar.nome}</h2>
      <p class="card-pais">📍 ${lugar.pais}</p>
      <p class="card-descricao">${lugar.descricaoCurta}</p>
      <div class="card-rodape">
        <span class="card-avaliacao">⭐ ${lugar.avaliacao}</span>
        <a href="details.html?id=${lugar.id}" class="btn-detalhes">Ver detalhes</a>
      </div>
    </div>
  `;

  return card;
}

function renderCards(lugares) {
  const lista = document.getElementById('lista-lugares');
  lista.innerHTML = '';

  if (lugares.length === 0) {
    lista.innerHTML = '<p class="msg-vazia">Nenhum lugar encontrado.</p>';
    return;
  }

  lugares.forEach(lugar => {
    const card = createCard(lugar);
    lista.appendChild(card);
  });
}

function renderCategorias(categorias) {
  const select = document.getElementById('filtro-categoria');
  categorias.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.nome;
    option.textContent = cat.nome;
    select.appendChild(option);
  });
}

async function init() {
  const lugares = await fetchItems();
  const categorias = await fetchCategorias();

  renderCategorias(categorias);
  renderCards(lugares);

  document.getElementById('filtro-categoria').addEventListener('change', function() {
    const categoriaSelecionada = this.value;
    if (categoriaSelecionada === '') {
      renderCards(lugares);
    } else {
      const filtrados = lugares.filter(l => l.categoria === categoriaSelecionada);
      renderCards(filtrados);
    }
  });
}

init();