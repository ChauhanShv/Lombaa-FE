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
              <label class="control-label">Field Id :</label>
              <div class="controls">
                <input type="text" name="label" value="{{ old('label', $fields->id) }}" style="width: 40%" class="span11"  readonly/>
                @error('label')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>

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
              <label class="control-label">Field Type:</label>
              <div class="controls">  
                <select id='' name="fieldtype">
                  @if ($fields->fieldType !== null)
                  <option value="{{ $fields->fieldType }}" selected>{{ $fields->fieldType }}</option>

                  @foreach($fieldtypes as $field_type)
                  <option value="{{ $field_type }}">{{ $field_type }}</option>
                  @endforeach

                  else

                  @foreach($fieldtypes as $field_type)
                  <option value="{{ $field_type }}">{{ $field_type }}</option>
                  @endforeach

                  @endif
                </select>
              @error('fieldtype')
                <div class="alert alert-danger ">{{ $message }}</div>
              @enderror
              </div>
            </div>

            <div class="control-group" id="field_wrapper">
              <label class="control-label">Field Values :</label>
                @foreach ($fields->values as $value)
                  <div class="controls" >
                    <input type="text" name="field_name[]" value="{{ $value->value }}" style="width: 20%" class="span11"/>&nbsp;&nbsp;
                    <img style="width:40px;height:40px" src="{{ $value->icon->absolute_path }}"/>
                    <a href="javascript:void(0);" class="remove_button" title="Remove field">&nbsp;&nbsp;<button type="button">Remove Field</button></a>
                    
                    <a href="{{ route('update_icon', [$fields->label, $value->value, $value->icon->id]) }}" class="update_button" title="Update field">&nbsp;&nbsp;<button type="button">Change Icon</button></a>
                    @error('label')
                      <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                    @enderror
                  </div>
                @endforeach
            </div>

            <div class="control-group" id="field_wrapper">
              <div class="controls">       
                <a href="javascript:void(0);" id="add_button">Add field for Values</a>
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
                <img style="width:40px;height:40px" src="{{ $fields->icon->absolute_path }}" class="img-responsive"/>
                <input type="file" name="icon" style="width: 40%" class="span11" value="" />
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
    var fieldHTML = '<div class="controls" ><input type="text" name="field_name[]" value="{{ old('fieldvalue')}}" style="width: 20%" class="span11"  /><input type="file" name="valueIcon[]" style="width: 40%" class="span11" value="" /><a href="javascript:void(0);" class="remove_button" title="Add field">&nbsp;&nbsp;<button type="button">Remove Field</button></a></div>'; //New input field html 
    
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
