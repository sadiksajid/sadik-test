    <aside class="app-sidebar  ">
        <div class="app-sidebar__logo">
            <a class="header-brand" href="/dashboard">
                <img src="/assets/images/svgs/tmb_logo.svg" style='height:4rem' class="header-brand-img desktop-lgo"
                    alt="sadik test">

            </a>
        </div>
        <div class="app-sidebar__user">
            <div class="dropdown user-pro-body text-center">

                <div class="user-info">
                    <h5 class=" mb-1">{{ Auth::user()->name ?? '' }} <i
                            class="ion-checkmark-circled  text-success fs-12"></i>
                    </h5>
                    <span class="text-muted app-sidebar__user-name text-sm"></span>
                </div>
            </div>
        </div>
        <ul class="side-menu app-sidebar3">
            <li class="slide mt-3">
                <a class="side-menu__item" href="{{ url('/admin/events') }}">
                    <button class='btn btn-light active_icon side_btn'><i class="fa fa-bell"></i></button>
                    <span class="side-menu__label">Events</span><i
                        class="angle fa fa-angle-right"></i>
                </a>
            </li>
        </ul>
    </aside>
    <!--aside closed-->