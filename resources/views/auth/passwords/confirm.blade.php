@extends('admin.layouts.page.master')
@section('css')
@endsection
@section('content')
    <div class="page">
        <div class="page-content">
            <div class="container">
                <div class="row">
                    <div class="col-12">

                        <div class="text-white">
                            <div class="card-body">
                                <center id='lotify_div'>
                                    <lottie-player  src="{{ URL::asset('assets/SVG/code_bar.json') }}"  background="transparent"  speed="0.2"  style="width:30vw"  loop  autoplay></lottie-player>
                                </center>
                                <form method="POST" action="{{ route('password.confirm') }}">
                                    @csrf
                                    <h4 class="text-white-80 mb-5 text-center" >Confirm your Role Please!</h4>
                                    <div class="row">
                                        <div class="col-md-6 col-12 d-block mx-auto" >
                                    

                                            <div class="input-group mb-4  d-none login-form" id='login-form'>
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <i class="fe fe-lock"></i>
                                                    </div>
                                                </div>
                                                <input type="password" class="form-control" name="password" value="{{ old('password') }}" required autocomplete="current-password" placeholder="Password">
                                                @error('password')
                                                    <span class="invalid-feedback" style='display:block;color:white' role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror
                                     
                                            </div>
                            
                                            <div class="row">
                                                <div class="col-12" style=' justify-content: center;display: flex;'>
                                                    <button class="btn btn-light mr-4" id='usePass' >Use Password</button>
                                                    <button type="submit" class="btn  mr-4 d-none login-form"  style="background-color:#7300FF;color:white;width:200px">Next</button>
                                                    <button  class="btn   btn-danger px-4" id='backButton' >Back</button>
                                                    
                                                </div>
                                      
                                            </div>
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
 
@endsection
@section('js')
<script src="{{ URL::asset('assets\js\lottie-player.js') }}"></script>
<script src="{{ URL::asset('dist/ScannerScript.js') }}"></script>

<script>
  
    $("#backButton").on("click", function(event) {
        window.history.back();
    });

 
    
    $("#usePass").on("click", function(event) {
        $(".login-form").removeClass('d-none')
        $("#usePass").addClass('d-none')


        $("#lotify_div").html('')
        $("#lotify_div").html('<center> <lottie-player src="{{ URL::asset('assets/SVG/password_white.json') }}"  background="transparent"  speed="0.2"  style="width:250px;margin-top:-30px"  loop  autoplay></lottie-player> </center>') 
        
    });



    document.body.addEventListener('keydown', function(event) {
        if ($('#login-form').hasClass('d-none')) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default action
            }
            getkey(event,false); // Call getkey function

        } 
    });



</script>


@error('password')
<script>
$(document).ready( function() {

    $(".login-form").removeClass('d-none')
    $("#usePass").addClass('d-none')


    $("#lotify_div").html('')
    $("#lotify_div").html('<center> <lottie-player src="{{ URL::asset('assets/SVG/password_white.json') }}"  background="transparent"  speed="0.2"  style="width:250px;margin-top:-30px"  loop  autoplay></lottie-player> </center>') 
    
});

</script>
@enderror

@endsection
