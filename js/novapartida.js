$(document).ready(function() {
    // Carregar as duplas cadastradas ao iniciar a página
    loadDuplas();
  
    // Cadastrar nova dupla (abrir modal)
    $('#btnCadastrarDupla').click(function() {
      $('#cadastrarDuplaModal').modal('show');
    });
  
    // Selecionar duplas
    $('#dupla1, #dupla2').change(function() {
      // Verificar se ambas as duplas foram selecionadas
      var dupla1 = $('#dupla1').val();
      var dupla2 = $('#dupla2').val();
  
      if (dupla1 && dupla2 && dupla1 !== dupla2) {
        $('#btnIniciarPartida').prop('disabled', false);
      } else {
        $('#btnIniciarPartida').prop('disabled', true);
      }
    });
  
    // Lógica de cadastro da nova partida
    $('#novaPartidaForm').submit(function(event) {
      event.preventDefault();
  
      // Obter os valores do formulário
      var nomePartida = $('#nomePartida').val();
      var dataPartida = $('#dataPartida').val();
      var horarioPartida = $('#horarioPartida').val();
      var dupla1 = $('#dupla1').val();
      var dupla2 = $('#dupla2').val();
  
      // Salvar partida na localStorage
      var partidas = JSON.parse(localStorage.getItem('partidas')) || [];
      partidas.push({
        nome: nomePartida,
        data: dataPartida,
        horario: horarioPartida,
        dupla1: dupla1,
        dupla2: dupla2,
        vitoriasDupla1: 0,
        vitoriasDupla2: 0,
        pontosDupla1: [],
        pontosDupla2: [],
        timeline: []
      });
      localStorage.setItem('partidas', JSON.stringify(partidas));
  
      // Salvar partida atual no Local Storage
      localStorage.setItem('partidaAtual', JSON.stringify({
        nome: nomePartida,
        data: dataPartida,
        horario: horarioPartida,
        dupla1: dupla1,
        dupla2: dupla2
      }));
  
      // Redirecionar para a página de jogo
      window.location.href = 'jogo.html';
    });
  
    // Função para carregar as duplas cadastradas
    function loadDuplas() {
      var duplas = JSON.parse(localStorage.getItem('duplas')) || [];
  
      // Preencher as opções de duplas nos selects
      var selectDupla1 = $('#dupla1');
      var selectDupla2 = $('#dupla2');
  
      duplas.forEach(function(dupla) {
        var option = `<option value="${dupla.nome}">${dupla.nome}</option>`;
        selectDupla1.append(option);
        selectDupla2.append(option);
      });
  
      // Evento ao selecionar uma dupla
      selectDupla1.change(updateJogadores);
      selectDupla2.change(updateJogadores);
    }
  
    // Atualiza os nomes dos jogadores
    function updateJogadores() {
      var dupla1 = $('#dupla1').val();
      var dupla2 = $('#dupla2').val();
  
      // Obter as duplas da localStorage
      var duplas = JSON.parse(localStorage.getItem('duplas')) || [];
  
      // Encontrar as duplas selecionadas
      var selectedDupla1 = duplas.find(function(dupla) {
        return dupla.nome === dupla1;
      });
  
      var selectedDupla2 = duplas.find(function(dupla) {
        return dupla.nome === dupla2;
      });
  
      // Preencher os nomes dos jogadores nos botões
      if (selectedDupla1) {
        $('#btnJogador1').text(selectedDupla1.jogadores[0]);
        $('#btnJogador2').text(selectedDupla1.jogadores[1]);
      }
      if (selectedDupla2) {
        $('#btnJogador3').text(selectedDupla2.jogadores[0]);
        $('#btnJogador4').text(selectedDupla2.jogadores[1]);
      }
    }
  
    // Lógica de cadastro de nova dupla
    $('#cadastrarDuplaForm').submit(function(event) {
      event.preventDefault();
  
      // Obter valores do formulário
      var nomeJogador1 = $('#nomeJogador1').val();
      var nomeJogador2 = $('#nomeJogador2').val();
      var nomeDupla = `${nomeJogador1} e ${nomeJogador2}`;
  
      // Salvar dupla na localStorage
      var duplas = JSON.parse(localStorage.getItem('duplas')) || [];
      duplas.push({
        nome: nomeDupla,
        jogadores: [nomeJogador1, nomeJogador2]
      });
      localStorage.setItem('duplas', JSON.stringify(duplas));
  
      // Limpar campos do formulário
      $('#nomeJogador1').val('');
      $('#nomeJogador2').val('');
  
      // Atualizar opções de duplas nos selects
      var selectDupla1 = $('#dupla1');
      var selectDupla2 = $('#dupla2');
      selectDupla1.empty();
      selectDupla2.empty();
      selectDupla1.append(`<option value="">Selecione uma dupla</option>`);
      selectDupla2.append(`<option value="">Selecione outra dupla</option>`);
      duplas.forEach(function(dupla) {
        var option = `<option value="${dupla.nome}">${dupla.nome}</option>`;
        selectDupla1.append(option);
        selectDupla2.append(option);
      });
  
      // Fechar modal
      $('#cadastrarDuplaModal').modal('hide');
    });
  
    // Abrir popup ao clicar nos jogadores
    $('#btnJogador1, #btnJogador2, #btnJogador3, #btnJogador4').click(function() {
      var jogador = $(this).text();
      abrirPopup(jogador);
    });
  
    function abrirPopup(nomeJogador) {
      alert(`Popup do jogador ${nomeJogador}`);
    }
  });
  