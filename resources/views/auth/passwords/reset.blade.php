@extends('admin.layouts.page.master')
@section('css')
@endsection
@section('content')
    <div class="page">
        <div class="page-single">
            <div class="container">
                <div class="row">
                    <div class="col mx-auto">
                        <div class="row justify-content-center">
                            <div class="col-md-5">
                                <div class="card">
                                    <form method="POST" action="{{ route('password.update') }}">
                                        @csrf

                                        <input type="hidden" name="token" value="{{ $token }}">

                                        <div class="card-body">
                                            <div class="text-center title-style mb-6">
                                                <h1 class="mb-2">Reset Password</h1>
                                                <hr>
                                                <p class="text-muted">Reset Password Page</p>
                                            </div>
                                            <div class="input-group mb-4">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <i class="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                                <input id="email" type="email"
                                                    class="form-control @error('email') is-invalid state-invalid @enderror"
                                                    name="email" value="{{ $email ?? old('email') }}" required
                                                    autocomplete="email" autofocus placeholder="Enter Email">
                                            </div>
                                            <div class="form-group">
                                                @error('email')
                                                    <div class="bg-danger-transparent-2 text-danger px-4 py-2 br-3 mb-4"
                                                        role="alert">{{ $message }}</div>
                                                @enderror
                                            </div>
                                            <div class="input-group mb-4">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <i class="fe fe-lock"></i>
                                                    </div>
                                                </div>
                                                <input id="password" type="password"
                                                    class="form-control @error('password') is-invalid state-invalid @enderror"
                                                    name="password" required autocomplete="new-password"
                                                    placeholder="Retype Password">
                                            </div>

                                            <div class="input-group mb-4">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <i class="fe fe-lock"></i>
                                                    </div>
                                                </div>
                                                <input id="password-confirm" type="password" class="form-control"
                                                    name="password_confirmation" required autocomplete="new-password"
                                                    placeholder="Retype Password">
                                            </div>
                                            <div class="form-group">
                                                @error('password')
                                                    <div class="bg-danger-transparent-2 text-danger px-4 py-2 br-3 mb-4"
                                                        role="alert">{{ $message }}</div>
                                                @enderror
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <button type="submit"
                                                        class="btn  btn-primary btn-block px-4">Reset</button>
                                                </div>
                                            </div>
                                            <div class="text-center pt-4">
                                                <div class="font-weight-normal fs-16">Forget it <a
                                                        class="btn-link font-weight-normal"
                                                        href="{{ route('login') }}">Send me back</a></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('js')
@endsection
