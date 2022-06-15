<div id="sidebar"><a href="#" class="visible-phone"><i class="icon icon-home"></i> Dashboard</a>
    <ul>
        <li class="submenu {{\Request::is('dashboard') ? 'active open' : '' }}">
            <a href="{{ route('dashboard') }}">
                <i style="color: white" class="icon icon-home"></i> <span style="color: white">Home</span>
            </a>
            <ul>
                <li class="{{\Request::is('dashboard') ? 'active' : '' }}">
                    <a href="{{ route('dashboard') }}">Dashboard</a>
                </li>
            </ul>
        </li>
  {{--  <li class="submenu {{\Request::route()->getPrefix() === 'admin/user' ? 'open active': ''}}">
            <a href="#">
                <i class="icon icon-group"></i><span>Users</span>
            </a>
            <ul>
                <li class="{{\Request::route()->getName() === 'get_all_user'? 'active': ''}}">
                    <a href="{{ route('get_all_user') }}">ALL</a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::route()->getPrefix() === 'admin/kyc' ? 'open active': ''}}">
            <a href="#">
                <i class="icon icon-folder-close"></i><span>KYC</span>
            </a>
            <ul>
                <li class="{{\Request::route()->getName() === 'get_all_kyc'? 'active': ''}}">
                    <a href="{{ route('get_all_kyc') }}">All</a>
                </li>
                <li class="{{\Request::route()->getName() === 'get_pending_kyc'? 'active': ''}}">
                    <a href="{{ route('get_pending_kyc') }}">Pending</a>
                </li>
                <li class="{{\Request::route()->getName() === 'get_approved_kyc'? 'active': ''}}">
                    <a href="{{ route('get_approved_kyc') }}">Approved</a>
                </li>
                <li class="{{\Request::route()->getName() === 'get_reject_kyc'? 'active': ''}}">
                    <a href="{{ route('get_reject_kyc') }}">Rejected</a>
                </li>
            </ul>
        </li>
        @php
        $role = session()->get('role');
        @endphp
        @if($role !==2)
        <li class="submenu {{\Request::route()->getPrefix() === 'admin/withdraw' ? 'open active': ''}}">
            <a href="#"><i class="icon icon-money"></i> <span>Withdrawal</span></a>
            <ul>
                <li class="{{\Request::route()->getName() === 'get_all_withdraw'? 'active': ''}}">
                    <a href="{{ route('get_all_withdraw') }}">All</a>
                </li>
                <li class="{{\Request::route()->getName() === 'get_pending_withdraw'? 'active': ''}}">
                    <a href="{{ route('get_pending_withdraw') }}">Pending</a>
                </li>
                <li class="{{\Request::route()->getName() === 'get_rejected_withdraw'? 'active': ''}}">
                    <a href="{{ route('get_rejected_withdraw') }}">Rejected</a>
                </li>
                <li class="{{\Request::route()->getName() === 'get_approved_withdraw'? 'active': ''}}">
                    <a href="{{ route('get_approved_withdraw') }}">Approved</a>
                </li>
            </ul>
        </li>
        @endif
        <li class="submenu {{\Request::route()->getPrefix() === 'admin/transactions' ? 'open active': ''}}">
            <a href="#"><i class="icon icon-money"></i> <span>Transactions</span></a>
            <ul>
                <li class="{{\Request::route()->getName() === 'transaction_list'? 'active': ''}}">
                    <a href="{{ route('transaction_list') }}">All</a>
                </li>
            </ul>
        </li>
        <li class="submenu">
             <a href=""><i class="icon icon-film"></i> <span>News</span></a>
             <ul>
                <li class="">
                    <a href="#">Add</a>
                </li>
                <li class="">
                    <a href="#">List</a>
                </li>
            </ul>
        </li> --}}

        <li class="submenu {{\Request::is('user') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-user"></i> <span style="color: white" >User</span>
            </a>
            <ul>
               {{-- <li class="">
                    <a href="#">Add</a>
                </li> --}}
                <li class="{{\Request::is('user') ? 'active' : '' }}">
                    <a href="{{ route('user') }}">List</a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::is('category/*') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-phone"></i> <span style="color: white">Categories</span>
            </a>
            <ul>
                <li class="{{\Request::is('category/list') ? 'active' : '' }}">
                    <a href="{{ route('category_list') }}">List</a>
                </li>
                <li class="{{\Request::is('category/add') ? 'active' : '' }}">
                    <a href="{{ route('categories') }}">Add</a>
                </li>
            </ul>
        </li>
        @if(\Request::is('country'))
            <li class="submenu open active">
        @elseif(\Request::is('region'))
            <li class="submenu open active">
        @elseif(\Request::is('city'))
            <li class="submenu open active">
        @else
            <li class="submenu">
        @endif
            <a href="#">
                <i style="color: white" class="icon icon-globe"></i> <span style="color: white">Location</span>
            </a>
            <ul>
                <li class="{{\Request::is('country') ? 'active' : '' }}">
                    <a href="{{ route('country_list')}}">Country</a>
                </li>
                <li class="{{\Request::is('region') ? 'active' : '' }}">
                    <a href="{{ route('region_list') }}">Region</a>
                </li>
                <li class="{{\Request::is('city') ? 'active' : '' }}">
                    <a href="{{ route('city_list') }}">City </a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::is('products/*') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-star"></i> <span style="color: white">Products</span>
            </a>
            <ul>
                <li class="{{\Request::route()->getName() === 'products_list'? 'active': ''}}">
                    <a href="{{ route('products_list', ['list_type' => 'all']) }}">List</a>
                </li>
                <li class="{{\Request::is('products/reject_reason') ? 'active' : '' }}">
                    <a href="{{ route('reject_reason_list') }}">Reject reason</a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::is('fields*') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-edit"></i> <span style="color: white">Fields</span>
            </a>
            <ul>
                <li class="{{\Request::is('fields/list') ? 'active' : '' }}">
                    <a href="{{ route('field_list') }}">List</a>
                </li>
                <li class="{{\Request::is('fields') ? 'active' : '' }}">
                    <a href="{{ route('fields') }}">Add</a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::is('invoice*') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-edit"></i> <span style="color: white">Invoice</span>
            </a>
            <ul>
                <li class="{{\Request::is('invoice/list') ? 'active' : '' }}">
                    <a href="{{ route('invoice_list') }}">List</a>
                </li>
                <li class="{{\Request::is('fields') ? 'active' : '' }}">
                    <a href="{{ route('fields') }}">Add</a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::is('values*') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-list"></i> <span style="color: white">Values</span>
            </a>
            <ul>
                <li class="{{\Request::is('values') ? 'active' : '' }}">
                    <a href="{{ route('values') }}">List</a>
                </li>
            </ul>
            <ul>
                <li class="{{\Request::is('values/add') ? 'active' : '' }}" >
                    <a href="{{ route('values_add') }}">Add</a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::is('category/*') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-phone"></i> <span style="color: white">Packages</span>
            </a>
            <ul>
                <li class="{{\Request::is('packages/list') ? 'active' : '' }}">
                    <a href="{{ route('package_list') }}">List</a>
                </li>
                <li class="{{\Request::is('packages/add') ? 'active' : '' }}">
                    <a href="{{ route('add_packages') }}">Add</a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::is('settings') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-wrench"></i> <span style="color: white">Site Settings</span>
            </a>
            <ul>
                <li class="{{\Request::is('settings') ? 'active' : '' }}">
                    <a href="{{ route('settings') }}">Settings List</a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::is('banners*') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-wrench"></i> <span style="color: white">Banners</span>
            </a>
            <ul>
                <li class="{{\Request::is('banners/add') ? 'active' : '' }}">
                    <a href="{{ route('add_banners') }}">Add</a>
                </li>
                <li class="{{\Request::is('banners/list') ? 'active' : '' }}">
                    <a href="{{ route('list') }}">List</a>
                </li>
            </ul>
        </li>
        <li class="submenu {{\Request::is('pages*') ? 'open active' : '' }}">
            <a href="">
                <i style="color: white" class="icon icon-wrench"></i> <span style="color: white">Static Pages</span>
            </a>
            <ul>
                <li class="{{\Request::is('pages/') ? 'active' : '' }}">
                    <a href="{{ route('add_pages') }}">Add</a>
                </li>
               <li class="{{\Request::is('pages/list') ? 'active' : '' }}">
                    <a href="{{ route('page_list') }}">List</a>
                </li> 
            </ul>
        </li>
        <li class="submenu">
            <a href="">
                <i style="color: white" class="icon icon-certificate"></i> <span style="color: white">Certificate</span>
            </a>
            <ul>
                <li class="">
                    <a href="#">List</a>
                </li>
                <li class="">
                    <a href="#">Add</a>
                </li>
            </ul>
        </li>
    </ul>
</div>
