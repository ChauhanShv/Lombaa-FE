@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Update Region : {{ $region->name }} ({{ $region->id }})</h5>
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
          <form action="{{ route('update_region', $id) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group">
                <label class="control-label">Select country :</label>
                <div class="controls">
                    <select id='' name="country">
                        <option value="">Select Country</option>
                        <option value="{{ $region->country->id }}" selected>{{ $region->country->name }}</option>
                          @foreach($countries as $country)
                            @if( $region->country->id !==  $country->id)
                                <option value="{{ $country->id }}">{{ $country->name }}</option>
                            @endif
                          @endforeach
                    </select>
                </div>
            </div>
            <div class="control-group">
              <label class="control-label">Region Name :</label>
              <div class="controls">
                <input type="text" name="name" value="{{ old('name', $region->name) }}" style="width: 40%" class="span11"  />
                @error('name')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Region Code:</label>
              <div class="controls">
                <input type="text" name="code" value="{{ $region->code }}" style="width: 40%"  class="span11" />
                @error('code')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Latitude :</label>
              <div class="controls">
                <input type="text" name="lat" value="{{ old('name', $region->coordinate ? $region->coordinate->getLat() : '') }}" style="width: 40%"  class="span11" />
                @error('lat')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Longitude :</label>
              <div class="controls">
                <input type="text" name="long" value="{{ old('name', $region->coordinate ? $region->coordinate->getLng() : '') }}" style="width: 40%"  class="span11" />
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
