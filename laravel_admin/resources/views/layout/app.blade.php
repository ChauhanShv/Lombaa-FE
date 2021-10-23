<!DOCTYPE html>
<html lang="en">
<head>
    <title>@yield('title') - Admin</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap-responsive.min.css') }}"/>
    <link rel="stylesheet" href="{{ asset('assets/css/uniform.css') }}"/>
    <link rel="stylesheet" href="{{ asset('assets/css/select2.css') }}"/>
    <link rel="stylesheet" href="{{ asset('assets/css/matrix-style.css') }}"/>
    <link rel="stylesheet" href="{{ asset('assets/css/matrix-media.css') }}"/>
    <link href="{{ asset('assets/font-awesome/css/font-awesome.css') }}" rel="stylesheet"/>
    <link rel="stylesheet" href="{{ asset('assets/css/datepicker.css') }}"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/dt-1.10.22/datatables.min.css"/>
    <link rel="stylesheet" href="{{ asset('assets/css/admin.css') }}"/>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800' rel='stylesheet' type='text/css'>
    @stack('styles')
    @yield('head')
</head>

<body>
@include('layout.header')
@include('layout.sidebar')

<div id="content">
    @yield('body')
</div>

@include('layout.footer')
<script src="{{ asset('assets/js/excanvas.min.js')}}"></script>
<script src="{{ asset('assets/js/jquery.min.js') }}"></script>
<script src="{{ asset('assets/js/jquery.ui.custom.js') }}"></script>
<script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('assets/js/jquery.peity.min.js') }}"></script>
<script src="{{ asset('assets/js/bootstrap-datepicker.js') }}"></script>
<script src="{{ asset('assets/js/matrix.js') }}"></script>
<script src="{{ asset('assets/js/jquery.gritter.min.js') }}"></script>
<script src="{{ asset('assets/js/jquery.validate.js') }}"></script>
<script src="{{ asset('assets/js/matrix.form_validation.js') }}"></script>
<script src="{{ asset('assets/js/jquery.wizard.js') }}"></script>
<script src="{{ asset('assets/js/jquery.uniform.js') }}"></script>
<script src="{{ asset('assets/js/select2.min.js') }}"></script>


<script type="text/javascript">
    var APP_URL = {!! json_encode(url('/')) !!}
</script>
@yield('javascript')
</body>
</html>
