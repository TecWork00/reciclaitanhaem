// Reutiliza o mesmo modal para ambos os materiais
document.getElementById('btn-plastico').addEventListener('click', function() {
    mostrarInformacoes('plastico');
});

document.getElementById('btn-metais').addEventListener('click', function() {
    mostrarInformacoes('metais');
});

// Fechar modal
document.getElementById('fechar-modal').addEventListener('click', function() {
    document.getElementById('modal').classList.add('oculto');
});

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.classList.add('oculto');
    }
});

// Função para mostrar informações no modal
function mostrarInformacoes(tipo) {
    const informacoesContainer = document.getElementById('informacoes');
    let imagemPrincipal = '';

    if (tipo === 'plastico') {
        imagemPrincipal = './imgrec/plastico.jpg'; // Imagem principal para Plástico
        informacoesContainer.innerHTML = 
            `<h2>Reciclagem de Plástico</h2>
            <img class="img-modal" src="${imagemPrincipal}" alt="Reciclagem de Plástico">
            <div id="cotacao-petroleo" class="loading">Carregando cotação do petróleo...</div>
            <div id="preco-plastico" class="loading">Carregando preço do plástico...</div>
            <h3>Locais de Reciclagem em Itanhaém</h3>
            <div class="locais-reciclagem">
                <div class="local">
                    <img src="img/local1.jpg" alt="Centro de Coleta de Lixo Reciclável" />
                    <p><strong>Centro de Coleta de Lixo Reciclável</strong><br>Rua A, 123, Itanhaém</p>
                </div>
                <div class="local">
                    <img src="img/local2.jpg" alt="Ponto de Coleta" />
                    <p><strong>Ponto de Coleta</strong><br>Avenida B, 456, Itanhaém</p>
                </div>
                <div class="local">
                    <img src="img/local3.jpg" alt="Eco Ponto" />
                    <p><strong>Eco Ponto</strong><br>Rua C, 789, Itanhaém</p>
                </div>
            </div>`;
        carregarDadosPlastico(); // Chama função específica para plástico

    } else if (tipo === 'metais') {
        imagemPrincipal = './imgrec/lata.jpg'; // Imagem principal para Metais
        informacoesContainer.innerHTML = 
            `<h2>Reciclagem de Metais</h2>
            <img class="img-modal" src="${imagemPrincipal}" alt="Reciclagem de Metais">
            <div id="cotacao-metal" class="loading">Carregando cotação do ouro...</div>
            <div id="preco-metal" class="loading">Calculando preço do metal...</div>
            <h3>Locais de Reciclagem em Itanhaém</h3>
            <div class="locais-reciclagem">
                <div class="local">
                    <img src="./imgrec/sucatas.jpg" alt="Centro de Coleta de Lixo Reciclável" />
                    <p><strong>Comércio de sucatas</strong><br>Av. José Batista Campos, 1315 - Oásis, Itanhaém - SP, 11740-000</p>
                </div>
                <div class="local">
                    <img src="./imgrec/mirometais.jpg" alt="Ponto de Coleta" />
                    <p><strong>Miro Metais</strong><br> R. Padre Theodoro Ratisbonne, 5383 - Jardim Suarão - Interior, Itanhaém - SP, 11740-000</p>
                </div>
                <div class="local">
                    <img src="./imgrec/cuu.jpg" alt="Eco Ponto" />
                    <p><strong>Coopersol</strong><br>Rua João Andrade Júnior, 400 - Oásis, Itanhaém - SP, 11740-000</p>
                </div>
            </div>`;
        carregarDadosMetais(); // Chama função específica para metais
    }

    document.getElementById('modal').classList.remove('oculto'); // Mostra o modal
}

