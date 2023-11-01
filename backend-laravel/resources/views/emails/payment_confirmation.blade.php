
<!DOCTYPE html>
<html>
<head>
    <title>Payment Confirmation</title>
</head>
<body>
    <h1>Payment Successful</h1>
    <p>Dear {{ $user->name }},</p>
    <p>Thank you for your payment of {{ $amount }} USD.</p>
    <p>Your payment has been successfully processed.</p>
</body>
</html>
