// Inicializar Leaflet com marcadores de pontos de reciclagem
window.onload = function initMap() {
    const map = L.map('map').setView([-24.167825736716335, -46.78885871612809], 13); // Centro de Itanhaém

    // Adiciona o tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Definindo o ícone verde com imagem de reciclagem
    const recycleIcon = L.icon({
        iconUrl: 'https://irp-cdn.multiscreensite.com/96a8bdfa/dms3rep/multi/recycle-logo-dcf8274a.png', // Caminho da imagem do ícone de reciclagem
        iconSize: [28, 28], // Tamanho do ícone
        iconAnchor: [19, 38], // Ponto de ancoragem para posicionamento
        popupAnchor: [0, -38] // Posição do popup em relação ao ícone
    });

    // Pontos de reciclagem com coordenadas exatas, informações e imagens
    const recyclingPoints = [
    { 
        lat: -24.167825736716335, lng: -46.78885871612809, 
        title: "Coopersolreciclado", 
        address: "Rua João Andrade Júnior, 400 - Oásis, Itanhaém - SP, 11740-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.16482364717134, lng: -46.76121367215309, 
        title: "Sucatas Itanhaém", 
        address: "Rua Pe. Teodoro Ratisbone 4197, Itanhaém, SP, 11740-000",
        image: "link_da_imagem"
    },
        
    { 
        lat: -24.17538795379825, lng: -46.77518076441255, 
        title: "PIT STOP Ferro e Aço", 
        address: "R. Emídio de Souza, 723 - Satélite, Itanhaém - SP, 11740-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.16791518799615, lng: -46.78872380551709, 
        title: "Reciclaitanhaem", 
        address: "Rua João Andrade Júnior, 400 - Oásis, Itanhaém - SP, 11170-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.16972713522959, lng: -46.78548660244083, 
        title: "EA Recicly Comércio de Sucatas", 
        address: "Av. José Batista Campos, 1315 - Oásis, Itanhaém - SP, 11740-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.165271775537306, lng: -46.787735894471886, 
        title: "RECICLAGEM DO MICHEL", 
        address: "Rita Prado da Silva, 423 - Oásis, Itanhaém - SP, 11740-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.163065727952272, lng: -46.79679958220352, 
        title: "Marciano Reciclagem", 
        address: "ao lado do 724 - Rua Francisco Sanches, R. Joaquim Rasga, 41 - Oásis, Itanhaém - SP, 11740-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.17845560126658, lng: -46.82556348220353, 
        title: "RCE Comércio de Materiais Recicláveis", 
        address: "Estr. Gentil Peres - Jardim Umuarama, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.147538413761513, lng: -46.77797363494645, 
        title: "JG Plastic", 
        address: "Tropical, Itanhaém - SP, 11740-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.163574872939332, lng: -46.7587671631894, 
        title: "Ferro Velho do Irmão", 
        address: "R. Padre Afonso Maria Ratisbone, 4197 - Suarão, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.166554068034646, lng: -46.764492852737426, 
        title: "Lara Central de Tratamento de Resíduos", 
        address: "Av. Mustafá Abbasi, 15 - Balneário Nova, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.16164345683211, lng: -46.772018158889956, 
        title: "Prime Ambiental", 
        address: "Av. Santos, 2205 - Nova Itanhaém - Interior, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.19097323996405, lng: -46.819565058889964, 
        title: "Ferro Velho Do Marcola", 
        address: "R. João Capistrano Pereira - Corumbá, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.160850487386902, lng: -46.76451332330806, 
        title: "Start Reciclagem", 
        address: "Av. Cabuçu, 601 - Suarão, Itanhaém - SP, 11740-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.159253521777078, lng: -46.750286912262844, 
        title: "Miro Metais (Sucata)", 
        address: "R. Padre Theodoro Ratisbonne, 5383 - Jardim Suarão - Interior, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.183513291434604, lng: -46.81939969569505, 
        title: "Comércio Sucatas Pitanga", 
        address: "R. Maranata, 149 - Sabaúna, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.16483281227062, lng: -46.76121919754816, 
        title: "Ferro Velho Do Neto", 
        address: "Nossa Sra. do Sion, Itanhaém - SP, 11740-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.218949507871375, lng: -46.87565326441257, 
        title: "Sucataria Novos Tempos", 
        address: "Av marginal da rodovia, 8861 - Bopiranga, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.187682679404322, lng: -46.83636976563573, 
        title: "Vital Ambiental Ltda", 
        address: "Av. Dr. Antônio Ribeiro Nogueira, 644 - Cibratel - Chácaras, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.146309343556364, lng: -46.726225335576416, 
        title: "JC Plastic", 
        address: "Alameda Guaraçai, 605 - Santa Terezinha, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.224840108833035, lng: -46.86583261103967, 
        title: "Comércio de Sucatas Bopiranga", 
        address: "Av. Albert Sabin - Bopiranga, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.206272205802524, lng: -46.83792990551708, 
        title: "Ecoponto", 
        address: "R. Afanásio Petecof, 1122-1358 - Gaivota, Itanhaém - SP, 11740-000",
        image: "link_da_imagem"
    },
    { 
        lat: -24.092488578611206, lng: -46.796581953367365, 
        title: "Usina Brasil Tecnologia Ambiental LTDA", 
        address: "Estr. Cel. Joaquim Branco, km 11 - Mambú, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.19379781053716, lng: -46.820047087726124, 
        title: "Ferro Velho Área Verde", 
        address: "R. Bernardino de Souza, 375 - Corumbá, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.216461707465303, lng: -46.86787727668093, 
        title: "Ferro Velho do Mane", 
        address: "R. José Domiciano da Silva, 1360 - Bopiranga, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.152250244409714, lng: -46.776347195695045, 
        title: "Ferro Velho da Mônica", 
        address: "Av. Cabuçu, 2095 - Nossa Sra. do Sion, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    },
    { 
        lat: -24.200381818885848, lng: -46.8349610300538, 
        title: "Ferro Velho do Chico", 
        address: "Av. Marginal Direita, 1431 - Cibratel II, Itanhaém - SP, 11740-000",
        image: "link_da_imagem" 
    }
    ];

    // Adiciona os marcadores ao mapa com ícone personalizado
    recyclingPoints.forEach(point => {
        L.marker([point.lat, point.lng], { icon: recycleIcon }).addTo(map)
            .bindPopup(`
                <b>${point.title}</b><br>
                ${point.address}<br>
                <img src="${point.imageUrl}" alt="${point.title}" style="width: 100%; height: auto;">
            `);
    });
}

