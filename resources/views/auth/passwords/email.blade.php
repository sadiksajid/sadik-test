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
                                    <div class="card-body">
                                        <form method="POST" action="{{ route('password.email') }}">
                                            @csrf

                                            <div class="text-center title-style mb-6">
                                                <h1 class="mb-2">Forgot Password</h1>
                                                <hr>
                                                <p class="text-muted">Forgot Password Page</p>
                                            </div>
                                            @if (session('status'))
                                                <div class="alert alert-light-success" role="alert">
                                                    {{ session('status') }}
                                                </div>
                                            @endif
                                            <div class="input-group mb-4">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <i class="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                                <input
                                                    class="form-control @error('email') is-invalid state-invalid @enderror"
                                                    placeholder="Enter Email" type="email" name="email"
                                                    value="{{ old('email') }}" required autocomplete="Enter Email"
                                                    autofocus>
                                            </div>
                                            <div class="form-group">
                                                @error('email')
                                                    <div class="bg-danger-transparent-2 text-danger px-4 py-2 br-3 mb-4"
                                                        role="alert">{{ $message }}</div>
                                                @enderror
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <button type="submit" class="btn  btn-primary btn-block px-4"><i
                                                            class="fe fe-send"></i> Send</button>
                                                </div>
                                            </div>
                                            <div class="text-center pt-4">
                                                <div class="font-weight-normal fs-16">Forget it <a
                                                        class="btn-link font-weight-normal" href="{{ route('login') }}">Send
                                                        me back</a>
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
    </div>
@endsection
@section('js')
@endsection
