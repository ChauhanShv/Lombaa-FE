@extends('layout.app')
@section('body')
@include('layout.breadcrumb')
<div class="row-fluid">
  <div class="span12">
    <div class="widget-box">
      <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        <h5>Product details</h5>
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
            <div class="control-group">
                <label class="control-label">Posted at : <strong>{{ $data->product->postedAt ?? '' }}</strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Approved at : <strong>{{ $data->product->approvedAt ?? '' }}</strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Expiry at : <strong>{{ $data->product->expiry ?? '' }}</strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Added by user : <strong>{{ $data->product->user->name ?? '' }} </strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Location : <strong>{{ $data->product->location->city->name ?? ''}} </strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Field : <strong>{{ $data->field->label ?? ''}} </strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Value : <strong>{{ $data->value ?? ''}} </strong></label>
            </div>
            @csrf
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
