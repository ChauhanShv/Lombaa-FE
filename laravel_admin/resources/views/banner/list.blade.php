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
                <h5>Banner List</h5>
            </div>

        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Banner title</th>
                        <th>Description</th>
                        <th>Action Label </th>
                        <th>Action</th>
                        <th>Action type</th> 
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach($banner as $data)  @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $data->title }}</td>
                        <td style="text-align: center;">{{ $data->description}}</td>
                        <td style="text-align: center;">{{ $data->action_label}}</td>
                        <td style="text-align: center;"><a href="{{$data->action}}">{{ $data->action}}</a></td>
                        <td style="text-align: center;">{{ $data->action_type}}</td>
                        <td style="text-align: center;">
                        <a href="{{ route('update_banner', $data->id) }}">
                                    <i class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>&nbsp&nbsp
                                <a href="{{ route('delete_banner', $data->id) }}" onclick="return confirm('Do you want to delete user : {{ $data->title }}')">
                                    <i class="icon-trash" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>&nbsp&nbsp
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
