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

  // Inicializar sets das duplas
  var setsDupla1 = 0;
  var setsDupla2 = 0;
  atualizaSets();

  // Ação ao clicar em um botão de jogador
  $('.jogadores-buttons button').click(function() {
    var jogador = $(this).text();
    alert(`Popup do jogador ${jogador}`);
    // Aqui você pode adicionar lógica adicional conforme necessário
  });

  // Ação ao clicar nos botões de placar
  $('#btnMaisDupla1').click(function() {
    pontosDupla1++;
    atualizaPlacar();
    verificaFimDoSet();
  });

  $('#btnMenosDupla1').click(function() {
    if (pontosDupla1 > 0) {
      pontosDupla1--;
      atualizaPlacar();
    }
  });

  $('#btnMaisDupla2').click(function() {
    pontosDupla2++;
    atualizaPlacar();
    verificaFimDoSet();
  });

  $('#btnMenosDupla2').click(function() {
    if (pontosDupla2 > 0) {
      pontosDupla2--;
      atualizaPlacar();
    }
  });

  function atualizaPlacar() {
    $('#pontosDupla1').text(pontosDupla1);
    $('#pontosDupla2').text(pontosDupla2);
  }

  function verificaFimDoSet() {
    if (pontosDupla1 >= 21 && pontosDupla1 >= pontosDupla2 + 2) {
      alert(`Set finalizado! A dupla ${partidaAtual.dupla1} venceu o set.`);
      setsDupla1++;
      reiniciarSet();
      atualizaSets();
    } else if (pontosDupla2 >= 21 && pontosDupla2 >= pontosDupla1 + 2) {
      alert(`Set finalizado! A dupla ${partidaAtual.dupla2} venceu o set.`);
      setsDupla2++;
      reiniciarSet();
      atualizaSets();
    }
  }

  function reiniciarSet() {
    pontosDupla1 = 0;
    pontosDupla2 = 0;
    atualizaPlacar();
  }

  function atualizaSets() {
    $('#sets').html(`<div class="text-center d-flex justify-content-center align-center"><h5 style="font-size: 1.8rem;" class="mx-2 badge badge-primary">${setsDupla1}</h5> <h5 style="font-size: 1.8rem;">-</h5><h5 style="font-size: 1.8rem;" class=" mx-2 badge badge-primary">${setsDupla2}</h5></div>`);
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
        var btn = `<button class="btn px-5" style="background-color:#FFBF78; border: 2px solid #FF7D29">${jogador}</button>`;
        lista.append(btn);
      });
    }
  }
});
