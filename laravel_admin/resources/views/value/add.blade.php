@extends('layout.app')
@section('body')
@include('layout.breadcrumb')

<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Add Value</h5>
      </div>
      <div>
        @if (session('response'))
          @if (session('response.status') == 'success')
            <div class="alert alert-success">
              <ul>
                <li>
                  <button class="close" data-dismiss="alert">×</button><strong>{{ session('response.value_name') }}</strong> value added successfully to Field: <strong>{{ session('response.field_name') }}</strong>
                </li>
              </ul>
          @else
            <div class="alert alert-error">
              <button class="close" data-dismiss="alert">×</button>{{ session('response.message') }}
          @endif
            </div>
         @endif
      </div>
        <div class="widget-content nopadding">

          <form action="{{ route('values_add') }}" method="post" enctype="multipart/form-data" class="form-horizontal">

            <div class="control-group">
              <label class="control-label">Select Field :</label>
              <div class="controls">
                <select id='' name="field">
                      <option value="">Select field</option>
                          @foreach($fields as $field)
                            <option value="{{ $field->id }}">{{ $field->label }}</option>
                          @endforeach
                    </select>
                @error('field')
                  <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Value name :</label>
              <div class="controls">
                <input type="text" name="name" value="{{ old('name')}}" style="width: 40%" class="span11"  />
                @error('name')
                  <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Icon:</label>
              <div class="controls">
                <input type="file" name="icon" value="" style="width: 40%" class="span11" />
                @error('icon')
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
