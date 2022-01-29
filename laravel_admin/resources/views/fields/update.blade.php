@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Update Field: {{ ($fields->label) }}</h5>
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
          <form action="{{ route('field_edit_post', $id) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Field Label :</label>
              <div class="controls">
                <input type="text" name="label" value="{{ old('label', $fields->label) }}" style="width: 40%" class="span11"  />
                @error('label')
                  <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Field tag :</label>
              <div class="controls">
                <input type="text" name="field_tag" value="{{ old('field_tag', $fields->field_tag) }}" style="width: 40%" class="span11"  />
                @error('field_tag')
                  <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Field Type:</label>
              <div class="controls">
                <select id='' name="fieldtype">
                  @if ($fields->fieldType !== null)
                    <option value="{{ $fields->fieldType }}" selected>{{ $fields->fieldType }}</option>
                  @endif
                    @foreach($field_types as $key => $field_type)
                      @if($field_type !== $fields->fieldType)
                        <option value="{{ $key }}">{{ $field_type }}</option>
                      @endif
                    @endforeach
                </select>
              @error('fieldtype')
                <div class="alert alert-danger ">{{ $message }}</div>
              @enderror
              </div>
            </div>
            <div class="control-group">
             <label class="control-label">Add new values :</label>
              <div class="controls">
                <select multiple name="values[]" size="" >
                    @foreach ($fields->values as $existing_value)
                      <option value="{{$existing_value->id}}" selected>{{ $existing_value->value}}</option>
                    @endforeach
                    @foreach($values as $value)
                      <option value="{{$value->id}}">{{ $value->value}}</option>
                    @endforeach
                </select>
                @error('values')
                    <div class="alert alert-danger ">{{ $message }}</div>
                @enderror
             </div>
            </div>
            <div class="control-group">
                <label class="control-label">Data Type:</label>
                <div class="controls">
                  <select id='' name="dataTypes">
                    @if ($fields->dataTypes !== null)
                      <option value="{{ $fields->dataTypes }}" selected>{{ $fields->dataTypes }}</option>
                      @foreach($data_types as $data_type)
                        @if($data_type !== $fields->dataTypes)
                          <option value="{{ $data_type }}">{{ $data_type }}</option>
                        @endif
                      @endforeach
                    @else
                      @foreach($data_types as $data_type)
                        <option value="{{ $data_type }}">{{ $data_type }}</option>
                      @endforeach
                    @endif
                  </select>
                </div>
            </div>
            <div class="control-group">
              <label class="control-label">Icon:</label>
              <div class="controls">
                  <div id="imageDisplay">
                      @if( $fields->iconId !== null)
                        <image style="width:50px" src="{{ $fields->icon->absolute_path }}">
                      @else
                        No Icon
                      @endif
                  </div>
                  <div id="uploadField">
                    <input type="file" name="icon" style="width: 40%" class="span11" value="" />
                  </div>
                  <button type="button" id="imageButton">Change Icon</button>
                  @error('icon')
                    <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                  @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Is Required:</label>
              <div class="controls">
                <input type="checkbox" name="required" value="0" {{ ($fields->isRequired) ? 'checked' : '' }} data-toggle="toggle">
                @error('required')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Is Active :</label>
              <div class="controls">
                <input type="checkbox" name="active" value="0" {{ ($fields->isActive) ? 'checked' : '' }} data-toggle="toggle">
                @error('active')
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript"  src="{{ asset('assets/js/admin/update_category.js')}}"></script>
