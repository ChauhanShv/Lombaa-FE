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
                <h5>Values List</h5>
            </div>
            <style>
                .widget-secondary-title{display:flex; justify-content:end;}
            </style>
            <div class="widget-secondary-title">
                <div>
                    <a href="{{ route('values_add') }}">
                        <button class="btn btn-success">Add Value</button>
                    </a>
                </div>
                <div>
                {{ $values->links('pagination::bootstrap-4') }}
                </div>
            </div>
        </div>

        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Icon</th>
                        <th>Value Name</th>
                        <th>Belongs to Field</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = $values->perPage() * ($values->currentPage() - 1); @endphp
                    @foreach( $values as $data ) @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">
                        @if($data->iconId == null)
                        No Icon
                        @else<image style="width:50px; height:50px; border-radius: 5%;" src="{{ $data->icon->absolute_path ?? 'No icon' }}"/></td>
                        @endif
                        <td style="text-align: center;">{{ $data->value }}</td>
                        {{-- <td style="text-align: center;">{{ ($data->fieldId == null ) ? 'Not yet assigned to ay Field' : $data->field->label }}</td> --}}
                        <td style="text-align: center;">
                            @if($data->fieldId == null )
                                Not yet assigned to ay Field
                            @elseif($data->field == null)
                                Not yet assigned to ay Field
                            @else
                                {{ $data->field->label }}
                            @endif
                        </td>
                        <td style="text-align: center;">
                            &nbsp
                            <a href=" {{ route('values_update', $data->id) }} ">
                                <i class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                            </a>
                            <a href="{{ route('delete_value', $data->id) }}">
                                <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Delete" class="icon-trash" style="width: 24px; height: 24px; font-size: 1.5em;" onclick="return confirm('Do you want to delete value: {{ $data->value }} ?');"></i>
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
                {{ $values->links('pagination::bootstrap-4') }}
            </div>
        </div>
    </div>
</div>
@endsection
@section('javascript')
<script src="{{ asset('assets/js/admin/checkpoint.js') }}"></script>
@endsection
