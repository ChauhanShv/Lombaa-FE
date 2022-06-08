@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Add-Static-Pages</h5>
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
          <form method="post" enctype="multipart/form-data" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Slug :</label>
              <div class="controls">
                <input type="text" name="slug" style="width: 40%" class="span11"  />
                @error('slug')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Content:</label>
              <div class="controls">
                <textarea name="contents" id="editor"></textarea>
                @error('contents')
                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                @enderror
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


<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="https://cdn.ckeditor.com/ckeditor5/34.1.0/classic/ckeditor.js"></script>
<script>
ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .then( editor => {
                console.log( editor );
        } )
        .catch( error => {
                console.error( error );
        } );
</script>
@endsection
