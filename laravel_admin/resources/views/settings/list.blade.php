@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>List of settings</h5>
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
          <form action="{{ route('settings_post') }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            @foreach ($setting as $setting)
            <div class="control-group">
              <label class="control-label">{{$setting->label}}</label>
              <div class="controls">
                <input type="text" name="{{$setting->key_name}}" value="{{$setting->value}}" style="width: 40%" class="span11" />
                @error('name')
                    <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            @endforeach
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
