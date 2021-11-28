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
        <style>
            .widget-title{display:flex; justify-content:space-between;}
            .widget-title .pagination{margin:2px;}
        </style>
        <div class="widget-title"> 
            <div><span class="icon"><i class="icon-th"></i></span>
                <h5>Country List</h5> 
            </div>
            
            <div>
                <a href="{{ route('country')}}" ">
                    <button class="btn btn-warning" style="border-radius:6px; width:100px">Add Country</button>
                 </a>
            </div>
        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Region Name</th>
                        <th>Region Code</th>
                        <th>Country </th>
                        <th>Actions<th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach($countries as $data)  @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $region->name }}</td>
                        <td style="text-align: center;">{{ $region->code}}</td>
                        <td style="text-align: center;">{{ $data->name}}</td>
                        <td>
                            <a href="#" onclick="return confirm('Do you want to Active this user?');">
                                    <button class="btn btn-warning" style="border-radius:6px; width:100px">Action</button>
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
            <div class="" style="display: flex; justify-content: end;"></div>
        </div>
    </div>
</div>
@endsection