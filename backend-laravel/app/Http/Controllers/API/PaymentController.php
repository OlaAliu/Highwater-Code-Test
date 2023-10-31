<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\PayPalService;
use Illuminate\Http\Request;
use App\Resolvers\PaymentPlatformResolver;
use App\Services\StripeService;
use App\Models\User;

class PaymentController extends Controller
{
    // protected $paymentPlatformResolver;

    protected $stripeService;

    public function __construct(StripeService $stripeService)
    {
        $this->stripeService = $stripeService;
    }

    // obtain data from payment form
    public function makePayment(Request $request)
    {
        $rules = [
            'value' => ['required', 'numeric', 'min:5'],
            'currency' => ['required', 'exists:currencies,iso'],
        ];

        $request->validate($rules);

        $paymentPlatform = resolve(StripeService::class);

        $last4 = $request->input('last_four');
        $pm_type = $request->input('payment_method');
        $email = $request->input('email');
        $address = $request->input('address');
        $state = $request->input('state');
        $city = $request->input('city');
        $zip = $request->input('zip');
        
        User::where('email', $email)
            ->update(['pm_last_four' => $last4, 'pm_type' => $pm_type , 'address'=>$address, 'state'=>$state,'city'=>$city,'zip'=>$zip]);
       

        return $paymentPlatform->handlePayment($request);


        return $request->all();
    } // End Method


    public function approval()
    {
        $paymentPlatform = resolve(StripeService::class);



        return $paymentPlatform->handleApproval();


        return redirect()->route('dashboard')->withErrors('We cannot retrieve your payment platform, Try again');
    } //End Method
    public function cancelled()
    {
        return redirect()->route('dashboard')->withErrors('You cancelled the payment');
    } //End Method
}
