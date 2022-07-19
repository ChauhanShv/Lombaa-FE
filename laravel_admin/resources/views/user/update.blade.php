@extends('layout.app')
@section('body')
@include('layout.breadcrumb')
<div class="row-fluid">
    <div class="span12">
        <div class="widget-box">
            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
                <h5>Update-User-Info</h5>
            </div>
            <div>
                <div class="widget-content nopadding">
                    @if (session('response'))
                    @if (session('response.status') == 'success')
                        <div class="alert alert-success">
                    @else
                        <div class="alert alert-warning ">
                    @endif
                        <button class="close" data-dismiss="alert">×</button>
                        {{ session('response.message') }}
                        </div>
                    @endif
                    @if($data)
                    <form action="/user/edit" method="POST" class="form-horizontal">
                        @csrf
                        <div class="control-group">
                            <label class="control-label">Name :</label>
                            <div class="controls">
                                <input type="text" name="name" class="span11" placeholder="ENter Name" value="{{ $data['name'] }}" />
                                @error('name')
                                <div class="alert alert-danger ">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Location :</label>
                            <div class="controls">
                                <input type="text" name="location" class="span11" placeholder="Enter location" value="{{ $data['location'] }}" />
                                @error('location')
                                <div class="alert alert-danger ">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        @csrf
                        <div class="form-actions">
                            <button type="submit" class="btn btn-success">Update</button>
                        </div>
                    </form>
                    @else
                    <div class="alert alert-warning ">
                        <button class="close" data-dismiss="alert">×</button>
                        <h3>data not found</h3>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
