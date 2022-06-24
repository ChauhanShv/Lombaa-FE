@extends('layout.app')
@section('body')
@include('layout.breadcrumb')


<div class="row-fluid">
    <div class="span12">
        <div class="widget-box">
            <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
                <h5>Update-Merchant-Bank-details</h5>
            </div>
            <div>
                @if (session('response'))
                @if (session('response.status') == 'success')
                <div class="alert alert-success">
                    @else
                    <div class="alert alert-error">
                        @endif
                        <button class="close" data-dismiss="alert">×</button>{{ session('response.message') }}
                    </div>
                    @endif
                </div>
                <div class="widget-content nopadding">
                    <form method="post" enctype="multipart/form-data" class="form-horizontal">
                        <div class="control-group">
                            <label class="control-label">Bank :</label>
                            <div class="controls">
                                <input type="text" name="bank" value="{{ old('name', $bank_details->bank) }}" style="width: 40%" class="span11" />
                                @error('bank')
                                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Account name:</label>
                            <div class="controls">
                                <input type="text" name="acct_name" value="{{ old('name', $bank_details->acct_name) }}" style="width: 40%" class="span11" />
                                @error('acct_name')
                                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Account number :</label>
                            <div class="controls">
                                <input type="text" name="acct_num" value="{{ old('name', $bank_details->acct_number) }}" style="width: 40%" class="span11" value="" />
                                @error('acct_num')
                                <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Account sort code :</label>
                            <div class="controls">
                                <input type="text" name="sort_code" value="{{ old('name', $bank_details->acct_sort_code) }}" style="width: 40%" class="span11" value="" />
                                @error('sort_code')
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
<script type="text/javascript" src="{{ asset('assets/js/admin/category.js')}}"></script>