// Função para carregar dados do plástico
function carregarDadosPlastico() {
    const apiKey = 'SUA_CHAVE_DE_API_AQUI'; // Insira sua chave da API aqui
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=WTI&apikey=${apiKey}`;
    const precoFixoPlastico = 0.90; // Preço fixo do plástico por kg

    function calcularPrecoPlastico(cotacaoPetroleo) {
        return (precoFixoPlastico * cotacaoPetroleo).toFixed(2);
    }
    
    $.getJSON(apiUrl, function(data) {
        const lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
        const lastQuote = parseFloat(data["Time Series (Daily)"][lastRefreshed]["4. close"]);
        
        // Exibindo cotação com imagem do petróleo
        $('#cotacao-petroleo').removeClass('loading').html(
            `<img src="./imgrec/petroleo.png" alt="Petróleo" style="width: 20px; height: 20px;">
            Cotação do petróleo WTI: $${lastQuote}`
        );
        
        const precoPlastico = calcularPrecoPlastico(lastQuote);
        
        // Exibindo preço com imagem do plástico
        $('#preco-plastico').removeClass('loading').html(
            `<img src="./imgrec/didin.png" alt="Plástico" style="width: 20px; height: 20px;">
            Preço do plástico por kg: R$${precoPlastico}`
        );
    }).fail(function() {
        $('#cotacao-petroleo').removeClass('loading').html("Erro ao carregar a cotação.");
        $('#preco-plastico').removeClass('loading').html("Erro ao calcular o preço do plástico.");
    });
}

// Função para carregar dados dos metais
function carregarDadosMetais() {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=gold&vs_currencies=usd';
    const valorFixoMetal = 10.00; // Valor fixo de 50 centavos por kg

    $.getJSON(apiUrl, function(data) {
        if (data.gold && data.gold.usd) {
            const cotacaoMetalGramas = data.gold.usd;
            const cotacaoMetalKg = cotacaoMetalGramas * 1000;

            // Adicionando a imagem do ouro
            $('#cotacao-metal').removeClass('loading').html(
                `<img src="./imgrec/ouros.png" alt="Barra de Ouro" style="width: 20px; height: 20px;">
                Cotação do ouro: $${cotacaoMetalKg.toFixed(2)} por kg`
            );

            const precoMetal = (valorFixoMetal * cotacaoMetalKg).toFixed(2);

            // Adicionando a imagem para metais
            $('#preco-metal').removeClass('loading').html(
                `<img src="./imgrec/didin.png" alt="Metal" style="width: 20px; height: 20px;">
                Preço aproximado do metal por kg: R$${precoMetal}`
            );
        } else {
            $('#cotacao-metal').removeClass('loading').html("Erro ao carregar a cotação.");
            $('#preco-metal').removeClass('loading').html("Erro ao calcular o preço.");
        }
    }).fail(function() {
        $('#cotacao-metal').removeClass('loading').html("Erro ao carregar a cotação.");
        $('#preco-metal').removeClass('loading').html("Erro ao calcular o preço.");
    });
}


//AS OUTRAS BOXES//

// Adicionando eventos para as boxes de Eletrônicos, Pilhas, Óleo e Móveis
document.getElementById('btn-eletronicos').addEventListener('click', function() {
    mostrarInformacoesGenericas('eletronicos');
});

document.getElementById('btn-pilhas').addEventListener('click', function() {
    mostrarInformacoesGenericas('pilhas');
});

document.getElementById('btn-oleo').addEventListener('click', function() {
    mostrarInformacoesGenericas('oleo');
});

document.getElementById('btn-moveis').addEventListener('click', function() {
    mostrarInformacoesGenericas('moveis');
});

// Função para mostrar informações específicas de cada tipo
function mostrarInformacoesGenericas(tipo) {
    const informacoesContainer = document.getElementById('informacoes');

    // Variáveis para títulos, descrições e imagens
    let titulo = '';
    let imagem = '';
    let locais = '';

    // Definindo conteúdo para Eletrônicos
    if (tipo === 'eletronicos') {
        titulo = 'Reciclagem de Eletrônicos';
        imagem = './imgrec/eletronicos-.jpg';
        locais = `
            <div class="local">
                <img src="img/local1.jpg" alt="Centro de Reciclagem de Eletrônicos" />
                <p><strong>Centro de Reciclagem de Eletrônicos</strong><br>Rua A, 123, Itanhaém</p>
            </div>
            <div class="local">
                <img src="img/local2.jpg" alt="Ponto de Coleta de Eletrônicos" />
                <p><strong>Ponto de Coleta de Eletrônicos</strong><br>Avenida B, 456, Itanhaém</p>
            </div>
            <div class="local">
                <img src="img/local3.jpg" alt="Eco Ponto de Eletrônicos" />
                <p><strong>Eco Ponto de Eletrônicos</strong><br>Rua C, 789, Itanhaém</p>
            </div>
        `;
    }
    // Definindo conteúdo para Pilhas
    else if (tipo === 'pilhas') {
        titulo = 'Reciclagem de Pilhas';
        imagem = './imgrec/pilhas.jpg';
        locais = `
            <div class="local">
                <img src="img/local1.jpg" alt="Centro de Reciclagem de Pilhas" />
                <p><strong>Centro de Reciclagem de Pilhas</strong><br>Rua A, 123, Itanhaém</p>
            </div>
            <div class="local">
                <img src="img/local2.jpg" alt="Ponto de Coleta de Pilhas" />
                <p><strong>Ponto de Coleta de Pilhas</strong><br>Avenida B, 456, Itanhaém</p>
            </div>
            <div class="local">
                <img src="img/local3.jpg" alt="Eco Ponto de Pilhas" />
                <p><strong>Eco Ponto de Pilhas</strong><br>Rua C, 789, Itanhaém</p>
            </div>
        `;
    }
    // Definindo conteúdo para Óleo
    else if (tipo === 'oleo') {
        titulo = 'Reciclagem de Óleo';
        imagem = './imgrec/2_oil_111.jpg';
        locais = `
            <div class="local">
                <img src="img/local1.jpg" alt="Centro de Reciclagem de Óleo" />
                <p><strong>Centro de Reciclagem de Óleo</strong><br>Rua A, 123, Itanhaém</p>
            </div>
            <div class="local">
                <img src="img/local2.jpg" alt="Ponto de Coleta de Óleo" />
                <p><strong>Ponto de Coleta de Óleo</strong><br>Avenida B, 456, Itanhaém</p>
            </div>
            <div class="local">
                <img src="img/local3.jpg" alt="Eco Ponto de Óleo" />
                <p><strong>Eco Ponto de Óleo</strong><br>Rua C, 789, Itanhaém</p>
            </div>
        `;
    }
    // Definindo conteúdo para Móveis
    else if (tipo === 'moveis') {
        titulo = 'Reciclagem de Móveis';
        imagem = './imgrec/moveis.jpg';
        locais = `
            <div class="local">
                <img src="img/local1.jpg" alt="Centro de Reciclagem de Móveis" />
                <p><strong>Centro de Reciclagem de Móveis</strong><br>Rua A, 123, Itanhaém</p>
            </div>
            <div class="local">
                <img src="img/local2.jpg" alt="Ponto de Coleta de Móveis" />
                <p><strong>Ponto de Coleta de Móveis</strong><br>Avenida B, 456, Itanhaém</p>
            </div>
            <div class="local">
                <img src="img/local3.jpg" alt="Eco Ponto de Móveis" />
                <p><strong>Eco Ponto de Móveis</strong><br>Rua C, 789, Itanhaém</p>
            </div>
        `;
    }

    // Atualizando o conteúdo do modal com o título, imagem e locais de reciclagem
    informacoesContainer.innerHTML = `
        <h2>${titulo}</h2>
        <img class="img-modal" src="${imagem}" alt="${titulo}">
        <h3>Locais de Reciclagem em Itanhaém</h3>
        <div class="locais-reciclagem">${locais}</div>
    `;

    document.getElementById('modal').classList.remove('oculto'); // Mostra o modal
}

// Reutilizando o evento de fechamento do modal
document.getElementById('fechar-modal').addEventListener('click', function() {
    document.getElementById('modal').classList.add('oculto');
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.classList.add('oculto');
    }
});
