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
    <div>
        {{$user_list->links('pagination::bootstrap-4')}}
    </div>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach($user_list as $data) @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $data->email }}</td>
                        <td style="text-align: center;">{{ $data->phoneNumber }}</td>
                        <td style="text-align: center;">{{ $data->accountType }}</td>
                        @if(($data->isFacebookVerified)==0)
                        <td style="text-align: center;">unverified</td>
                        @else
                        <td style="text-align: center;">Verified</td>
                        @endif
                        @if(($data->isGoogleVerified)==0)
                        <td style="text-align: center;">unverified</td>
                        @else
                        <td style="text-align: center;">Verified</td>
                        @endif
                        @if(($data->isPhoneVerified)==0)
                        <td style="text-align: center;">unverified</td>
                        @else
                        <td style="text-align: center;">Verified</td>
                        @endif
                        @if(($data->isSelfieVerified)==0)
                        <td style="text-align: center;">unverified</td>
                        @else
                        <td style="text-align: center;">Verified</td>
                        @endif
                        @if(($data->isIdVerified)==0)
                        <td style="text-align: center;">unverified</td>
                        @else
                        <td style="text-align: center;">Verified</td>
                        @endif
                        @if(($data->isEmailVerified)==0)
                        <td style="text-align: center;">unverified</td>
                        @else
                        <td style="text-align: center;">Verified</td>
                        @endif
                        <td style="text-align: center;">{{ $data->isPremium }}</td>
                        <td>
                        @if(($data->isSuspended)==0)
                        <a href="{{ route('user', $data->id) }}" onclick="return confirm('Do you want to suspend this user?');">
                            <button class="btn btn-success" style="border-radius:6px; width:100px">Unsuspend</button>
                        </a>
                        @endif
                        @if(($data->isSuspended)==1)
                        <a href="{{ route('user', $data->id) }}" onclick="return confirm('Do you want to unblock this user?');">
                            <button class="btn btn-warning" style="border-radius:6px; width:100px">Suspended</button>
                        </a>
                        @endif  &nbsp&nbsp
                        @if(($data->isActive)==0)
                        <a href="" onclick="return confirm('Do you want to Deactive this user?');">
                            <button class="btn btn-success" style="border-radius:6px; width:100px">Deactive</button>
                        </a>
                        @endif
                        @if(($data->isActive)==1)
                        <a href="" onclick="return confirm('Do you want to Active this user?');">
                            <button class="btn btn-warning" style="border-radius:6px; width:100px">Active</button>
                        </a>
                        @endif 
                            <a href="{{ url('user', $data->id) }}">
                                <i class="icon icon-user" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                            </a>
                            <a href="">
                                <i class="icon-trash" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                            </a>
                        </td>
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
</div>
<div>
    {{$user_list->links('pagination::bootstrap-4')}}
</div>
@endsection
@section('javascript')
<script src="{{ asset('assets/js/admin/checkpoint.js') }}"></script>
@endsection