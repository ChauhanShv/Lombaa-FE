@extends('layout.app')
@section('body')
@include('layout.breadcrumb')
<div class="widget-box">
   <div class="widget-title">
      <span class="icon"> <i class="icon-align-justify"></i> </span>
            <div id="exTab3" class="container">
               <ul  class="nav nav-pills">
			         <li class="active">
                     <a  href="#1b" data-toggle="tab">Users Details</a>
			         </li>
			         <li>
                     <a href="#2b" data-toggle="tab">Payments</a>
			         </li>
			        {{-- <li>
                     <a href="#3b" data-toggle="tab">Received</a>
			         </li> --}}
                  <li>
                     <a href="#4b" data-toggle="tab">Packages</a>
			         </li>
		         </ul>
			         <div class="tab-content clearfix">
			            <div class="tab-pane active" style="padding: 0px 35px;" id="1b">
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;">Email : {{$user->email}}</label>
                              <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;">Phone Number : {{$user->phoneNumber}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;">Account Type : {{$user->accountType}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                        <div class="control-group">
                           <a href="{{ route('products_list', ['list_type' => $user->id])}}">
                              <button class="btn btn-success" style="border-radius:6px; width:20%">View Products</button>
                           </a>
                        </div>
				         </div>
                     <div class="tab-pane" style="padding: 0px 35px;" id="2b">
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;">Premium : {{$user->isPremium}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
				         </div>
                     {{-- <div class="tab-pane" style="padding: 0px 35px;" id="3b">
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;">Slug : $products->slug  </label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                     </div> --}}
                     <div class="tab-pane" style="padding: 0px 35px;" id="4b">
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;"> User Name : {{$user->email}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;"> Package Name : {{$package->name}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;"> Package validity : {{$package->validity}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;"> Package price : {{$package->price}} {{$package->currency}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;"> Category Name : {{$category->name}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;"> Package Start date : {{$packages->startDate}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
                        <div class="control-group">
                           <label class="control-label" style="font-weight: bold;"> Package Expired date : {{$packages->endDate}}</label>
                           <lable class="span11" style="font-weight: bold"></lable>
                        </div>
				         </div>
			      </div>
            </div>
            @if($user)
            <div class="widget-content nopadding">
               @else
               <div class="alert alert-warning ">
                  <button class="close" data-dismiss="alert">×</button>
                  <h3>data not found</h3>
               </div>
               @endif
            </div>
   </div>
</div>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"
   integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
   crossorigin="anonymous"></script>
@endsection
