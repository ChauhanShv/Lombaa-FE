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
                <h5>Reject Reason List</h5>
            </div>
            <div>
                <a href="#myModalAdd">
                    <button data-toggle="modal" data-target="#myModalAdd" class="btn btn-success">Add Reject Reason</button>
                 </a>
            </div>
        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Reason</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @php $modal = 1; @endphp
                    @php $i = 0 @endphp @foreach($data as  $data)  @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $data->body }}</td>
                        <td style="text-align: center;">
                            <a href="#myModal-{{ $modal }}">
                                <i data-toggle="modal" data-target="#myModal-{{ $modal }}" class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                            </a>
                            <a href="{{ route('reject_reason_delete', $data->id) }}">
                                <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Delete" class="icon-trash" style="width: 24px; height: 24px; font-size: 1.5em;" onclick="return confirm('Do you want to delete: {{ $data->body }} ?');"></i>
                            </a>
                            <div id="myModal-{{ $modal }}" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h3 id="myModalLabel">Edit reason</h3>
                                </div>
                                <form action="{{ route('reject_reason_edit', $data->id) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
                                    <div class="modal-body" style="width:100%">
                                        <textarea style="width:85%" name="reason" rows="3">{{ $data->body }}</textarea>
                                        @error('reason')
                                            <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                                        @enderror
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                                            @csrf
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>

                        </td>
                    </tr>
                    @php $modal++ @endphp
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
    <div id="myModalAdd" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel">Add reason</h3>
        </div>
        <form action="{{ route('reject_reason_add') }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="modal-body" style="width:100%">
                <textarea style="width:85%" name="reason_body" rows="3"></textarea>
                @error('reason_body')
                    <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                    @csrf
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</div>
@endsection
