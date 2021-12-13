@extends('layout.app')
@section('body')
@include('layout.breadcrumb')

<style>
add_button {
  background-color: #e7e7e7; color: black; /* Green */
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
}
</style>


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Add Field</h5>
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
                      @foreach($fieldtypes as $field_type)
                        <option value="{{ $field_type }}">{{ $field_type }}</option>
                      @endforeach
                  </select>
                @error('fieldtype')
                  <div class="alert alert-danger ">{{ $message }}</div>
                @enderror
                </div>
            </div>

            <div class="control-group">
             <label class="control-label">Select Values :</label>
              <div class="controls">
                <select multiple name="values[]" size="" >
                    @foreach($values as $value)
                      <option value="{{$value->id}}">{{ $value->value}}</option>
                    @endforeach
                </select>
                @error('values')
                    <div class="alert alert-danger ">{{ $message }}</div>
                @enderror
             </div>
            </div>
            @if($values->isEmpty())
            <div class="control-group">
              <div class="controls">
                <a href="{{ route('values_add') }}"><p>Add Values first</p></a>
             </div>
            </div>
            @endif
            <div class="control-group">
                <label class="control-label">Data Type:</label>
                <div class="controls">
                    <select id='' name="dataTypes">
                      @foreach($data_types as $data_type)
                        <option value="{{ $data_type }}">{{ $data_type }}</option>
                      @endforeach
                  </select>
                </div>
            </div>
            <div class="control-group">
              <label class="control-label">Field icon:</label>
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script type="text/javascript">
$(document).ready(function(){
    var maxField = 10; //Input fields increment limitation
    var addButton = $('#add_button'); //Add button selector
    var wrapper = $('#field_wrapper'); //Input field wrapper
    var fieldHTML = '<div class="controls"><input type="text" name="field_name[]" value="" style="width: 20%" class="span11"></input>@error('field_name')<div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>@enderror<input type="file" name="valueIcon[]" style="width: 22%" class="span11" value=""></input> @error('valueIcon')<div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>@enderror<a href="javascript:void(0);" class="remove_button" title="Add field">&nbsp;&nbsp;<button type="button">Remove Field</button></a></div>'; //New input field html

    var x = 1; //Initial field counter is 1

    //Once add button is clicked
    $(addButton).click(function(){
        //Check maximum number of input fields
        if(x < maxField){
            x++; //Increment field counter
            $(wrapper).append(fieldHTML); //Add field html
        }
    });

    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button', function(e){
        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });
});
</script>
