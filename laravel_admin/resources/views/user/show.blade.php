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
            <label class="control-label">Email :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="{{ $info->email }}" readonly/>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Phone Number :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="{{ $info->phoneNumber }}" readonly/>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Account Type :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="{{ $info->accountType }}" readonly/>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Facebook Verified :</label>
            <div class="controls ">
               @if(($info->isFacebookVerified)==0)
                  <input type="text" name="username" class="span10" value="Unverified" readonly/>
               @else
                  <input type="text" name="username" class="span10" value="Verified" readonly/>
               @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Google Verified :</label>
            <div class="controls ">
               @if(($info->isGoogleVerified)==0)
                  <input type="text" name="username" class="span10" value="Unverified" readonly/>
               @else
                  <input type="text" name="username" class="span10" value="Verified" readonly/>
               @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Phone Verified :</label>
            <div class="controls ">
               @if(($info->isPhoneVerified)==0)
                  <input type="text" name="username" class="span10" value="Unverified" readonly/>
               @else
                  <input type="text" name="username" class="span10" value="Verified" readonly/>
               @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Selfie Verified :</label>
            <div class="controls ">
               @if(($info->isSelfieVerified)==0)
                  <input type="text" name="username" class="span10" value="Unverified" readonly/>
               @else
                  <input type="text" name="username" class="span10" value="Verified" readonly/>
               @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">ID Verified :</label>
            <div class="controls ">
               @if(($info->isIdVerified)==0)
                  <input type="text" name="username" class="span10" value="Unverified" readonly/>
               @else
                  <input type="text" name="username" class="span10" value="Verified" readonly/>
               @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Email Verified :</label>
            <div class="controls ">
               @if(($info->isEmailVerified)==0)
                  <input type="text" name="username" class="span10" value="Unverified" readonly/>
               @else
                  <input type="text" name="username" class="span10" value="Verified" readonly/>
               @endif
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Premium :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="{{ $info->isPremium }}" readonly/>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Products :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="" readonly/>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Reviews :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="" readonly/>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Payments :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="" readonly/>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Reports :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="" readonly/>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Made :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="" readonly/>
            </div>
         </div>
         <div class="control-group">
            <label class="control-label">Received :</label>
            <div class="controls ">
               <input type="text" name="username" class="span10" value="" readonly/>
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
