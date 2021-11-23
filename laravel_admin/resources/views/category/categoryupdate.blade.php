@extends('layout.app') 
@section('body') 
@include('layout.breadcrumb')
<div class="row-fluid">
    <div class="span12">
        <div class="widget-box">
            
            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
                <h5>Update Category :&nbsp&nbsp{{ $data->name }}</h5>
            </div>
            <div>

                <div class="widget-content nopadding">
                    @if (session('response'))
                    @if (session('response.status') == 'success')
                        <div class="alert alert-success">
                    @else
                        <div class="alert alert-warning ">
                    @endif
                        <button class="close" data-dismiss="alert">×</button>
                        {{ session('response.message') }}
                        </div>
                    @endif
                    @if($data)


                    <form action=""class="form-horizontal">
                        @csrf

                        <div class="control-group">
                            <label class="control-label">Category ID :</label>
                            <div class="controls">
                                <input type="text" name="id" class="span11" placeholder="Enter ID" value="{{ $data['id'] }}" readonly/>
                                @error('id')
                                <div class="alert alert-danger ">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label">Category Name :</label>
                            <div class="controls">
                                <input type="text" name="name" class="span11" placeholder="ENter Name" value="{{ $data['name'] }}" />
                                @error('name')
                                <div class="alert alert-danger ">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Description :</label>
                            <div class="controls">
                                <input type="text" name="description" class="span11" placeholder="Enter location" value="{{ $data['description'] }}" />
                                @error('location')
                                <div class="alert alert-danger ">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Icon :</label>
                            <div class="controls">
                                @if( $data->icon )
                                <!-- <image style="width:50px" src="{{ $data->icon->absolute_path }}"> -->
                                <input type="file" name="image" style="width: 40%" class="span11" value="" />

                                @else
                                <input type="file" name="image" style="width: 40%" class="span11" value="" />
                                @endif
                                @error('image')
                                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Popular :</label>
                            <div class="controls">
                                <input type="checkbox" name="popular"  {{ ($data->isPopular) ? 'checked' : '' }} data-toggle="toggle">
                                @error('popular')
                                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                                @enderror
                            </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label">Active :</label>
                                <div class="controls">
                                    <input type="checkbox" name="active" value="0" {{ ($data->isActive) ? 'checked' : '' }} data-toggle="toggle">
                                    @error('active')
                                    <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label">IsParent :</label>
                                <div class="controls">
                                    <input type="checkbox"  id="parentId" name="parent" value="0" data-toggle="toggle">
                                    @error('active')
                                    <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label">Parent Category :</label>
                                <div class="controls">
                                    <select id='catId' class="selectpicker" name="product">
                                    @foreach($categories as $category)
                                    @if(old('product', $data->parentId))
                                        <option value="{{ $data->parentId }}" >{{  $category->name  }}</option>
                                    @elseif (old('product', $data->parentId) == null)
                                        <option value="" selected>Select parent category</option>
                                    @else
                                        <option value="{{  $category->id }}">{{  $category->name }}</option>
                                    @endif
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
                                <select multiple name="fields[]" size="3">
                                @foreach($fields as $field)
                                    <option value="{{$field->id}}" >{{ $field->label}}</option>
                                    @endforeach
                                </select>
                                @error('product')
                                    <div class="alert alert-danger ">{{ $message }}</div>
                                @enderror 
                                </div>
                            </div> 
                            
                        @csrf
                        <div class="form-actions">
                            <button type="submit" class="btn btn-success">Update</button>
                        </div>
                    </form>
                    @else
                    <div class="alert alert-warning ">
                        <button class="close" data-dismiss="alert">×</button>
                        <h3>data not found</h3>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
     <script type="text/javascript"  src="{{ asset('assets/js/admin/update_category.js')}}"></script>