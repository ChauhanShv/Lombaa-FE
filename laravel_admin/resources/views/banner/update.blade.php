@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Update-Packages</h5>
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
          <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Title :</label>
              <div class="controls">
                <input type="text" name="title" value="{{ old('name', $banner->title) }}" style="width: 40%" class="span11"  />
                @error('title')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Description:</label>
              <div class="controls">
                <input type="text" name="description" style="width: 40%"  value="{{ old('name', $banner->description) }}"  class="span11" />
                @error('description')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Action lable  :</label>
              <div class="controls">
                <input type="text" name="actionLabel" value="{{ old('name', $banner->action_label) }}" style="width: 40%" class="span11" value="" />
                @error('actionLabel')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Action :</label>
              <div class="controls">
                <input type="text" name="action" value="{{ old('name', $banner->action) }}" style="width: 40%" class="span11" value="" />
                @error('action')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group" id='cattId'>
                <label class="control-label">Action Type :</label>
                <div class="controls">
                    <select class="selectpicker" name="actionType">
                        <option value="{{ $banner->type }}" selected>{{ $banner->action_type }}</option>
                            <option value="in-site-url">in-site-url</option>
                            <option value="ext-site-url">ext-site-ur</option>
                    </select>
                    @error('actionType')
                        <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">Media:</label>
                <div class="controls">
                    <div id="imageDisplay">
                        @if($banner->mediaId !== null)
                            <image style="width:50px" src="{{ $banner->media }}">
                        @else
                            No Icon
                        @endif
                    </div>
                    <div id="uploadField">
                        <input  type="file" name="image" style="width: 40%" class="span11" value="" />
                    </div>
                    @error('media')
                        <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            @csrf
            <div class="form-actions">
              <button type="submit" class="btn btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection

<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript"  src="{{ asset('assets/js/admin/udpate_banner.js')}}"></script>
