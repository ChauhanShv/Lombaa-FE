@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Add-Packages</h5>
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
          <form action="{{ route('add_packages') }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Package Name :</label>
              <div class="controls">
                <input type="text" name="name" value="{{ old('name')}}" style="width: 40%" class="span11"  />
                @error('name')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Title :</label>
              <div class="controls">
                <input type="text" name="title" value="{{ old('title')}}" style="width: 40%" class="span11"  />
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
            <div class="control-group" id='cattId'>
                <label class="control-label">Pacakge Type :</label>
                <div class="controls">
                    <select class="selectpicker" name="package-type">
                        <option value="Select package type" selected>Select package type</option>
                            <option value="booster">Booster</option>
                            <option value="premium">Premium</option>
                    </select>
                    @error('package-type')
                        <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            <div class="control-group">
              <label class="control-label">Validity :</label>
              <div class="controls">
                <input type="text" name="validity" value="{{ old('validity')}}" style="width: 40%" class="span11" />
                @error('validity')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">Price :</label>
              <div class="controls">
                <input type="text" name="price" value="{{ old('price')}}" style="width: 40%" class="span11" />
                @error('price')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Currency :</label>
              <div class="controls">
                <input type="text" name="currency" value="{{ old('currency')}}" style="width: 40%" class="span11" />
                @error('currency')
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

<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript"  src="{{ asset('assets/js/admin/category.js')}}"></script>
