<?php
include 'db.php'; // Inclui a conexão com o banco de dados

// Variável para exibir a mensagem de sucesso ou erro
$message = '';
$message_type = ''; // Sucesso ou erro

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = htmlspecialchars(trim($_POST['fullname']));
    $email = htmlspecialchars(trim($_POST['email']));
    $password = htmlspecialchars(trim($_POST['password']));

    // Verifica se todos os campos foram preenchidos
    if (empty($fullname) || empty($email) || empty($password)) {
        $message = "Todos os campos são obrigatórios!";
        $message_type = "error";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Verifica se o formato do e-mail é válido
        $message = "Formato de e-mail inválido!";
        $message_type = "error";
    } else {
        // Criptografa a senha (exemplo usando md5, mas pode usar sha1 se preferir)
        $hashed_password = md5($password);

        // Prepara a consulta
        $stmt = $conn->prepare("INSERT INTO usuarios (fullname, email, password) VALUES (?, ?, ?)");

        if ($stmt) {
            // Vincula os parâmetros
            $stmt->bind_param("sss", $fullname, $email, $hashed_password);

            // Executa e verifica se a inserção foi bem-sucedida
            if ($stmt->execute()) {
                $message = "Cadastro realizado com sucesso!";
                $message_type = "success";
            } else {
                $message = "Erro ao cadastrar: " . $stmt->error;
                $message_type = "error";
            }

            $stmt->close();
        } else {
            $message = "Erro ao preparar a consulta: " . $conn->error;
            $message_type = "error";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link rel="stylesheet" href="style2.css">
    <link rel="icon" type="image/x-icon" href="../base/logoatt-1.png">
</head>
<body>
    <div class="register-container">
        <form action="register.php" method="POST" class="register-form">
            <h2>Cadastro</h2>
            <label for="fullname">Nome Completo</label>
            <input type="text" id="fullname" name="fullname" required>

            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Senha</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Cadastrar</button>

            <!-- Exibição da mensagem de confirmação ou erro -->
            <?php if (!empty($message)): ?>
                <div class="message <?php echo $message_type; ?>">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>

            <div class="login-link">
                <p>Já tem uma conta? <a href="login.php">Faça login</a></p>
            </div>
        </form>
    </div>
</body>
</html>
