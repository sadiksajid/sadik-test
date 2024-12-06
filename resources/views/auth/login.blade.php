@extends('admin.layouts.page.master')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-md-6 col-12" style="padding-top: 100px">
            <div class="text-white">
                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <h2 class="display-4 mb-2 font-weight-bold error-text text-center"><strong>Admin Login</strong></h2>
                        <h4 class="text-white-80 mb-7 text-center">Sign In to your admin account</h4>
                        <div class="row">
                            <div class="col-9 d-block mx-auto">
                                <div class="input-group mb-4">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">
                                            <i class="fe fe-user"></i>
                                        </div>
                                    </div>
                                    <input type="email" class="form-control" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="Email">
                                </div>
                                @error('email')
                                <div class="row">
                                    <div class="col-md-12 offset-md-2">
                                        <div class="form-check-label">
                                            {{ $message}}
                                        </div>
                                    </div>
                                </div>
                                @enderror

                                <div class="input-group mb-4">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">
                                            <i class="fe fe-lock"></i>
                                        </div>
                                    </div>
                                    <input type="password" class="form-control" name="password" value="{{ old('password') }}" required autocomplete="current-password" placeholder="Password">
                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <button type="submit" class="btn   btn-block px-4" style="background-color:#117AA1;color:white">Login</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-6 d-none d-md-flex align-items-center">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_vzizzcqi.json" background="transparent" speed="1" style="width: 500; height: 600;" loop autoplay></lottie-player>
        </div>
    </div>
</div>

@endsection