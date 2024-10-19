<?php
session_start();
$isLoggedIn = isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] === true;
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ponto de Reciclagem em Itanhaém</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0">
    <link rel="icon" type="image/x-icon" href="./logoatt-1.png">
</head>

<body>
    <section>
        <nav class="navbar">
            <div class="navbar-container">
                <img src="./logoatt-1.png" alt="Logo">
                <h1>Ponto de Reciclagem em Itanhaém</h1>
            </div>
            <div>
                <ul class="navigation">
                    <button onclick="window.location.href='../tela dicas/mapa.php';"><a><li>MAPA</li></a></button>
                    <button onclick="window.location.href='../reciclagem/recicle.html';"><a><li>RECICLAGEM</li></a></button>
                </ul>
            </div>
            <div class="login-container">
                <?php if ($isLoggedIn): ?>
                    <!-- Ícone de login com menu suspenso (aparece quando logado) -->
                    <div class="icon" id="user-icon" onclick="toggleUserMenu()">
                        <img src="img car/person.png" alt="User Icon" class="login-icon">
                        <div id="user-menu" class="user-menu" style="display: none;">
                            <button onclick="redirectToPage()">Add Reciclagem</button>
                            <button onclick="logout()">Deslogar</button>
                        </div>
                    </div>
                <?php else: ?>
                    <!-- Exibir o botão de login se não estiver logado -->
                    <div id="login-button">
                        <a href="../tela cadastro-login/login.php">
                            <img src="img car/person.png" alt="User Icon" class="login-icon">
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </nav>
    </section>

    <main>
        <div class="container">
            <div class="slider-wrapper">
                <button id="prev-slide" class="slide-button material-symbols-rounded">chevron_left</button>
                <div class="image-list">
                    <img src="./img car/rec1.jpg" alt="img-1" class="image-item">
                    <img src="./img car/rec2.jpg" alt="img-2" class="image-item">
                    <img src="./img car/rec3.jpg" alt="img-3" class="image-item">
                    <img src="./img car/rec4.jpg" alt="img-4" class="image-item">
                    <img src="./img car/rec5.jpg" alt="img-5" class="image-item">
                    <img src="./img car/rec6.jpg" alt="img-6" class="image-item">
                    <img src="./img car/rec7.jpg" alt="img-7" class="image-item">
                    <img src="./img car/rec8.jpg" alt="img-8" class="image-item">
                    <img src="./img car/rec9.jpg" alt="img-9" class="image-item">
                    <img src="./img car/rec10.jpg" alt="img-10" class="image-item">
                </div>
                <button id="next-slide" class="slide-button material-symbols-rounded">chevron_right</button>
            </div>
            <div class="slider-scrollbar">
                <div class="scrollbar-track">
                    <div class="scrollbar-thumb"></div>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <nav class="navbar2">
            <div class="navbar-container2">
                <h3>Nosso Contato:<b></h3>
                tecwork00@gmail.com<b>
                <p>(13)00000-0000</p>
            </div>
        </nav>
    </footer>

    <script>
        // Função para alternar a exibição do menu suspenso
        function toggleUserMenu() {
            const menu = document.getElementById('user-menu');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }

        // Função de logout
        function logout() {
            window.location.href = 'logout.php'; // Redireciona para o arquivo de logout em PHP
        }

        // Redireciona para outra página
        function redirectToPage() {
            window.location.href = '../tela dicas/add_map_local.php'; // Substitua pela página desejada
        }
    </script>
</body>
</html>
