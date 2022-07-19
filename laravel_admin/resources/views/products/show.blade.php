@extends('layout.app')
@section('body')
@include('layout.breadcrumb')
<div class="row-fluid">
    <style>
      .no_margin {
          margin: 0px !important;
          margin-left: 20px !important;
      }
      .select2-drop-active {
          z-index: 999999999;
      }
      .select2-container {
          width: 100%;
      }

      input[type="file"] {
        display: block;
      }
      .imageThumb {
        max-height: 75px;
        border: 2px solid;
        padding: 1px;
        cursor: pointer;
      }
      .pip {
        display: inline-block;
        margin: 10px 10px 0 0;
      }
      .remove {
        display: block;
        background: #444;
        border: 1px solid black;
        color: white;
        text-align: center;
        cursor: pointer;
      }
      .remove:hover {
        background: white;
        color: black;
      }
      .fav_icons {
        margin-left: 7px;
      }
    </style>
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Product details
          @if(($product_data->approvedAt) == null && $product_data->rejectedAt == null)
            <span class="label no_margin label-warning">Under Review</span>
          @endif
          @if(($product_data->approvedAt) !== null)
            <span class="label no_margin label-success">Approved</span>
          @endif
          @if(($product_data->rejectedAt) !== null)
            <span class="label no_margin label-important">Rejected</span>
          @endif
          @if($product_data->favourite !==null )
          <i style="color: red" class="icon icon-heart fav_icons"></i>
          @endif
        </h5>
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
        <div class="widget-content">
          <form action="{{ route('update_product', ['id'=>$product_data->id]) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            @csrf
            <div class="control-group">
                <label class="control-label">Is Favourite : </label>
                <div class="controls">
                    <input type="text" name="" class="span6" placeholder="" value="{{ ($product_data->favourite)==null ? 'No' : 'Yes' }}" readonly/>
                </div>
            </div>
            @if($parent_category !== 'null')
            <div class="control-group">
                <label class="control-label">Parent category : </label>
                <div class="controls">
                    <input type="text" name="" class="span6" placeholder="" value="{{ $parent_category->name ?? '' }}" readonly/>
                </div>
            </div>
            @endif
            <div class="control-group">
                <label class="control-label">Sub category :</label>
                <div class="controls">
                    <select id='' class="span6" name="sub_category">
                      <option value="{{$product_data->category->id}}" selected>{{$product_data->category->name}}</option>
                          @foreach($sub_categories as $sub_category)
                            @if($sub_category->name !== $product_data->category->name)
                              <option value="{{ $sub_category->id }}">{{ $sub_category->name }}</option>
                            @endif
                          @endforeach
                    </select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">Posted at : </label>
                <div class="controls">
                    <input type="text" name="" class="span6" placeholder="" value="{{ $product_data->postedAt ?? '' }}" readonly/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">Approved at : </label>
                <div class="controls">
                    <input type="text" name="" class="span6" placeholder="" value="{{ $product_data->approvedAt ?? '' }}" readonly/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">Expiry at : </label>
                <div class="controls">
                    <input type="text" name="" class="span6" placeholder="" value="{{ $product_data->expiry ?? '' }}" readonly/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">Added by user : </label>
                <div class="controls">
                    <input type="text" name="" class="span6" placeholder="" value="{{ $product_data->user->name ?? '' }}" readonly/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label">Location :</label>
                <div class="controls">
                    <input type="text" name="" class="span6" placeholder="" value="{{ $product_data->location->city->name ?? ''}}, {{ $product_data->location->region->name ?? ''}}, {{ $product_data->location->country->name ?? ''}}" readonly/>
                </div>
            </div>
            @foreach($product_fields_data as $data)
            @if ($data->field->fieldType == 'title')
            <div class="control-group">
                <label class="control-label">Title :</label>
                <div class="controls">
                    <input type="text" name="title" class="span6" placeholder="Enter title" value="{{ $data->value }}" />
                    @error('title')
                    <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            @elseif($data->field->fieldType == 'description')
            <div class="control-group">
                <label class="control-label">Description :</label>
                <div class="controls">
                    <input type="text" name="description" class="span6" placeholder="Enter description" value="{{ $data->value }}" />
                    @error('description')
                    <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            @else
            <div class="control-group">
                <label class="control-label">{{ $data->field->label ?? ''}} :</label>
                <div class="controls">
                    <input type="text" name="" class="span6" placeholder="" value="{{ $data->value ?? ''}}" readonly/>
                </div>
            </div>
            @endif
            @endforeach
            <div class="form-actions">
                <button type="submit" class="btn btn-success">Update</button>
            </div>
          </form>
          <div class="field" align="left">
            <h4>Media</h4>
            @if($product_media->first() == null)
                <p style="color:red;">No media files</p>
            @endif
            @foreach($product_media as $media)
              @if($media->file->extension === 'mp4')
                <span class="pip">
                  <video width="150" controls>
                    <source src="{{$media->file->absolute_path}}" type="video/mp4">
                  </video>
                  <a href="{{ route('delete_media', ['id' => $media->id ]) }}" onclick="return confirm('Do you want to delete this media?');">
                    <span class="remove">Remove video</span>
                  </a>
                </span>
              @endif
              @if($media->file->extension !== 'mp4')
              <span class="pip">
                  <image class="imageThumb" src="{{$media->file->absolute_path}}">
                  <br/>
                  <a href="{{ route('delete_media', ['id' => $media->id ]) }}" onclick="return confirm('Do you want to delete this media?');">
                    <span class="remove">Remove image</span>
                  </a>
              </span>
              @endif
            @endforeach
          </div>
          <div class="form-actions">
            @if(($product_data->approvedAt) == null && $product_data->rejectedAt == null)
              <a href="{{ route('approve_product', ['id' => $product_data->id ]) }}" onclick="return confirm('Do you want to Approve this product?');">
                <button type="submit" class="btn btn-success">Approve product</button>
              </a>
              <a href="#myModal" data-toggle="modal">
                <button type="submit" class="btn btn-danger">Reject product</button>
              </a>
            @elseif(($product_data->approvedAt) !== null)
              <a href="#myModal" data-toggle="modal">
                <button type="submit" class="btn btn-danger">Reject product</button>
              </a>
            @elseif(($product_data->rejectedAt) !== null)
              <a href="{{ route('approve_product', ['id' => $product_data->id ]) }}" onclick="return confirm('Do you want to Approve this product?');">
                <button type="submit" class="btn btn-success">Approve product</button>
              </a>
            @endif
          </div>
        </div>
      </div>
    </div>
    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h3 id="myModalLabel">Select reason for rejection</h3>
      </div>
      <form action="{{ route('reject_product', ['id' => $product_data->id]) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
          <div class="modal-body girlLookAtThatBody" style="padding:30px; text-align:left;">
              <div class="control-group">
                  <label class="control-label">Select reason :</label>
                  <div class="controls">
                      <select name="reason" >
                      <option value="">Select reason</option>
                          @foreach($reject_reasons as $reason)
                              <option value="{{ $reason->body }}">{{ $reason->body }}</option>
                          @endforeach
                      </select>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                  @csrf
              <button type="submit" class="btn btn-primary">Reject</button>
          </div>
      </form>
    </div>

</div>

@endsection
