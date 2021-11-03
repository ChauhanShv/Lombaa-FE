@extends('layout.app')
@section('body')
@include('layout.breadcrumb')
<div class="widget-box">
   <div class="widget-title">
      <span class="icon"> <i class="icon-align-justify"></i> </span>
      <h5>Users Details</h5>
   </div>
   <div class="widget-content nopadding">
      <form action="" method="" class="form-horizontal">
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Email :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold">{{$info->email}}</lable>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Phone Number :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold">{{$info->phoneNumber}}</lable>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Account Type :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold">{{$info->accountType}}</lable>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Facebook Verified :</label>
            <div class="controls ">
            @if(($info->isFacebookVerified)==0)
               <lable class="span11" style="font-weight: bold">Unverified</lable>
            @else
               <lable class="span11" style="font-weight: bold">Verified</lable>
            @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Google Verified :</label>
            <div class="controls ">
            @if(($info->isGoogleVerified)==0)
               <lable class="span11" style="font-weight: bold">Unverified</lable>
            @else
               <lable class="span11" style="font-weight: bold">Verified</lable>
            @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Phone Verified :</label>
            <div class="controls ">
            @if(($info->isPhoneVerified)==0)
               <lable class="span11" style="font-weight: bold">Unverified</lable>
            @else
               <lable class="span11" style="font-weight: bold">Verified</lable>
            @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Selfie Verified :</label>
            <div class="controls ">
            @if(($info->isSelfieVerified)==0)
               <lable class="span11" style="font-weight: bold">Unverified</lable>
            @else
               <lable class="span11" style="font-weight: bold">Verified</lable>
            @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">ID Verified :</label>
            <div class="controls ">
            @if(($info->isIdVerified)==0)
               <lable class="span11" style="font-weight: bold">Unverified</lable>
            @else
               <lable class="span11" style="font-weight: bold">Verified</lable>
            @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Email Verified :</label>
            <div class="controls ">
            @if(($info->isEmailVerified)==0)
               <lable class="span11" style="font-weight: bold">Unverified</lable>
            @else
               <lable class="span11" style="font-weight: bold">Verified</lable>
            @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Premium :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold">{{$info->isPremium}}</lable>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Products :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold"></lable>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Reviews :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold"></lable>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Payments :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold"></lable>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Reports :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold"></lable>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Made :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold"></lable>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label" style="font-weight: bold;">Received :</label>
            <div class="controls ">
               <lable class="span11" style="font-weight: bold"></lable>
            </div>
         </div>
      </form>
         <td>
            <a href="{{ route('user') }}">
               <button class="btn btn-primary" style="border-radius:6px; width:100px">Back</button>
            </a>
         </td>
   </div>
</div>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"
   integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
   crossorigin="anonymous"></script>
@endsection
