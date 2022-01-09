<!DOCTYPE html>
<html>

<head>
    <?php require_once 'html/head.php'; ?>
</head>

<body class="hold-transition sidebar-mini layout-fixed text-sm">
    <div class="wrapper">

        <!-- Navbar -->
        <?php require_once 'html/navbar.php'; ?>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <?php require_once 'html/sidebar.php'; ?>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Group Manager :: List</h1>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <!-- Search & Filter -->
                    <div class="card card-info card-outline">
                        <div class="card-header">
                            <h6 class="card-title">Search & Filter</h6>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                    <i class="fas fa-minus"></i></button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row justify-content-between">
                                <div class="mb-1">
                                    <a href="#" class="mr-1 btn btn-sm btn-info">All <span class="badge badge-pill badge-light">15</span></a>
                                    <a href="#" class="mr-1 btn btn-sm btn-secondary">Active <span class="badge badge-pill badge-light">7</span></a>
                                    <a href="#" class="mr-1 btn btn-sm btn-secondary">Inactive <span class="badge badge-pill badge-light">8</span></a>
                                </div>
                                <div class="mb-1">
                                    <select id="filter_groupacp" name="filter_groupacp" class="custom-select custom-select-sm mr-1" style="width: unset">
                                        <option value="default" selected="">- Select Group ACP -</option>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                                <div class="mb-1">
                                    <form action="">
                                        <div class="input-group">
                                            <input type="text" class="form-control form-control-sm" name="search_value" value="" style="min-width: 300px">
                                            <div class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-danger" id="btn-clear-search">Clear</button>
                                                <button type="button" class="btn btn-sm btn-info" id="btn-search">Search</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- List -->
                    <div class="card card-info card-outline">
                        <div class="card-header">
                            <h4 class="card-title">List</h4>
                            <div class="card-tools">
                                <a href="#" class="btn btn-tool"><i class="fas fa-sync"></i></a>
                                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fas fa-minus"></i></button>
                            </div>
                        </div>
                        <div class="card-body">
                            <!-- Control -->

                            <div class="d-flex flex-wrap align-items-center justify-content-between mb-2">
                                <div class="mb-1">
                                    <select id="bulk-action" name="bulk-action" class="custom-select custom-select-sm mr-1" style="width: unset">
                                        <option value="" selected="">Bulk Action</option>
                                        <option value="multi-delete">Multi Delete</option>
                                        <option value="multi-active">Multi Active</option>
                                        <option value="multi-inactive">Multi Inactive</option>
                                    </select> <button id="bulk-apply" class="btn btn-sm btn-info">Apply <span class="badge badge-pill badge-danger navbar-badge" style="display: none"></span></button>
                                </div>
                                <a href="group-form.php" class="btn btn-sm btn-info"><i class="fas fa-plus"></i> Add New</a>
                            </div>
                            <!-- List Content -->
                            <form action="" method="post" class="table-responsive" id="form-table">
                                <table class="table table-bordered table-hover text-nowrap btn-table mb-0">
                                    <thead>
                                        <tr>
                                            <th class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="check-all">
                                                    <label for="check-all" class="custom-control-label"></label>
                                                </div>
                                            </th>
                                            <th class="text-center">ID</a></th>
                                            <th class="text-center">Name</a></th>
                                            <th class="text-center">Status</a></th>
                                            <th class="text-center">Group ACP</a></th>
                                            <th class="text-center">Created</a></th>
                                            <th class="text-center">Modified</a></th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="checkbox-1" name="checkbox[]" value="1">
                                                    <label for="checkbox-1" class="custom-control-label"></label>
                                                </div>
                                            </td>
                                            <td class="text-center">1</td>
                                            <td class="text-center">Admin</td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a></td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a></td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i></p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i></p>
                                            </td>
                                            <td class="text-center modified-1">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i></p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i></p>
                                            </td>
                                            <td class="text-center">
                                                <a href="" class="rounded-circle btn btn-sm btn-info" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-danger" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="checkbox-2" name="checkbox[]" value="2">
                                                    <label for="checkbox-2" class="custom-control-label"></label>
                                                </div>
                                            </td>
                                            <td class="text-center">2</td>
                                            <td class="text-center">Manager</td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a></td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a></td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 15/07/2020 10:15:43</p>
                                            </td>
                                            <td class="text-center modified-2">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 18/07/2020 03:01:45</p>
                                            </td>
                                            <td class="text-center">
                                                <a href="#" class="rounded-circle btn btn-sm btn-info" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-danger" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="checkbox-3" name="checkbox[]" value="3">
                                                    <label for="checkbox-3" class="custom-control-label"></label>
                                                </div>
                                            </td>
                                            <td class="text-center">3</td>
                                            <td class="text-center">Member</td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a></td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-danger"><i class="fas fa-minus"></i></a></td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 15/07/2020 10:16:02</p>
                                            </td>
                                            <td class="text-center modified-3">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> manager01</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 18/07/2020 15:18:44</p>
                                            </td>
                                            <td class="text-center">
                                                <a href="#" class="rounded-circle btn btn-sm btn-info" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-danger" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="checkbox-4" name="checkbox[]" value="4">
                                                    <label for="checkbox-4" class="custom-control-label"></label>
                                                </div>
                                            </td>
                                            <td class="text-center">4</td>
                                            <td class="text-center">Register</td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-danger"><i class="fas fa-minus"></i></a></td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-danger"><i class="fas fa-minus"></i></a></td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 15/07/2020 10:16:24</p>
                                            </td>
                                            <td class="text-center modified-4">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 18/07/2020 17:25:02</p>
                                            </td>
                                            <td class="text-center">
                                                <a href="#" class="rounded-circle btn btn-sm btn-info" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-danger" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <input type="hidden" name="sort_field" value="">
                                    <input type="hidden" name="sort_order" value="">
                                </div>
                            </form>
                        </div>
                        <div class="card-footer clearfix">
                            <ul class="pagination pagination-sm m-0 float-right">
                                <li class="page-item disabled"><a href="" class="page-link"><i class="fas fa-angle-double-left"></i></a></li>
                                <li class="page-item disabled"><a href="" class="page-link"><i class="fas fa-angle-left"></i></a></li>
                                <li class="page-item active"><a class="page-link">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#"><i class="fas fa-angle-right"></i></a></li>
                                <li class="page-item"><a class="page-link" href="#"><i class="fas fa-angle-double-right"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->
    </div>
    <!-- ./wrapper -->
    <?php require_once 'html/footer.php'; ?>

    <!-- script -->
    <?php require_once 'html/script.php'; ?>
</body>

</html>