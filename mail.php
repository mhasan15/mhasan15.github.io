<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Autoload files if you haven't already
require 'vendor/autoload.php';

// Prevent direct script access
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Unauthorized access");
}

// Collect and sanitize form data
$name = isset($_POST['Name']) ? htmlspecialchars($_POST['Name']) : '';
$email = isset($_POST['E-mail']) ? filter_var($_POST['E-mail'], FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['Company']) ? htmlspecialchars($_POST['Company']) : 'No Subject';
$phone = isset($_POST['Phone']) ? htmlspecialchars($_POST['Phone']) : '';
$message = isset($_POST['Message']) ? htmlspecialchars($_POST['Message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    die("Please fill in all required fields");
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email address");
}

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';  // Your SMTP server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your-email@gmail.com'; // SMTP username
    $mail->Password   = 'your-app-password';    // SMTP password (use App Password for Gmail)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('waleedashraf9t@gmail.com'); // Your receiving email

    // Content
    $mail->isHTML(true);
    $mail->Subject = "Website Contact: $subject";
    $mail->Body    = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong><br>$message</p>
    ";
    $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\nMessage: $message";

    $mail->send();
    header("Location: " . $_SERVER['HTTP_REFERER'] . "?status=success");
    exit();
} catch (Exception $e) {
    header("Location: " . $_SERVER['HTTP_REFERER'] . "?status=error&message=" . urlencode($mail->ErrorInfo));
    exit();
}
?>