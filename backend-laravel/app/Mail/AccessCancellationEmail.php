<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AccessCancellationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    // public $amount;

    public function __construct($user)
    {
        $this->user = $user;
        // $this->amount = $amount;
    }

    public function build()
    {
        return $this->view('emails.access_cancellation')
            ->subject('Access Cancellation');
    }
}
