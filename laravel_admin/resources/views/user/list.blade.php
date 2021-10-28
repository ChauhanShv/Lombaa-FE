@extends('layout.app')

@section('body')

@include('layout.breadcrumb')

@if (session('response')) 
@if (session('response.status') == 'success')
<div class="alert alert-success">
    @else
    <div class="alert alert-error">
        @endif
        <button class="close" data-dismiss="alert">×</button>
        {{ session('response.message') }}
    </div>
    @endif
  <div class="widget-box">
            <div class="widget-title"> <span class="icon"><i class="icon-th"></i></span>
              <h5>Users List</h5>
            </div>
            <div class="widget-content nopadding">
              <table class="table table-bordered data-table">
                <thead>
                  <tr>
                    <th># No.</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Account Type</th>
                    <th>Facebook Verified</th>
                    <th>Google Verified</th>
                    <th>Phone Verified</th>
                    <th>Selfie Verified</th>
                    <th>ID Verified</th>
                    <th>Email Verified</th>
                    <th>Premium</th>
                    <th>Action</th>
                  </tr>
                </thead>
            <tbody>
                @php $i = 0 @endphp @foreach($userlist as $data) @php $i++ @endphp
                <tr class="gradeX" style="align-content: center;">
                    <td style="text-align: center;">{{ $i }}</td>
                    <td style="text-align: center;">{{ $data->email }}</td>
                    <td style="text-align: center;">{{ $data->phoneNumber }}</td>
                    <td style="text-align: center;">{{ $data->accountType }}</td>
                    <td style="text-align: center;">{{ $data->isFacebookVerified }}</td>
                    <td style="text-align: center;">{{ $data->isGoogleVerified }}</td>
                    <td style="text-align: center;">{{ $data->isPhoneVerified }}</td>
                    <td style="text-align: center;">{{ $data->isSelfieVerified }}</td>
                    <td style="text-align: center;">{{ $data->isIdVerified }}</td>
                    <td style="text-align: center;">{{ $data->isEmailVerified }}</td>
                    <td style="text-align: center;">{{ $data->isPremium }}</td>
                    @if(($data->isSuspended)==0)
                    <td> <a href="" onclick="return confirm('Do you want to suspend this user?');">
                        <button class="btn btn-success" style="border-radius:6px; width:100px">Suspend</button>
                    </a></td>
                    @endif
                    @if(($data->isSuspended)==1)
                    <td><a href="" onclick="return confirm('Do you want to unblock this user?');">
                        <button class="btn btn-warning" style="border-radius:6px; width:100px">Suspended</button>
                    </a></td>
                    @endif
                </tr>
                @endforeach
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </tbody>
            
           
        </table>
    </div>

</div>
<div style="background-color: red">
    {{$userlist->links('pagination::bootstrap-4')}}
</div>

@endsection
@section('javascript')
<script src="{{ asset('assets/js/admin/checkpoint.js') }}"></script>
@endsection