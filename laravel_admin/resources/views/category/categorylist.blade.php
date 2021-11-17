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
                <h5>Categories List</h5> 
            </div>
            <div>
                {{$category_list->links('pagination::bootstrap-4')}}
            </div>
        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Category ID</th>
                        <th>Name</th>
                        <th>Category Description</th>
                        <th>Is Popular</th>
                        <th>Is Active</th>
                        <th>Icon</th>
                        <th>Parent Category</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach($category_list as $data) @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $data->id }}</td>
                        <td style="text-align: center;">{{ $data->name }}</td>
                        <td style="text-align: center;">{{ $data->description }}</td>
                        <td style="text-align: center;">{{ $data->isPopular == 1? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ $data->isActive == 1? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ $data->iconId }}</td>
                        <td style="text-align: center;">{{ $data->parentId }}</td>
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
            <div class="" style="display: flex; justify-content: end;">
                {{$category_list->links('pagination::bootstrap-4')}}
            </div>
        </div>
    </div>
</div>
@endsection
@section('javascript')
<script src="{{ asset('assets/js/admin/checkpoint.js') }}"></script>
@endsection