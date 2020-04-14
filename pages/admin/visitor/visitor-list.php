

<!-- begin:: Subheader -->
<div class="kt-subheader kt-grid__item" id="kt_subheader">
    <div class="kt-  container  kt-container--fluid ">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">
                Remote Data </h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <a href="#" class="kt-subheader__breadcrumbs-home"><i class="flaticon2-shelter"></i></a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="" class="kt-subheader__breadcrumbs-link">
                    Crud </a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="" class="kt-subheader__breadcrumbs-link">
                    KTDatatable </a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="" class="kt-subheader__breadcrumbs-link">
                    Base </a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="" class="kt-subheader__breadcrumbs-link">
                    Ajax Data </a>

                                                                                <!-- <span class="kt-subheader__breadcrumbs-link kt-subheader__breadcrumbs-link--active">Active link</span> -->
            </div>
        </div>
    </div>
</div>

<!-- end:: Subheader -->

<!-- begin:: Content -->
<div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">

    <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
            <div class="kt-portlet__head-label">
                <span class="kt-portlet__head-icon">
<!--                    <i class="kt-font-brand flaticon2-line-chart"></i>-->
                </span>
                <h3 class="kt-portlet__head-title">
                    <h2> Visitor List</h2>
                </h3>
            </div>
<!--            <div class="kt-portlet__head-toolbar">
                <div class="kt-portlet__head-wrapper">
                    <a href="?page=admin/add-institute" class="btn btn-clean btn-icon-sm">
                        Add New
                    </a>
                </div>
            </div>-->
        </div>
        <div class="kt-portlet__body">

            <!--begin: Search Form -->
            <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                <div class="row align-items-center">
                    <div class="col-xl-8 order-2 order-xl-1">
                        <div class="row align-items-center">
                            <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                <div class="kt-input-icon kt-input-icon--left">
                                    <input type="text" class="form-control" placeholder="Search..." id="generalSearch">
                                    <span class="kt-input-icon__icon kt-input-icon__icon--left">
                                        <span><i class="la la-search"></i></span>
                                    </span>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                    <div class="col-xl-4 order-1 order-xl-2 kt-align-right">
                        <a href="#" class="btn btn-default kt-hidden">
                            <i class="la la-cart-plus"></i> New Order
                        </a>
                        <div class="kt-separator kt-separator--border-dashed kt-separator--space-lg d-xl-none"></div>
                    </div>
                </div>
            </div>

            <!--end: Search Form -->
        </div>
        <div class="kt-portlet__body kt-portlet__body--fit">

            <!--begin: Datatable -->
            <div class="kt-datatable" id="ajax_data"></div>

            <!--end: Datatable -->
        </div>
    </div>
</div>

<!-- end:: Content -->

