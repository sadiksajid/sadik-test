<!-- Title -->
<title>sadik test - Admin Panel</title>
<meta name="csrf-token" content="{{ csrf_token() }}">

<!--Favicon -->
<link rel="icon" href="{{URL::asset('assets\images\svgs\fav_logo.svg')}}" type="image/x-icon" />

<!--Bootstrap css -->
<link href="{{URL::asset('assets/plugins/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">

<!-- Style css -->
<link href="{{URL::asset('assets/css/style.css')}}" rel="stylesheet" />
<link href="{{URL::asset('assets/css/dark.css')}}" rel="stylesheet" />
<link href="{{URL::asset('assets/css/skin-modes.css')}}" rel="stylesheet" />

<!-- Animate css -->
<link href="{{URL::asset('assets/css/animated.css')}}" rel="stylesheet" />

<!---Icons css-->
<link href="{{URL::asset('assets/css/icons.css')}}" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

@yield('css')

<!-- Color Skin css -->
<link id="theme" href="{{URL::asset('assets/colors/color1.css')}}" rel="stylesheet" type="text/css" />

<style>
	.bg-blue-sky {
		background-color: #8ccde0 !important;
	}
</style>