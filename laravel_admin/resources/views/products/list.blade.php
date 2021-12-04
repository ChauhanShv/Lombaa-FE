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
                    <li><a href="#"><i style="color: grey" class="icon icon-star"></i>&nbsp;&nbsp;&nbsp;In&nbsp;review</a></li>
                    <li class="divider"></li>
                    <li><a href="#"><i style="color: grey" class="icon icon-star"></i>&nbsp;&nbsp;&nbsp;Active</a></li>
                    <li class="divider"></li>
                    <li><a href="#"><i style="color: grey" class="icon icon-star"></i>&nbsp;&nbsp;&nbsp;Declined</a></li>
                    <li class="divider"></li>
                    <li><a href="#"><i style="color: grey" class="icon icon-star"></i>&nbsp;&nbsp;&nbsp;Expired</a></li>
                    <li class="divider"></li>
                    <li><a href="#"><i style="color: grey" class="icon icon-star"></i>&nbsp;&nbsp;&nbsp;Sold</a></li>
                </ul>
            </div>
            
        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Negotiable</th>
                        <th>Free</th>
                        <th>Buyer Deliver</th>
                        <th>Condition</th>
                        <th>Location</th>
                        <th>Promote</th>
                        <th>Deal</th>
                        <th>Approved</th>
                        <th>Sold</th>
                        <th>Posted On</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach($products as  $product)  @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $product->title }}</td>
                        <td style="text-align: center;">{{ $product->category_Id }}</td>
                        <td style="text-align: center;">{{ $product->price }}</td>
                        <td style="text-align: center;">{{ ($product->is_Negotiable) ? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ ($product->is_Free) ? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ ($product->buyer_Do_Delivery) ? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ $product->condition }}</td>
                        <td style="text-align: center;">{{ $product->location }}</td>
                        <td style="text-align: center;">{{ $product->promote_Type }}</td>
                        <td style="text-align: center;">{{ $product->deal_Method }}</td>
                        <td style="text-align: center;">{{ ($product->is_Approved) ? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ ($product->is_Sold) ? 'Yes' : 'No' }}</td>
                        <td style="text-align: center;">{{ \Carbon\Carbon::parse($product->postedAt)->format('d/m/Y') }}</td>
                        <td style="text-align: center; padding: 0px 40px 2px 35px;"><p><strong>In&nbsp;Review</strong></p>
                            <div class="btn-group show-on-hover">
                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                    Action <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu pull-right" style="text-align: center;" role="menu">
                                    <li><a href="{{ route('approve_reject', ['action' => 'approve', 'id' => $product->id ]) }}">Approve</a></li>
                                    <li class="divider"></li>
                                    <li><a href="{{ route('approve_reject', ['action' => 'reject', 'id' => $product->id]) }}">Reject</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
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