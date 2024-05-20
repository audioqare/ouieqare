<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $subject = $_POST['subject'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "contact@ouieqare.com";
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";

    $body = "Vous avez reçu un nouveau message de : $name\n";
    $body .= "Email: $email\n";
    $body .= "Sujet: $subject\n";
    $body .= "Message: $message";

    // Envoi de l'email
    if (mail($to, $subject, $body, $headers)) {
        echo '<p>Votre message a été envoyé avec succès!</p>';
    } else {
        echo '<p>Erreur lors de l\'envoi de votre message.</p>';
    }
}

