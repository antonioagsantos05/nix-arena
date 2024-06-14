$(document).ready(function() {
    // Ação ao clicar em botão de jogador
    $('.jogador-btn').click(function() {
      var jogador = $(this).data('jogador');
      exibirDetalhesJogador(jogador);
    });
  
    // Exibir detalhes do jogador
    function exibirDetalhesJogador(jogador) {
      $('#modalJogadorLabel').text(jogador);
      $('#modalJogador').modal('show');
  
      // Atualizar contadores ao abrir o modal
      atualizarContadores(jogador);
  
      // Ação ao clicar em botão de acerto
      $('.btn-acerto').click(function() {
        var movimento = $(this).data('movimento');
        atualizarLocalStorage(jogador, movimento, 'acertos');
        atualizarContadores(jogador);
      });
  
      // Ação ao clicar em botão de erro
      $('.btn-erro').click(function() {
        var movimento = $(this).data('movimento');
        atualizarLocalStorage(jogador, movimento, 'erros');
        atualizarContadores(jogador);
      });
    }
  
    // Atualizar localStorage
    function atualizarLocalStorage(jogador, movimento, tipo) {
      var jogadorData = JSON.parse(localStorage.getItem(jogador)) || {};
      jogadorData[movimento] = jogadorData[movimento] || { acertos: 0, erros: 0 };
      jogadorData[movimento][tipo]++;
      localStorage.setItem(jogador, JSON.stringify(jogadorData));
    }
  
    // Atualizar contadores na interface
    function atualizarContadores(jogador) {
      var jogadorData = JSON.parse(localStorage.getItem(jogador)) || {};
  
      $('.btn-acerto').each(function() {
        var movimento = $(this).data('movimento');
        var acertos = jogadorData[movimento] ? jogadorData[movimento].acertos : 0;
        $(this).siblings('.acertos').text(acertos);
      });
  
      $('.btn-erro').each(function() {
        var movimento = $(this).data('movimento');
        var erros = jogadorData[movimento] ? jogadorData[movimento].erros : 0;
        $(this).siblings('.erros').text(erros);
      });
    }
  });
  