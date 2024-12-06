  <!-- Title -->
  <title>sadik test - Admin Panel</title>
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


  <!--Bootstrap css -->
  <!-- <link href="{{ URL::asset('assets/plugins/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet"> -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <!-- Style css -->
  <link href="{{ URL::asset('assets/css/style.css') }}" rel="stylesheet" />

  <!-- Animate css -->
  <link href="{{ URL::asset('assets/css/animated.css') }}" rel="stylesheet" />

  <!--Sidemenu css -->
  <link href="{{ URL::asset('assets/css/sidemenu.css') }}" rel="stylesheet">

  <!-- P-scroll bar css-->
  <link href="{{ URL::asset('assets/plugins/p-scrollbar/p-scrollbar.css') }}" rel="stylesheet" />

  <!---Icons css-->
  <link href="{{ URL::asset('assets/css/icons.css') }}" rel="stylesheet" />

  @yield('css')

  <!-- Simplebar css -->
  <link rel="stylesheet" href="{{ URL::asset('assets/plugins/simplebar/css/simplebar.css') }}">

  <style>
    .btn-blue-sky {
      background-color: #8ccde0 !important;
    }

    .btn-primary {
      background-color: #117AA1 !important;
    }

    /* // side bare style  */
    @media (min-width: 767px) {
      .sidebar-mini.sidenav-toggled .app-sidebar {
        max-height: 100%;
      }
    }

    .side_btn {
      border-radius: 20px;
      margin-right: 10px;
    }

    .active_icon {
      color: #117AA1;
    }
  </style>