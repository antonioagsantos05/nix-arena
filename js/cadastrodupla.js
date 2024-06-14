$(document).ready(function() {
  $('#cadastrarDuplaForm').submit(function(event) {
    event.preventDefault();

    var nomeJogador1 = $('#nomeJogador1').val();
    var nomeJogador2 = $('#nomeJogador2').val();
    var nomeDupla = `${nomeJogador1} e ${nomeJogador2}`;

    // Obter duplas existentes da localStorage
    var duplas = JSON.parse(localStorage.getItem('duplas')) || [];

    // Verificar se a dupla já existe
    var duplaExistente = duplas.find(function(dupla) {
      return dupla.nome === nomeDupla;
    });

    if (duplaExistente) {
      alert('Esta dupla já está cadastrada.');
    } else {
      // Cadastrar nova dupla
      var novaDupla = {
        id: new Date().getTime(), // Gerar um ID único para a dupla
        nome1: nomeJogador1,
        nome2: nomeJogador2,
        dupla: nomeDupla
      };

      duplas.push(novaDupla);
      localStorage.setItem('duplas', JSON.stringify(duplas));

      // Atualizar as opções de duplas na página de nova partida
      var selectDupla1 = $('#dupla1');
      var selectDupla2 = $('#dupla2');

      var option = `<option value="${novaDupla.dupla}">${novaDupla.dupla}</option>`;
      selectDupla1.append(option);
      selectDupla2.append(option);

      // Fechar o modal
      $('#cadastrarDuplaModal').modal('hide');
    }
  });
});
