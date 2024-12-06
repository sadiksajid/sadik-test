<?php

use App\Models\ServerAccess;
use Illuminate\Http\Request;
use App\Http\Controllers\VueAPI;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShippingCompaniesAPI;
use App\Http\Controllers\ApiWhatsappController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:api')->post('/shipping_company_status'    ,[ShippingCompaniesAPI::class, 'CompanyIntegrationStatus']);// good
Route::middleware('auth:api_server')->post('/get_text_whatsapp' ,[ApiWhatsappController::class, 'ReceiveTextMessages']);// good


