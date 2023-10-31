
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentConfirmationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $amount;

    /**
     * Create a new message instance.
     *
     * @param User $user
     * @param float $amount
     */
    public function __construct($user, $amount)
    {
        $this->user = $user;
        $this->amount = $amount;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('Payment Confirmation')
            ->view('emails.payment-confirmation');
    }
}
