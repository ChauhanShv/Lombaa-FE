@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Add-Banner</h5>
      </div>
      <div>
        @if (session('response'))
        @if (session('response.status') == 'success')
        <div class="alert alert-success">
          @else
          <div class="alert alert-error">
            @endif
            <button class="close" data-dismiss="alert">×</button>{{ session('response.message') }}</div>
          @endif
        </div>
        <div class="widget-content nopadding">
          <form method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Title :</label>
              <div class="controls">
                <input type="text" name="title" style="width: 40%" class="span11"  />
                @error('title')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Description:</label>
              <div class="controls">
                <input type="text" name="description" style="width: 40%"  class="span11" />
                @error('description')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Action lable  :</label>
              <div class="controls">
                <input type="text" name="actionLabel" style="width: 40%" class="span11" value="" />
                @error('actionLabel')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Action :</label>
              <div class="controls">
                <input type="text" name="action" style="width: 40%" class="span11" value="" />
                @error('action')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Action type  :</label>
              <div class="controls">
                    <select class="selectpicker" name="actionType">
                        <option value="" selected>Select action type </option>
                       
                            <option value="in-site-url">Internal Url</option>
                            <option value="ext-site-url">External Url</option>

                    </select>
                    @error('actionType')
                        <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            <div class="control-group">
              <label class="control-label">Media :</label>
              <div class="controls">
                <input type="file" name="image" style="width: 40%" class="span11" value="" />
                @error('media')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            @csrf
            <div class="form-actions">
              <button type="submit" class="btn btn-success">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection

<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript"  src="{{ asset('assets/js/admin/category.js')}}"></script>
