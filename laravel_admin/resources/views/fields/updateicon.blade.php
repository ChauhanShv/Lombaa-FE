@extends('layout.app') 
@section('body') 
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Update Icon: Field&nbsp;:&nbsp;{{ ($label) }}&nbsp;&nbsp;>&nbsp;&nbsp;Value&nbsp;:&nbsp;{{ ($value) }}&nbsp;&nbsp;>&nbsp;&nbsp;Icon Id&nbsp;:&nbsp;{{ ($icon->id) }}</h5>
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
          <form action="{{ route('update_icon_post', [$label, $value, $icon->id]) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group" id="field_wrapper">
                <div class="controls" >
                <input type="file" name="icon" style="width: 40%" class="span11" value="" />
                @error('label')
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


