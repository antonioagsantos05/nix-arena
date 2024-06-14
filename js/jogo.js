$(document).ready(function() {
  // Carregar dados da partida atual do Local Storage
  var partidaAtual = JSON.parse(localStorage.getItem('partidaAtual'));

  // Exibir dados da partida
  $('#nomeDupla1').text(partidaAtual.dupla1);
  $('#nomeDupla2').text(partidaAtual.dupla2);

  // Carregar jogadores das duplas
  loadJogadores(partidaAtual.dupla1, '#jogadoresDupla1');
  loadJogadores(partidaAtual.dupla2, '#jogadoresDupla2');

  // Inicializar pontos das duplas
  var pontosDupla1 = 0;
  var pontosDupla2 = 0;
  $('#pontosDupla1').text(pontosDupla1);
  $('#pontosDupla2').text(pontosDupla2);

  // Inicializar games das duplas
  var gamesDupla1 = 0;
  var gamesDupla2 = 0;
  atualizaGames();

  // Inicializar sets das duplas
  var setsDupla1 = 0;
  var setsDupla2 = 0;
  atualizaSets();

  // Ação ao clicar nos botões de placar
  $('#btnMaisDupla1').click(function() {
    pontosDupla1 = proximaPontuacao(pontosDupla1);
    atualizaPlacar();
    verificaFimDoGame(1);
  });

  $('#btnMenosDupla1').click(function() {
    if (pontosDupla1 === 40) {
      pontosDupla1 = 30;
    } else if (pontosDupla1 === 30) {
      pontosDupla1 = 15;
    } else if (pontosDupla1 === 15) {
      pontosDupla1 = 0;
    }
    atualizaPlacar();
  });

  $('#btnMaisDupla2').click(function() {
    pontosDupla2 = proximaPontuacao(pontosDupla2);
    atualizaPlacar();
    verificaFimDoGame(2);
  });

  $('#btnMenosDupla2').click(function() {
    if (pontosDupla2 === 40) {
      pontosDupla2 = 30;
    } else if (pontosDupla2 === 30) {
      pontosDupla2 = 15;
    } else if (pontosDupla2 === 15) {
      pontosDupla2 = 0;
    }
    atualizaPlacar();
  });

  function proximaPontuacao(pontos) {
    if (pontos === 0) return 15;
    else if (pontos === 15) return 30;
    else if (pontos === 30) return 40;
    else if (pontos === 40) return 'AD';
    else if (pontos === 'AD') return 0;
  }

  function atualizaPlacar() {
    $('#pontosDupla1').text(pontosDupla1 === 40 ? '40' : pontosDupla1);
    $('#pontosDupla2').text(pontosDupla2 === 40 ? '40' : pontosDupla2);
  }

  function verificaFimDoGame(dupla) {
    if (dupla === 1 && pontosDupla1 === 'AD') {
      gamesDupla1++;
      atualizaGames();
      $('#modalVitoriaGameBody').text(`Game finalizado! A dupla ${partidaAtual.dupla1} venceu o game.`);
      $('#modalVitoriaGame').modal('show');
      reiniciarGame();
      verificaFimDoSet();
    } else if (dupla === 2 && pontosDupla2 === 'AD') {
      gamesDupla2++;
      atualizaGames();
      $('#modalVitoriaGameBody').text(`Game finalizado! A dupla ${partidaAtual.dupla2} venceu o game.`);
      $('#modalVitoriaGame').modal('show');
      reiniciarGame();
      verificaFimDoSet();
    }
  }

  function reiniciarGame() {
    pontosDupla1 = 0;
    pontosDupla2 = 0;
    atualizaPlacar();
  }

  function verificaFimDoSet() {
    if (gamesDupla1 >= 6 && gamesDupla1 >= gamesDupla2 + 2) {
      setsDupla1++;
      atualizaSets();
      reiniciarSet();
      $('#modalVitoriaSetBody').text(`Set finalizado! A dupla ${partidaAtual.dupla1} venceu o set.`);
      $('#modalVitoriaSet').modal('show');
    } else if (gamesDupla2 >= 6 && gamesDupla2 >= gamesDupla1 + 2) {
      setsDupla2++;
      atualizaSets();
      reiniciarSet();
      $('#modalVitoriaSetBody').text(`Set finalizado! A dupla ${partidaAtual.dupla2} venceu o set.`);
      $('#modalVitoriaSet').modal('show');
    } else if (gamesDupla1 === 7 && gamesDupla2 === 6) {
      setsDupla1++;
      atualizaSets();
      reiniciarSet();
      $('#modalVitoriaSetBody').text(`Set finalizado! A dupla ${partidaAtual.dupla1} venceu o set.`);
      $('#modalVitoriaSet').modal('show');
    } else if (gamesDupla2 === 7 && gamesDupla1 === 6) {
      setsDupla2++;
      atualizaSets();
      reiniciarSet();
      $('#modalVitoriaSetBody').text(`Set finalizado! A dupla ${partidaAtual.dupla2} venceu o set.`);
      $('#modalVitoriaSet').modal('show');
    } else if (gamesDupla1 === 7 && gamesDupla2 === 7) {
      setsDupla1++;
      setsDupla2++;
      atualizaSets();
      reiniciarSet();
      $('#modalVitoriaSetBody').text(`Set finalizado! Ambas as duplas empataram e venceram o set.`);
      $('#modalVitoriaSet').modal('show');
    }
  }

  function reiniciarSet() {
    gamesDupla1 = 0;
    gamesDupla2 = 0;
    atualizaGames();
  }

  function atualizaGames() {
    $('#gamesDupla1').text(gamesDupla1);
    $('#gamesDupla2').text(gamesDupla2);
  }

  function atualizaSets() {
    $('#setsDupla1').text(setsDupla1);
    $('#setsDupla2').text(setsDupla2);
  }

  function loadJogadores(nomeDupla, listaId) {
    var duplas = JSON.parse(localStorage.getItem('duplas')) || [];
    var dupla = duplas.find(function(d) {
      return d.nome === nomeDupla;
    });

    if (dupla) {
      var jogadores = dupla.jogadores;
      var lista = $(listaId);

      jogadores.forEach(function(jogador) {
        var btn = `<button class="btn px-5 jogador-btn" data-jogador="${jogador}" style="background-color:#FFBF78; border: 2px solid #FF7D29">${jogador}</button>`;
        lista.append(btn);
      });

      // Ação ao clicar em um botão de jogador
      $('.jogador-btn').click(function() {
        var jogador = $(this).data('jogador');
        $('#modalJogadorLabel').text(`Informações sobre o jogador ${jogador}`);
        $('#modalJogadorBody').text(`Detalhes sobre o jogador ${jogador}.`);
        $('#modalJogador').modal('show');
      });
    }
  }
});
