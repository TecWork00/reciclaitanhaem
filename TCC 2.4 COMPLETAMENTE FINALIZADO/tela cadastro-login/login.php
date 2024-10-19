<?php
session_start(); // Iniciar sessão para manter o usuário logado
include 'db.php'; // Conexão com o banco de dados

// Variável para exibir a mensagem de erro
$error_message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars(trim($_POST['email']));
    $password = htmlspecialchars(trim($_POST['password']));

    // Verifica se ambos os campos foram preenchidos
    if (!empty($email) && !empty($password)) {
        // Preparando e executando a consulta para buscar o usuário pelo email
        $stmt = $conn->prepare("SELECT id, password FROM usuarios WHERE email = ?");
        
        if ($stmt === false) {
            $error_message = "Erro na preparação da consulta: " . $conn->error;
        } else {
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                // Obtém os dados do usuário
                $user = $result->fetch_assoc();
                $hashed_password = $user['password']; // Senha criptografada do banco de dados (usando md5)
                $user_id = $user['id']; // ID do usuário

                // Verifica se a senha está correta usando md5
                if (md5($password) === $hashed_password) {
                    // Definindo variáveis de sessão
                    $_SESSION['loggedIn'] = true;   // Indica que o usuário está logado
                    $_SESSION['user_id'] = $user_id; // Armazena o ID do usuário na sessão
                    $_SESSION['email'] = $email;    // Armazena o e-mail do usuário na sessão

                    // Redireciona para a página inicial
                    header("Location: ../base/index.php");
                    exit;
                } else {
                    $error_message = "E-mail ou senha incorretos!";
                }
            } else {
                $error_message = "E-mail ou senha incorretos!";
            }
        }
    } else {
        $error_message = "Por favor, preencha ambos os campos!";
    }
}
?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="../base/logoatt-1.png">
</head>
<body>
    <div class="login-container">
        <h2 class="texto">Login</h2>
        <form method="POST" action="login.php">
            <div>
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div>
                <label for="password">Senha:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Entrar</button>
        </form>

        <!-- Exibir mensagem de erro -->
        <?php if (!empty($error_message)): ?>
            <div class="message error">
                <?php echo $error_message; ?>
            </div>
        <?php endif; ?>

        <!-- Adicionando o link para cadastro abaixo do formulário -->
        <div class="register-link">
            <p>Não tem uma conta? <a href="./register.php">Cadastrar-se</a></p>
        </div>
    </div>
</body>
</html>
