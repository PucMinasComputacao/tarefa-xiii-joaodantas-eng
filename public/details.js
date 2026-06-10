const API = 'http://localhost:3000/lugares';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function fetchItem(id) {
  const resposta = await fetch(API + '/' + id);
  if (!resposta.ok) return null;
  const lugar = await resposta.json();
  return lugar;
}

function renderDetalhes(lugar) {
  const container = document.getElementById('detalhes-lugar');

  const tags = lugar.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

  container.innerHTML = `
    <div class="detalhes">
      <img src="${lugar.imagem}" alt="${lugar.nome}" onerror="this.src='https://via.placeholder.com/600x300?text=Sem+Imagem'" />
      <div class="detalhes-info">
        <span class="card-categoria">${lugar.categoria}</span>
        <h2>${lugar.nome}</h2>
        <p class="card-pais">📍 ${lugar.pais}</p>
        <p class="avaliacao-detalhe">⭐ ${lugar.avaliacao} / 5.0</p>
        <p class="descricao-completa">${lugar.descricaoCompleta}</p>
        <div class="tags">${tags}</div>
      </div>
    </div>
  `;
}

async function init() {
  const container = document.getElementById('detalhes-lugar');

  if (!id) {
    container.innerHTML = '<p class="msg-erro">Nenhum lugar foi selecionado.</p>';
    return;
  }

  const lugar = await fetchItem(id);

  if (!lugar) {
    container.innerHTML = '<p class="msg-erro">Lugar não encontrado.</p>';
    return;
  }

  renderDetalhes(lugar);
}

init();