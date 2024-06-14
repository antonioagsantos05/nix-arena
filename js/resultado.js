$(document).ready(function() {
    // Carregar partidas finalizadas
    carregarPartidasFinalizadas();

    // Função para carregar partidas finalizadas
    function carregarPartidasFinalizadas() {
        var partidasFinalizadas = JSON.parse(localStorage.getItem('partidasFinalizadas')) || [];

        $('#resultadoPartidas').empty();

        partidasFinalizadas.forEach(function(partida, index) {
            var card = `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Partida entre ${partida.dupla1} e ${partida.dupla2}</h5>
                            <p class="card-text">Data: ${new Date(partida.data).toLocaleDateString()} - Hora: ${new Date(partida.data).toLocaleTimeString()}</p>
                            <button id="btnDetalhesPartida${index}" class="btn btn-primary">Detalhes</button>
                        </div>
                    </div>
                </div>
            `;
            $('#resultadoPartidas').append(card);

            // Evento para mostrar detalhes da partida
            $(`#btnDetalhesPartida${index}`).click(function() {
                mostrarDetalhesPartida(partida);
            });
        });
    }

    // Função para mostrar detalhes da partida
    function mostrarDetalhesPartida(partida) {
        $('#modalSetsResultado').empty();
        partida.sets.forEach(function(set, index) {
            var numeroSet = index + 1;
            var linha = `
                <tr>
                    <td>${numeroSet}</td>
                    <td>${set.dupla1}</td>
                    <td>${set.dupla2}</td>
                </tr>
            `;
            $('#modalSetsResultado').append(linha);
        });

        $('#modalDataHoraResultado').text(`Data: ${new Date(partida.data).toLocaleDateString()} - Hora: ${new Date(partida.data).toLocaleTimeString()}`);

        $('#modalResultadoDetalhes').modal('show');
    }
});
