function simularRequisicao(id) {
  return new Promise ((resolve) => {
    const tempoResposta = Math.random() * 2000 + 1000;

    setTimeout(() => {
      resolve({
        id: id,
        title: `Titulo do Post ${id}`,
        body: `Este é o corpo do post ${id}. Ele foi gerado após ${tempoResposta.toFixed(0)}ms.`
      });
    }, tempoResposta);
  });
}

async function FazerRequisicao(id) {
  try {
    return await simularRequisicao(id);
  } catch (erro) {
    console.error(`Erro na requisição ${id}:`, erro);
    return { id: id, error: `Erro na requisição ${id}` };
  }
}

async function fazerRequisicoes() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<p class="loading">Carregando resultados...</p>';

  try {
    const requisicoes = [
      FazerRequisicao(1),
      FazerRequisicao(2),
      FazerRequisicao(3)
    ];

    const resultados = await Promise.all(requisicoes);
    exibirResultados(resultados);
  } catch (erro) {
    console.error('Erro ao fazer requisições:', erro);
    resultsDiv.innerHTML = '<p>Erro ao fazer requisições. Por favor, tente novamente.</p>';
  }
}

function exibirResultados(resultados) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  resultados.forEach((resultado) => {
    const resultadoDiv = document.createElement('div');
    resultadoDiv.className = 'result fade-in';
    if (resultado.error) {
      resultadoDiv.innerHTML = `
      <h3>Resultado ${resultado.id}</h3>
      <p><strong>Erro:</strong> ${resultado.error}</p>
      `;
    } else {
      resultadoDiv.innerHTML = `
      <h3>Resultado ${resultado.id}</h3>
      <p><strong>Titulo:</strong> ${resultado.title}</p>
      <p><strong>Corpo:</strong> ${resultado.body}</p>
      `;
    }
    resultsDiv.appendChild(resultadoDiv);
  })
}