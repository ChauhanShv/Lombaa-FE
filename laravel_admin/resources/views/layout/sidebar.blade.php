<div id="sidebar"><a href="#" class="visible-phone"><i class="icon icon-home"></i> Dashboard</a>
    <ul>
        <li class="{{\Request::route()->getName() === 'home_get'? 'active': ''}}"><a href="#"><i
                    class="icon icon-home"></i> <span>Home</span></a></li>
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
        <li class="submenu {{\Request::route()->getPrefix() === 'admin/deposit' ? 'open active': ''}}">
            <a href="#"><i>&#8377;</i> <span>Deposit</span></a>
            <ul>
                <li class="{{\Request::route()->getName() === 'get_all_deposits'? 'active': ''}}">
                    <a href="{{ route('get_all_deposits') }}">All</a>
                </li>
                <li class="{{\Request::route()->getName() === 'get_pending_deposits'? 'active': ''}}">
                    <a href="{{ route('get_pending_deposits') }}">Pending</a>
                </li>
                <li class="{{\Request::route()->getName() === 'get_rejected_deposits'? 'active': ''}}">
                    <a href="{{ route('get_rejected_deposits') }}">Rejected</a>
                </li>
                <li class="{{\Request::route()->getName() === 'get_approved_deposits'? 'active': ''}}">
                    <a href="{{ route('get_approved_deposits') }}">Approved</a>
                </li>                
            </ul>
        </li>
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
            {{-- <ul>
                <li class="">
                    <a href="#">Add</a>
                </li>
                <li class="">
                    <a href="#">List</a>
                </li>
            </ul> --}}
        </li>
        {{-- <li class="{{\Request::route()->getName() === 'view_maintenance'? 'active': ''}}">
             <a href="{{ route('view_maintenance') }}"><i class="icon-cogs"></i> <span>Maintenance</span></a> --}}
            {{-- <ul>
                <li class="">
                    <a href="#">Add</a>
                </li>
                <li class="">
                    <a href="#">List</a>
                </li>
            </ul> --}}
        </li>
        <li class="submenu">
            <a href="">
                <i class="icon icon-user"></i> <span>User</span>
            </a>
            <ul>
                <li class="">
                    <a href="#">Add</a>
                </li>
                <li class="">
                    <a href="{{ route('user') }}">List</a>
                </li>
            </ul>
        </li>
        <li class="submenu">
            <a href="">
                <i class="icon icon-phone"></i> <span>Support</span>
            </a>
            <ul>
                <li class="">
                    <a href="#">Add</a>
                </li>
                <li class="">
                    <a href="#">List</a>
                </li>
            </ul>
        </li>
        <li class="submenu">
            <a href="">
                <i class="icon icon-certificate"></i> <span>Certificate</span>
            </a>
            <ul>
                <li class="">
                    <a href="#">Add</a>
                </li>
                <li class="">
                    <a href="#">List</a>
                </li>
            </ul>
        </li>
    </ul>
</div>
