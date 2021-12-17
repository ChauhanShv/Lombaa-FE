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
                <h5>Countries List</h5>
            </div>
            <div>
                <a href="{{ route('country')}}">
                    <button class="btn btn-success">Add Country</button>
                 </a>
                 <a href="{{ route('region')}}">
                    <button class="btn btn-danger">Add Region</button>
                 </a>
                 <a href="{{ route('country')}}">
                    <button class="btn btn-info">Add City</button>
                 </a>
            </div>
        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Country Name</th>
                        <th>Country Code</th>
                        <th>Latitude and Longitude</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach($countries as  $data)  @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $data->name }}</td>
                        <td style="text-align: center;">{{ $data->code }}</td>
                        <td style="text-align: center;"><p><strong>Lat :</strong>&nbsp;{{ $data->coordinate ? $data->coordinate->getLat() : 'N/A' }}&nbsp;;&nbsp;<strong>Long :</strong>&nbsp;{{ $data->coordinate ? $data->coordinate->getLng() : 'N/A'}}</p></td>
                        <td style="text-align: center;">
                            <a href="{{ route('update_country', $data->id) }}">
                                <i class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
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
