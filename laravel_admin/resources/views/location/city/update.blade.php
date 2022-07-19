@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Update City : {{ $city->name }}</h5>
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
          <form action="{{ route('update_city', $id) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group">
                <label class="control-label">Select region :</label>
                <div class="controls">
                    <select id='' name="region">
                        <option value="">Select Regiony</option>
                        <option value="{{ $city->region->id }}" selected>{{ $city->region->name }}</option>
                          @foreach($regions as $region)
                            @if( $city->region->id !==  $region->id)
                                <option value="{{ $region->id }}">{{ $region->name }}</option>
                            @endif
                          @endforeach
                    </select>
                </div>
            </div>
            <div class="control-group">
              <label class="control-label">City Name :</label>
              <div class="controls">
                <input type="text" name="name" value="{{ old('name', $city->name) }}" style="width: 40%" class="span11"  />
                @error('name')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">City Code:</label>
              <div class="controls">
                <input type="text" name="code" value="{{ $city->code }}" style="width: 40%"  class="span11" />
                @error('code')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Latitude :</label>
              <div class="controls">
                <input type="text" name="lat" value="{{ old('name', $city->coordinate ? $city->coordinate->getLat() : '') }}" style="width: 40%"  class="span11" />
                @error('lat')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Longitude :</label>
              <div class="controls">
                <input type="text" name="long" value="{{ old('name', $city->coordinate ? $city->coordinate->getLng() : '' ) }}" style="width: 40%"  class="span11" />
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
