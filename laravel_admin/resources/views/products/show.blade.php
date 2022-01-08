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
                <label class="control-label">Posted at : <strong>{{ $product_data->postedAt ?? '' }}</strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Approved at : <strong>{{ $product_data->approvedAt ?? '' }}</strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Expiry at : <strong>{{ $product_data->expiry ?? '' }}</strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Added by user : <strong>{{ $product_data->user->name ?? '' }} </strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Location : <strong>{{ $product_data->location->city->name ?? ''}} </strong></label>
            </div>
            @php $i = 1; @endphp
            @foreach($product_fields_data as $data)
            <div class="control-group">
                <label class="control-label">Field [{{$i}}] : <strong>{{ $data->field->label ?? ''}} </strong></label>
            </div>
            <div class="control-group">
                <label class="control-label">Value [{{$i}}]: <strong>{{ $data->value ?? ''}} </strong></label>
            </div>
            @php $i++; @endphp
            @endforeach
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
