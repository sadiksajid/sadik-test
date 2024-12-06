<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminEventsController;
use App\Http\Controllers\Auth\StafAuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

 
//////////////////////////////////////////// super admin

Route::prefix('admin')->name('admin.')->middleware(['auth:web', 'fw-block-blacklisted', 'fw-block-attacks'])->group(function () {
    Route::prefix('events')->name('events.')->group(function () {
        Route::get('/', [AdminEventsController::class, 'Index'])->name('index');
        Route::get('/create', [AdminEventsController::class, 'Create'])->name('create');
        Route::post('/store', [AdminEventsController::class, 'Store'])->name('store');
        Route::get('/edit/{id}', [AdminEventsController::class, 'Edit'])->name('edit');
        Route::put('/update/{id}', [AdminEventsController::class, 'Update'])->name('update');
        Route::delete('/delete/{id}', [AdminEventsController::class, 'Delete'])->name('destroy');
    });
});



Route::group(['middleware' => ['cache.assets', 'fw-block-blacklisted', 'fw-block-attacks', 'web']], function () {
   
    Route::get('/', function () {
        return redirect()->route('login');
    });
    Route::get('/login', [StafAuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [StafAuthController::class, 'login'])->name('login-post');
    Route::post('/logout', [StafAuthController::class, 'logout'])->name('logout');

});
