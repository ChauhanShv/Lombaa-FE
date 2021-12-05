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
                <h5>Fields List</h5> 
            </div>
            <div>
               {{ $fields_list->links('pagination::bootstrap-4') }}
            </div>
        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Icon</th>
                        <th>Label</th>
                        <th>Is Required</th>
                        <th>Is Active</th>
                        <th>Data type</th>
                        <th>Field Type</th>
                        <th>Field Values</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach( $fields_list as $data ) @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;"><image style="width:50px; height:50px; border-radius: 5%;" src="{{ $data->icon->absolute_path }}"/></td>
                        <td style="text-align: center;">{{ $data->label }}</td>
                        <td style="text-align: center;">{{ $data->isRequired == 1? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ $data->isActive == 1? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ $data->dataTypes }}</td>
                        <td style="text-align: center;">{{ $data->fieldType }}</td>
                        <td style="text-align: center;">
                        @php $v = 1 @endphp
                        @foreach($field_values as $value)
                                @if ( $data->id == $value->fieldId )
                                        <span class="label label-primary">{{ $value->value }}</span>
                                        @php $v++ @endphp
                                @endif
                            @endforeach
                        </td>
                        <td style="text-align: center;">
                            &nbsp
                            <a href=" {{ route('field_edit', $data->id) }} ">
                                <i class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                            </a>
                            &nbsp
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
                {{ $fields_list->links('pagination::bootstrap-4') }}
            </div>
        </div>
    </div>
</div>
@endsection
@section('javascript')
<script src="{{ asset('assets/js/admin/checkpoint.js') }}"></script>
@endsection