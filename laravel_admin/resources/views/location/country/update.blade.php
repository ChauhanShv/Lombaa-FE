@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Update Country : {{ $country->name }}</h5>
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
          <form action="{{ route('update_country', $country->id) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Country Name :</label>
              <div class="controls">
                <input type="text" name="name" value="{{ old('name', $country->name) }}" style="width: 40%" class="span11"  />
                @error('name')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Country Code:</label>
              <div class="controls">
                <input type="text" name="code" value="{{ old('name', $country->code) }}" style="width: 40%"  class="span11" />
                @error('code')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Latitude :</label>
              <div class="controls">
                <input type="text" name="lat" value="{{ old('name',  $country->coordinate ? $country->coordinate->getLat() : '') }}" style="width: 40%"  class="span11" />
                @error('lat')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Longitude :</label>
              <div class="controls">
                <input type="text" name="long" value="{{ old('name',  $country->coordinate ? $country->coordinate->getLng() : '') }}" style="width: 40%"  class="span11" />
                @error('long')
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
