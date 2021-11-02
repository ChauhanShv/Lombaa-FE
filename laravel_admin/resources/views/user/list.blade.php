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
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Join Date</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach($user_list as $data) @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $data->id }}</td>
                        <td style="text-align: center;">{{ $data->name }}</td>
                        @if(($data->memberSince)==null)
                        <td style="text-align: center;"></td>
                        @else
                        <td style="text-align: center;">{{ htmlspecialchars_decode(date('jS F Y', strtotime($data->memberSince))) }}</td>
                        @endif
                        <td style="text-align: center;">{{ $data->location }}</td>
                        <td>
                            @if(($data->isSuspended)==0)
                                <a href="{{ route('suspend', $data->id) }}" onclick="return confirm('Do you want to suspend this user?');">
                                    <button class="btn btn-success" style="border-radius:6px; width:100px">Suspend</button>
                                </a>
                            @endif
                            @if(($data->isSuspended)==1)
                                <a href="{{ route('unsuspend', $data->id) }}" onclick="return confirm('Do you want to unblock this user?');">
                                    <button class="btn btn-warning" style="border-radius:6px; width:100px">Unsuspend</button>
                                </a>
                            @endif  &nbsp&nbsp
                            @if(($data->isActive)==0)
                                <a href="{{ route('active', $data->id)}}" onclick="return confirm('Do you want to Deactive this user?');">
                                    <button class="btn btn-success" style="border-radius:6px; width:100px">Active</button>
                                </a>
                            @endif
                            @if(($data->isActive)==1)
                                <a href="{{ route('deactive', $data->id) }}" onclick="return confirm('Do you want to Active this user?');">
                                    <button class="btn btn-warning" style="border-radius:6px; width:100px">Deactive</button>
                                </a>
                            @endif &nbsp&nbsp
                                <a href="{{ url('user', $data->id) }}">
                                    <i class="icon icon-user" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>&nbsp&nbsp
                                <a href="{{ route('show_Data', $data->id) }}">
                                    <i class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>&nbsp&nbsp
                                <a href="{{ url('/user/delete', $data->id) }}">
                                    <i class="icon-trash" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>&nbsp&nbsp
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