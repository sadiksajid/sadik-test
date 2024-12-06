<div class="app-header header">
    <div class="container-fluid">
        <div class="d-flex">
            <a class="header-brand" href="{{ url('/' . ($page = '')) }}">

            </a>
            <div class="app-sidebar__toggle" data-toggle="sidebar">
                <a class="open-toggle" href="{{ url('/' . ($page = '#')) }}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="feather feather-align-left header-icon mt-1">
                        <line x1="17" y1="10" x2="3" y2="10"></line>
                        <line x1="21" y1="6" x2="3" y2="6"></line>
                        <line x1="21" y1="14" x2="3" y2="14"></line>
                        <line x1="17" y1="18" x2="3" y2="18"></line>
                    </svg>
                </a>
            </div>
            <div class="d-flex order-lg-2 ml-auto">

                <div class="dropdown profile-dropdown">
                    <a href="{{ url('/' . ($page = '#')) }}" class="nav-link pr-0 leading-none"
                        data-toggle="dropdown">
                        <span>
                            <img src="{{ URL::asset('assets/images/users/user_icon.png') }}" alt="img"
                                class="avatar avatar-md brround">
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow animated">
                        <div class="text-center">
                            <a href="{{ url('/' . ($page = '#')) }}"
                                class="dropdown-item text-center user pb-0 font-weight-bold">{{ Auth::guard('web')->user()->firstname ?? '' }}
                                {{ Auth::guard('web')->user()->lastname ?? '' }}</a>
                            <span class="text-center user-semi-title"></span>
                            <div class="dropdown-divider"></div>
                        </div>

                        <a class="dropdown-item d-flex" href="{{ route('logout') }}"
                            onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <svg class="header-icon mr-3" xmlns="http://www.w3.org/2000/svg"
                                enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
                                <g>
                                    <rect fill="none" height="24" width="24" />
                                </g>
                                <g>
                                    <path
                                        d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                                </g>
                            </svg>
                            <div class="">Logout</div>
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST"
                            style="display: none;">
                            @csrf
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>