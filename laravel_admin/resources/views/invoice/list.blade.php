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
                <h5>Packages List</h5>
            </div>

        </div>
        <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
                <thead>
                    <tr>
                        <th># No.</th>
                        <th>Invoice Number</th>
                        <th>Price </th>
                        <th>Package Name</th>
                        <th>Status</th>
                        <th>User Email</th>
                        <th>User name</th>  
                        <th>Operations</th>               
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0 @endphp @foreach($invoices as $invoice)  @php $i++ @endphp
                    <tr class="gradeX" style="align-content: center;">
                        <td style="text-align: center;">{{ $i }}</td>
                        <td style="text-align: center;">{{ $invoice->invoiceNumber }}</td>
                        <td style="text-align: center;">{{ $invoice->price}}</td>
                        <td style="text-align: center;">{{ $invoice->package->name}}</td>
                        <td style="text-align: center;">{{ $invoice->status}}</td>
                        <td style="text-align: center;">{{ $invoice->user->email}}</td>
                        <td style="text-align: center;">{{ $invoice->user->name}}</td>
                        <td style="text-align: center;">
                        @if($invoice->status == 'unpaid')
                                <a href="{{ route('status_upated', $invoice->id)}}" onclick="return confirm('Do you want to delete user : {{ $invoice->invoiceNumber }}')">
                                    <i class="icon-check" style="width: 24px; height: 24px; font-size: 1.5em;"></i>
                                </a>&nbsp&nbsp
                        @endif
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
            <div class="" style="display: flex; justify-content: end;"></div>
        </div>
    </div>
</div>
@endsection
