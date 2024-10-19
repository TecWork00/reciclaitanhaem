<?php
session_start();
if (!isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] !== true) {
    header('Location: ../tela cadastro-login/login.php');
    exit();
}

require '../tela cadastro-login/db.php'; // Inclui a conexão ao banco de dados

// Lógica para deletar um marcador
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_marker_id'])) {
    $marker_id = $_POST['delete_marker_id'];
    $user_id = $_SESSION['user_id'];

    $sql = "DELETE FROM marcadores WHERE id = ? AND user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $marker_id, $user_id);

    if ($stmt->execute()) {
        header('Location: mapa.php');
        exit();
    } else {
        echo "Erro ao excluir o marcador.";
    }
}

// Lógica para adicionar um marcador
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !isset($_POST['delete_marker_id'])) {
    $nome_local = $_POST['nome_local'];
    $rua = $_POST['rua'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $user_id = $_SESSION['user_id'];

    // Verifica se uma imagem foi enviada
    if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === 0) {
        // Define o diretório onde a imagem será armazenada
        $targetDir = "uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true); // Cria o diretório se não existir
        }
        $fileName = basename($_FILES['imagem']['name']);
        $targetFilePath = $targetDir . $fileName;

        // Verifica o tipo do arquivo
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

        if (in_array(strtolower($fileType), $allowedTypes)) {
            // Move o arquivo para o diretório especificado
            if (move_uploaded_file($_FILES['imagem']['tmp_name'], $targetFilePath)) {
                // Caminho da imagem será armazenado no banco de dados
                $imagem = $fileName;
            } else {
                echo "Erro ao fazer upload da imagem.";
                exit();
            }
        } else {
            echo "Formato de imagem não suportado.";
            exit();
        }
    } else {
        echo "Por favor, selecione uma imagem para enviar.";
        exit();
    }

    $sql = "INSERT INTO marcadores (nome_local, rua, imagem, latitude, longitude, user_id) 
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssdsi', $nome_local, $rua, $imagem, $latitude, $longitude, $user_id);

    if ($stmt->execute()) {
        header('Location: mapa.php');
        exit();
    } else {
        echo "Erro ao adicionar o marcador.";
    }
}

// Pega os marcadores do banco de dados para serem utilizados no JavaScript
$marcadores = [];
$user_id = $_SESSION['user_id']; // ID do usuário logado
$sql = "SELECT * FROM marcadores";
$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $marcadores[] = [
            'id' => $row['id'],
            'nome_local' => addslashes($row['nome_local']),
            'rua' => addslashes($row['rua']),
            'imagem' => addslashes($row['imagem']),
            'latitude' => $row['latitude'],
            'longitude' => $row['longitude'],
            'isOwner' => ($row['user_id'] == $user_id)
        ];
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adicionar Mapa Local</title>
    <link rel="stylesheet" href="style2.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="icon" type="image/x-icon" href="../base/logoatt-1.png">
</head>
<body>
    <h1>Adicionar Marcador no Mapa</h1>
    <div class="main-container">
    <div id="map"></div>
    <form action="" method="POST" enctype="multipart/form-data">
        <label for="nome_local">Nome do Local:</label>
        <input type="text" id="nome_local" name="nome_local" required><br><br>

        <label for="rua">Rua:</label>
        <input type="text" id="rua" name="rua" required><br><br>

        <label for="imagem">Escolha uma Imagem:</label>
        <input type="file" id="imagem" name="imagem" accept="image/*" required><br><br>

        <input type="hidden" id="latitude" name="latitude">
        <input type="hidden" id="longitude" name="longitude">

        <button type="submit">Salvar Marcador</button>
    </form>
</div>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
        // Inicializa o mapa
        const map = L.map('map').setView([-24.167825736716335, -46.78885871612809], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        let marker;

        // Adiciona o marcador ao clicar no mapa
        map.on('click', function(e) {
            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

            document.getElementById('latitude').value = e.latlng.lat;
            document.getElementById('longitude').value = e.latlng.lng;
        });

        // Função para adicionar o popup com a opção de deletar
        function addMarkerPopup(marker, markerId, nome_local, rua, imagem, isOwner) {
            let deleteButton = '';
            if (isOwner) {
                deleteButton = `
                    <form method="POST" action="">
                        <input type="hidden" name="delete_marker_id" value="${markerId}">
                        <button type="submit">Deletar</button>
                    </form>`;
            }
            marker.bindPopup(`
                <div>
                    <p>Nome: ${nome_local}</p>
                    <p>Rua: ${rua}</p>
                    <img src="uploads/${imagem}" alt="${nome_local}" style="width: 100px;">
                    ${deleteButton}
                </div>
            `).openPopup();
        }

        // Dados dos marcadores do PHP para JavaScript
        const marcadores = <?php echo json_encode($marcadores); ?>;

        // Adiciona os marcadores ao mapa
        marcadores.forEach(function(marcador) {
            const marker = L.marker([marcador.latitude, marcador.longitude]).addTo(map);
            addMarkerPopup(marker, marcador.id, marcador.nome_local, marcador.rua, marcador.imagem, marcador.isOwner);
        });
    </script>
</body>
</html>
