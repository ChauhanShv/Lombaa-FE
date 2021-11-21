@extends('layout.app') 
@section('body') 
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Add-Fields</h5>
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

          <form action="{{ route('fields') }}" method="post" enctype="multipart/form-data" class="form-horizontal">

            <div class="control-group">
              <label class="control-label">Field Label :</label>
              <div class="controls">
                <input type="text" name="label" value="{{ old('label')}}" style="width: 40%" class="span11"  />
                @error('label')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            
            <div class="control-group">
                  <label class="control-label">Field Type:</label>
                  <div class="controls">
                     <select id='' name="fieldtype">
                        @foreach($fieldtypes as $ft)
                        <option value="{{ $ft }}">{{ $ft }}</option>
                        @endforeach
                    </select>
                  @error('fieldtype')
                    <div class="alert alert-danger ">{{ $message }}</div>
                  @enderror
                  </div>
            </div>

            <div class="control-group">
              <label class="control-label">Field Values :</label>
              <div class="controls">
                <input type="text" name="fieldvalue" value="{{ old('fieldvalue')}}" style="width: 40%" class="span11"  />
                @error('label')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
                <div class="alert alert-warning " style="width: 34.2%">Enter values comma "," seperated</div>
              </div>
            </div>
            
            <div class="control-group">
                  <label class="control-label">Data Type:</label>
                  <div class="controls">
                     <select id='' name="datatype">
                        <option value="string">String</option>
                    </select>
                  </div>
            </div>
            <div class="control-group">
              <label class="control-label">Icon:</label>
              <div class="controls">
                <input type="file" name="icon" style="width: 40%" class="span11" value="" />
                @error('icon')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Is Required:</label>
              <div class="controls">
                <input type="checkbox" name="required" value="0" data-toggle="toggle">
                @error('required')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Is Active :</label>
              <div class="controls">
                <input type="checkbox" name="active" value="0" data-toggle="toggle">
                @error('active')
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