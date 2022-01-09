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
                            <h1 class="m-0 text-dark">Category Manager :: List</h1>
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
                            <h6 class="card-title">Search &amp; Filter</h6>
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
                                        <option value="delete">Delete</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select> <button id="bulk-apply" class="btn btn-sm btn-info">Apply <span class="badge badge-pill badge-danger navbar-badge" style="display: none"></span></button>
                                </div>
                                <div class="mb-1">
                                    <a href="category-form.php" class="btn btn-sm btn-info"><i class="fas fa-plus"></i> Add New</a>
                                </div>
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
                                            <th class="text-center">ID</th>
                                            <th class="text-center">Name</th>
                                            <th class="text-center">Picture</th>
                                            <th class="text-center">Status</th>
                                            <th class="text-center">Ordering</th>
                                            <th class="text-center">Created</th>
                                            <th class="text-center">Modified</th>
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
                                            <td class="text-center">Bà mẹ - Em bé</td>
                                            <td style="width: 150px; padding: 5px"><img class="item-image w-100" src="images/category1.jpg"></a></td>
                                            <td class="text-center position-relative">
                                                <a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a>
                                            </td>
                                            <td class="text-center position-relative"><input type="number" name="chkOrdering[1]" value="1" class="chkOrdering form-control form-control-sm m-auto text-center" style="width: 65px" id="chkOrdering[1]" data-id="1" min="1"></td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 15/07/2020 10:10:04</p>
                                            </td>
                                            <td class="text-center modified-1">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 11/08/2020 15:12:17</p>
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
                                            <td class="text-center">Chính Trị - Pháp Lý</td>
                                            <td style="width: 150px; padding: 5px"><img class="item-image w-100" src="images/category2.jpg"></td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-danger"><i class="fas fa-minus"></i></a></td>
                                            <td class="text-center position-relative"><input type="number" name="chkOrdering[2]" value="2" class="chkOrdering form-control form-control-sm m-auto text-center" style="width: 65px" id="chkOrdering[2]" data-id="2" min="1"></td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 15/07/2020 10:15:43</p>
                                            </td>
                                            <td class="text-center modified-2">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 08/08/2020 22:25:07</p>
                                            </td>
                                            <td class="text-center">
                                                <a href="" class="rounded-circle btn btn-sm btn-info" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>

                                                <a href="" class="rounded-circle btn btn-sm btn-danger" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
    <?php require_once 'html/footer.php'; ?>
    <!-- ./wrapper -->

    <!-- script -->
    <?php require_once 'html/script.php'; ?>
</body>

</html>