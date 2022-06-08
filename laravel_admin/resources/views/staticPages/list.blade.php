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
                <h5>Static pages List</h5>
            </div>

        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th> Title </th>
                        <th>Slug</th>
                        <th>Content</th>
                        <th>Enabled At </th>
                        <th>Operations </th>

                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach($pages as $data)  @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $data->title }}</td>
                        <td style="text-align: center;">{{ $data->slug }}</td>
                        <td style="text-align: center;">{{ strip_tags(html_entity_decode($data->content));}}</td>
                        <td style="text-align: center;">{{ $data->enabledAt}}</td>
                        <td>
                        <a href="">
                                    <i class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>&nbsp&nbsp
                                <a href="{{ route('delete_slug', $data->id)}}" onclick="return confirm('Do you want to delete user : {{ $data->slug }}')">
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
