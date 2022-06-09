@extends('layout.app')
@section('body')
@include('layout.breadcrumb')
@if (session('response'))
@if (session('response.status') == 'success')
<div class="alert alert-success">
    @else
    <div class="alert alert-error">
        @endif
        <button class="close" data-dismiss="alert">×</button>
        {{ session('response.message') }}
    </div>
    @endif
    <div class="widget-box">
        <style>
            .widget-title{display:flex; justify-content:space-between;}
            .widget-title .pagination{margin:2px;}
            input[type="radio"] {
                display:block !important;
                opacity: 1 !important;
            }
            .select2-drop-active {
                z-index: 999999999;
            }
            .select2-container {
                width: 100%;
            }
        </style>
        <div class="widget-title">
            <div><span class="icon"><i class="icon-th"></i></span>
                <h5>Products List</h5>
            </div>
            <div>
                {{$products->links('pagination::bootstrap-4')}}
            </div>
            <div class="btn-group show-on-hover" style="padding-right: 10px;">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    Filter products <span class="caret"></span>
                </button>
                <ul class="dropdown-menu pull-right" style="text-align: left; "  role="menu">
                    <li><a href="{{ route('products_list', ['list_type' => 'all']) }}"><i style="color: grey" class="icon icon-list"></i>&nbsp;&nbsp;&nbsp;All</a></li>
                    <li class="divider"></li>
                    <li><a href="{{ route('filter', ['action' => 'under_review', 'list_type' => $list_type]) }}"><i style="color: grey" class="icon icon-exclamation-sign"></i>&nbsp;&nbsp;&nbsp;Under&nbsp;review</a></li>
                    <li class="divider"></li>
                    <li><a href="{{ route('filter', ['action' => 'active', 'list_type' => $list_type]) }}"><i style="color: grey" class="icon icon-ok"></i>&nbsp;&nbsp;&nbsp;Active</a></li>
                    <li class="divider"></li>
                    <li><a href="{{ route('filter', ['action' => 'declined', 'list_type' => $list_type]) }}"><i style="color: grey" class="icon icon-remove"></i>&nbsp;&nbsp;&nbsp;Declined</a></li>
                    <li class="divider"></li>
                    <li><a href="{{ route('filter', ['action' => 'expired', 'list_type' => $list_type]) }}"><i style="color: grey" class="icon icon-time"></i>&nbsp;&nbsp;&nbsp;Expired</a></li>
                    <li class="divider"></li>
                    <li><a href="{{ route('filter', ['action' => 'sold', 'list_type' => $list_type]) }}"><i style="color: grey" class="icon icon-thumbs-up"></i>&nbsp;&nbsp;&nbsp;Sold</a></li>
                </ul>
            </div>
        </div>
        <div class="widget-content nopadding" style="overflow: auto !important; scrollbar-base-color:#ffeaff ">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Approval</th>
                        <th>Sold</th>
                        <th>Posted On</th>
                        <th>Expiry</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @php $modal = 1; @endphp
                    @php $i = $products->perPage() * ($products->currentPage() - 1); @endphp
                    @foreach($products as  $product)  @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $product->categoryId == null ? 'N/A' : ($product->category->name ?? '') }}</td>
                        <td style="text-align: center;">{!! $product->locationId == null ? 'No Location' : ($product->location->city->name ?? '') . '  (' . ($product->location->region->code ?? '') . ',' . ($product->location->country->code ?? '') . ')' !!}</td>
                        <td style="text-align: center;">
                            @if($product->approvedAt == null && $product->rejectedAt == null)
                                <p>No</p>
                            @elseif($product->approvedAt !== null)
                                <p><strong>Yes</strong></p>
                                <p><strong>On :</strong>{{ \Carbon\Carbon::parse($product->approvedAt) }}</p>
                            @elseif($product->rejectedAt !== null)
                                <p><strong>No</strong></p>
                                <p><strong>On :</strong>{{ \Carbon\Carbon::parse($product->rejectedAt) }}</p>
                            @endif
                        </td>
                        <td style="text-align: center;">{!! $product->soldAt == null ? 'No' : 'Yes'. '<br>' . 'On:  ' . \Carbon\Carbon::parse($product->soldAt)->format('d/M/Y') !!}</td>
                        <td style="text-align: center;">{{ \Carbon\Carbon::parse($product->postedAt)->format('d/M/Y') }}</td>
                        <td style="text-align: center;">

                            @if ($product->expiry == null)
                                <p>N/A</p>
                            @else
                                <p>{{ \Carbon\Carbon::parse($product->expiry) }}</p>
                            @endif
                        </td>
                        <td style="text-align: center;">{{ $product->user->email }}</td>
                        <td style="text-align: center;">
                            @if(($product->approvedAt) == null && $product->rejectedAt == null)
                                <p><strong>Under&nbsp;Review</strong></p>
                                <a href="{{ route('approve_product', ['id' => $product->id ]) }}" onclick="return confirm('Do you want to Approve this product?');">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Approve" style="width: 24px; height: 24px; font-size: 1.5em;" class="icon icon-ok"></i>
                                </a>
                                <a href="#myModal-{{ $modal }}" data-toggle="modal">
                                   <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Reject" style="width: 24px; height: 24px; font-size: 1.5em;" class="icon icon-remove"></i>
                                </a>
                                <a href="{{ route('show_product', $product->id) }}">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="View" class="icon icon-eye-open" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>
                                <a href="{{ route('info', $product->user->id) }}">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="User profile" class="icon icon-user" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>
                                {{--
                                <a href="">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Edit" class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>
                                --}}
                                <a href="{{ route('delete_product', $product->id) }}">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Delete" class="icon-trash" style="width: 24px; height: 24px; font-size: 1.5em;" onclick="return confirm('Do you want to delete this product?');"></i>
                                </a>
                                <div id="myModal-{{ $modal }}" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                        <h3 id="myModalLabel">Select reason for rejection</h3>
                                    </div>
                                    <form action="{{ route('reject_product', ['id' => $product->id]) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
                                        <div class="modal-body girlLookAtThatBody" style="padding:30px; text-align:left;">
                                            <div class="control-group">
                                                <label class="control-label">Select reason :</label>
                                                <div class="controls">
                                                    <select id='' name="reason" class="display_class">
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
                            @elseif(($product->approvedAt) !== null)
                                <p><strong>Approved</strong></p>
                                <a href="#myModal-{{ $modal }}" data-toggle="modal">
                                   <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Reject" style="width: 24px; height: 24px; font-size: 1.5em;" class="icon icon-remove"></i>
                                </a>
                                <a href="{{ route('show_product', $product->id) }}">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="View" class="icon icon-eye-open"  style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>
                                <a href="{{ route('info', $product->user->id) }}">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="User profile" class="icon icon-user"  style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>
                                {{--
                                <a href="">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Edit" class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>
                                --}}
                                <a href="{{ route('delete_product', $product->id) }}">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Delete" class="icon-trash" style="width: 24px; height: 24px; font-size: 1.5em;" onclick="return confirm('Do you want to delete this product?');"></i>
                                </a>
                                <div id="myModal-{{ $modal }}" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                        <h3 id="myModalLabel">Select reason for rejection</h3>
                                    </div>
                                    <form action="{{ route('reject_product', ['id' => $product->id]) }}" method="post" enctype="multipart/form-data" class="form-horizontal">
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
                                            <div class="control-group">
                                                <label class="control-label">Description:</label> 
                                                <div class="controls">
                                                    <input type="text" name="description" style="width: 40%" class="span11" />
                                                    @error('description')
                                                    <div class="alert alert-danger " style="width: 34.2%">{{ $message }}</div>
                                                    @enderror
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
                            @elseif(($product->rejectedAt) !== null)
                                <p><strong>Rejected</strong></p>
                                <a href="{{ route('approve_product', ['id' => $product->id ]) }}" onclick="return confirm('Do you want to Approve this product?');">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Approve" style="width: 24px; height: 24px; font-size: 1.5em;" class="icon icon-ok"></i>
                                </a>
                                <a href="{{ route('show_product', $product->id) }}">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="View" class="icon icon-eye-open"  style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>
                                <a href="{{ route('info', $product->user->id) }}">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="User profile" class="icon icon-user"  style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>
                                {{--
                                <a href="">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Edit" class="icon-edit" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>
                                --}}
                                <a href="{{ route('delete_product', $product->id) }}">
                                    <i data-toggle="tooltip" data-trigger="hover" data-placement="left" title="Delete" class="icon-trash" style="width: 24px; height: 24px; font-size: 1.5em;" onclick="return confirm('Do you want to delete this product?');"></i>
                                </a>
                            @endif
                        </td>
                    </tr>
                    @php $modal++ @endphp
                    @endforeach
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </tbody>
            </table>
            <div class="" style="display: flex; justify-content: end;">
                {{$products->links('pagination::bootstrap-4')}}
            </div>
        </div>
    </div>
</div>
@endsection
