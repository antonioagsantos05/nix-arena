$(document).ready(function () {
    // Carregar dados da partida atual do Local Storage
    var partidaAtual = JSON.parse(localStorage.getItem('partidaAtual'));

    if (partidaAtual) {
        // Exibir detalhes da partida
        var detalhesPartida = `
            <p><strong>Nome da Partida:</strong> ${partidaAtual.nomePartida}</p>
            <p><strong>Data:</strong> ${partidaAtual.data}</p>
            <p><strong>Horário:</strong> ${partidaAtual.horario}</p>
            <p><strong>Dupla 1:</strong> ${partidaAtual.dupla1}</p>
            <p><strong>Dupla 2:</strong> ${partidaAtual.dupla2}</p>
        `;
        $('#detalhesPartida').html(detalhesPartida);

        // Exibir placar de sets
        var totalSets = parseInt(partidaAtual.sets);
        var placarSets = '';
        for (var i = 1; i <= totalSets; i++) {
            placarSets += `<p><strong>Set ${i}:</strong> ${partidaAtual['set' + i + 'Dupla1']} - ${partidaAtual['set' + i + 'Dupla2']}</p>`;
        }
        $('#placarSets').html(placarSets);

        // Exibir estatísticas dos jogadores se houver jogadores
        if (partidaAtual.jogadoresDupla1 && partidaAtual.jogadoresDupla1.length > 0) {
            var estatisticasJogadores = '';
            partidaAtual.jogadoresDupla1.forEach(function (jogador) {
                estatisticasJogadores += `
                    <tr>
                        <td>${jogador}</td>
                        <td>${partidaAtual[jogador].forehand.acertos}/${partidaAtual[jogador].forehand.erros}</td>
                        <td>${partidaAtual[jogador].backhand.acertos}/${partidaAtual[jogador].backhand.erros}</td>
                        <td>${partidaAtual[jogador].dropShots.acertos}/${partidaAtual[jogador].dropShots.erros}</td>
                        <td>${partidaAtual[jogador].lobs.acertos}/${partidaAtual[jogador].lobs.erros}</td>
                        <td>${partidaAtual[jogador].saque.acertos}/${partidaAtual[jogador].saque.erros}</td>
                        <td>${partidaAtual[jogador].smashs.acertos}/${partidaAtual[jogador].smashs.erros}</td>
                    </tr>
                `;
            });
            $('#corpoTabela').html(estatisticasJogadores);
        } else {
            // Se não houver jogadores, exibir mensagem
            $('#corpoTabela').html('<tr><td colspan="7">Não há jogadores registrados.</td></tr>');
        }
    } else {
        // Se não houver dados da partida, exibir mensagem
        $('#detalhesPartida').html('<p>Não há dados da partida no Local Storage.</p>');
    }
});
