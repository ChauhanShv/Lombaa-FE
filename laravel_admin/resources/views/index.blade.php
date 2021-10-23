@extends('layout.app')
@section('title', 'Home')
@section('body')
@include('layout.breadcrumb')
<div style="text-align: center;"><h3 style="padding-top: 40px; font-weight: 300">Welcome to Lombaa app admin management system</h3></div>
<div class="container-fluid">
    <div class="quick-actions_homepage">
      <ul class="quick-actions">
        <li class="bg_lg span3"> <a href="#"> <i class="icon icon-group"></i><strong> Total Users </strong></a> </li>
        <li class="bg_ly span3"> <a href="#"> <i class="icon icon-money"></i><span class="label label-success"></span><strong> Total No.of items </strong></a> </li>
        <li class="bg_lo span3"> <a href="#"> <i class="icon icon-money"></i><strong>Total No of items sold</strong></a> </li>
        <li class="bg_lo span3"> <a href="#"> <i class="icon icon-group"></i> <strong> New Users in week </strong></a> </li>
        <li class="bg_ls span3"> <a href="#"> <i class="icon-tint"></i> <strong>Total no of buyers </strong></a> </li>
        <li class="bg_lb span3"> <a href="#"> <i class="icon-pencil"></i><strong>Total no of sellers </strong></a> </li>
      </ul>
    </div>
</div>

  @endsection