@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Add-Category</h5>
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
          <form action="{{ route('categories') }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Category Name :</label>
              <div class="controls">
                <input type="text" name="name" value="{{ old('name')}}" style="width: 40%" class="span11"  />
                @error('name')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Description:</label>
              <div class="controls">
                <input type="text" name="description" style="width: 40%"  value="{{ old('description')}}"  class="span11" />
                @error('description')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Icon :</label>
              <div class="controls">
                <input type="file" name="image" style="width: 40%" class="span11" value="" />
                @error('image')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Popular :</label>
              <div class="controls">
                <input type="checkbox" name="popular" data-toggle="toggle">
                @error('popular')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Active :</label>
              <div class="controls">
                <input type="checkbox" name="active" data-toggle="toggle">
                @error('active')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">IsParent :</label>
              <div class="controls">
                  <input type="checkbox"  id="parenttId" name="is_parent" data-toggle="toggle" >
                  @error('parent')
                  <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                  @enderror
              </div>
            </div>

            <div class="control-group" id='cattId'>
                <label class="control-label">Parent Category :</label>
                <div class="controls">
                    <select class="selectpicker" name="product">
                        <option value="Select parent category" selected>Select parent category</option>
                        @foreach($categories as $category)
                            <option value="{{  $category->id }}">{{ $category->name }}</option>
                        @endforeach
                    </select>
                    @error('product')
                        <div class="alert alert-danger ">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="control-group">
             <label class="control-label">Select Fields :</label>
              <div class="controls">
                <select multiple name="fields[]" size="3" >
                @foreach($fields as $field)
                    <option value="{{$field->id}}">{{ $field->label}}</option>
                    @endforeach
                </select>
                @error('fields')
                    <div class="alert alert-danger ">{{ $message }}</div>
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

<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript"  src="{{ asset('assets/js/admin/category.js')}}"></script>
