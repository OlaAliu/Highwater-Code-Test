<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PaymentConfirmationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $amount;

    public function __construct($user, $amount)
    {
        $this->user = $user;
        $this->amount = $amount;
    }

    public function build()
    {
        return $this->view('emails.payment_confirmation')
            ->subject('Payment Confirmation');
    }
}
