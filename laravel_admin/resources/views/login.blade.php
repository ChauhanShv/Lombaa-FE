<!DOCTYPE html>
<html lang="en">
    
<head>
        <title>Admin Panel</title><meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/css/bootstrap-responsive.min.css') }}" />
        <link rel="stylesheet" href=" {{ asset('assets/css/matrix-login.css') }}" />
        <link href="{{ asset('assets/font-awesome/css/font-awesome.css') }}" rel="stylesheet" />
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800' rel='stylesheet' type='text/css'>

    </head>
        <body>
            <div id="loginbox"> 
                 @if (session('response'))
                        @if (session('response.status') == 'success')
                            <div class="alert alert-success">
                                @else
                                    <div class="alert alert-warning ">
                                        @endif
                                        <button class="close" data-dismiss="alert">×</button>
                                        {{ session('response.message') }}
                                    </div>
                                @endif
                <form id="loginform" class="form-vertical" action=""  method="post">
                     <div class="control-group normal_text"> <h3>Login</h3></div>
                        <div class="control-group">
                        <div class="controls">
                            <div class="main_input_box">
                                <span class="add-on bg_lg"><i class="icon-user"> </i></span><input type="text" name="username" placeholder="Username"/>
                                 @error('username')
                                 <div class="alert alert-danger ">{{ $message }}</div>
                                 @enderror
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <div class="main_input_box">
                                <span class="add-on bg_ly"><i class="icon-lock"></i></span><input type="password" name="password" placeholder="Password" />
                                 @error('password')
                                 <div class="alert alert-danger ">{{ $message }}</div>
                                 @enderror
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <span class="pull-right"><button class="btn btn-success" type="submit"> Login</button></span>
                    </div>
                    @csrf
                </form>
        </div>
        </div>
        <script src="{{ asset('assets/js/jquery.min.js') }}"></script>  
        <script src="{{ asset('assets/js/matrix.login.js') }}"></script> 
    </body>

</html>
