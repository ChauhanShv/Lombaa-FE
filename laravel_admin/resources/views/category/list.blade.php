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
            <style>
                .widget-secondary-title{display:flex; justify-content:end;}
            </style>
            <div class="widget-secondary-title">
                <div>
                    <a href="{{ route('categories') }}">
                        <button class="btn btn-success">Add Category</button>
                    </a>
                </div>
                <div class="btn-group show-on-hover" style="padding-right: 10px;">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                        Filter categories <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu pull-right" style="text-align: left; "  role="menu">
                        <li><a href="{{ route('category_list') }}"><i style="color: grey" class="icon icon-list"></i>All</a></li>
                        <li class="divider"></li>
                        <li><a href="{{ route('category_filter', ['action' => 'parent_categories']) }}"><i style="color: grey" class="icon icon-th-list"></i>Parent&nbsp;Categories</a></li>
                        <li class="divider"></li>
                        <li><a href="{{ route('category_filter', ['action' => 'sub_categories']) }}"><i style="color: grey" class="icon icon-list-alt"></i>Sub&nbsp;Categories</a></li>
                    </ul>
                </div>
                <div>
                    {{$category_list->links('pagination::bootstrap-4')}}
                </div>
            </div>
        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Icon</th>
                        <th>Category ID</th>
                        <th>Name</th>
                        <th>Category Description</th>
                        <th>Is Popular</th>
                        <th>Is Active</th>
                        <th>Parent Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = $category_list->perPage() * ($category_list->currentPage() - 1); @endphp
                    @foreach($category_list as $data) @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;"><image style="width:40px; height:40px; border-radius: 5%;" src="{{ $data->icon->absolute_path }}"></td>
                        <td style="text-align: center;">{{ $data->id }}</td>
                        <td style="text-align: center;">{{ $data->name }}</td>
                        <td style="text-align: center;">{{ $data->description }}</td>
                        <td style="text-align: center;">{{ $data->isPopular == 1? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ $data->isActive == 1? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">
                            @if ($data->parentId == null)
                                <p>Parent category</p>
                            @else
                                @foreach ($category_list as $category)
                                    @if ($data->parentId == $category->id )
                                        <p><strong>Sub category of :&nbsp;</strong>{{ $category->name }}</p>
                                    @endif
                                @endforeach
                            @endif
                        </td>
                        <td style="text-align: center;">
                            &nbsp
                            <a href="{{ route('update_category', $data->id) }}">
                                <i class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                            </a>
                            &nbsp
                            <a href="{{ route('delete_category', $data->id) }}" onclick="return confirm('Do you want to delete {{ $data->name }}')">
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
