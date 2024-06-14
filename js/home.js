$(document).ready(function() {
  // Carregar partidas em andamento
  carregarPartidas();

  // Botão para criar nova partida
  $('#criarPartida').click(function() {
      window.location.href = 'novapartida.html';
  });

  // Função para carregar partidas em andamento
  function carregarPartidas() {
      var partidasAndamento = JSON.parse(localStorage.getItem('partidas')) || [];

      $('#partidasAndamento').empty();

      partidasAndamento.forEach(function(partida) {
          if (partida.status === 'andamento') {
              var card = `
                  <div class="col-md-4 mb-3">
                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">Partida entre ${partida.dupla1} e ${partida.dupla2}</h5>
                              <p class="card-text">Status: Em andamento</p>
                              <button id="btnFinalizar${partida.id}" class="btn btn-primary">Finalizar Partida</button>
                          </div>
                      </div>
                  </div>
              `;
              $('#partidasAndamento').append(card);

              // Evento para finalizar a partida
              $(`#btnFinalizar${partida.id}`).click(function() {
                  finalizarPartida(partida.id);
              });
          }
      });
  }

  // Finalizar uma partida
  function finalizarPartida(idPartida) {
      var partida = JSON.parse(localStorage.getItem('partidas')) || [];
      var index = partidas.findIndex(partida => partida.id === idPartida);
      
      if (index !== -1) {
          partidas[index].status = 'finalizada';
          salvarResultadoPartida(partidas[index]);
          localStorage.setItem('partidas', JSON.stringify(partidas));
      }

      // Atualizar as partidas em andamento
      carregarPartidas();
  }

  // Salvar resultado da partida finalizada no Local Storage
  function salvarResultadoPartida(partida) {
      var partidasFinalizadas = JSON.parse(localStorage.getItem('partidasFinalizadas')) || [];
      partidasFinalizadas.push(partida);
      localStorage.setItem('partidasFinalizadas', JSON.stringify(partidasFinalizadas));
  }
});
