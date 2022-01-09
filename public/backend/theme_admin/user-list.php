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
                            <h1 class="m-0 text-dark">User Manager :: List</h1>
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
                                    <select id="filter_group" name="filter_group" class="custom-select custom-select-sm mr-1" style="width: unset">
                                        <option value="default" selected="">- Select Group -</option>
                                        <option value="1">Admin</option>
                                        <option value="2">Manager</option>
                                        <option value="3">Member</option>
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
                                        <option value="delete">Delete</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select> <button id="bulk-apply" class="btn btn-sm btn-info">Apply <span class="badge badge-pill badge-danger navbar-badge" style="display: none"></span></button>
                                </div>
                                <div class="mb-1">
                                    <a href="user-form.php" class="btn btn-sm btn-info"><i class="fas fa-plus"></i> Add New</a>
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
                                            <th class=""><a href="#">Info</th>
                                            <th class="text-center">Group</th>
                                            <th class="text-center">Status</th>
                                            <th class="text-center">Created</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr class="my-read-only">
                                            <td class="text-center"></td>
                                            <td class="text-center">1</td>
                                            <td>
                                                <p class="mb-0">Username: admin</p>
                                                <p class="mb-0">Fullname: Nguyễn Văn Linh</p>
                                                <p class="mb-0">Email: admin@gmail.com</p>
                                            </td>
                                            <td class="text-center position-relative"><select name="select-group" class="custom-select custom-select-sm" style="width: unset" id="1" data-id="1">
                                                    <option value="1" selected="">Admin</option>
                                                    <option value="2">Manager</option>
                                                    <option value="3">Member</option>
                                                </select></td>
                                            <td class="text-center position-relative">
                                                <a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a>
                                            </td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> </p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 13/07/2020 16:57:06</p>
                                            </td>

                                            <td class="text-center"></td>
                                        </tr>

                                        <tr class="">
                                            <td class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="checkbox-2" name="checkbox[]" value="2">
                                                    <label for="checkbox-2" class="custom-control-label"></label>
                                                </div>
                                            </td>
                                            <td class="text-center">2</td>
                                            <td>
                                                <p class="mb-0">Username: manager01</p>
                                                <p class="mb-0">Fullname: Manager 01</p>
                                                <p class="mb-0">Email: manager01@gmail.com</p>
                                            </td>
                                            <td class="text-center position-relative"><select name="select-group" class="custom-select custom-select-sm" style="width: unset" id="2" data-id="2">
                                                    <option value="1">Admin</option>
                                                    <option value="2" selected="">Manager</option>
                                                    <option value="3">Member</option>
                                                </select></td>
                                            <td class="text-center position-relative">
                                                <a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a>
                                            </td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 13/07/2020 17:11:59</p>
                                            </td>

                                            <td class="text-center">
                                                <a href="#" class="rounded-circle btn btn-sm btn-secondary" title="Change Password">
                                                    <i class="fas fa-key"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-info" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-danger" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr class="">
                                            <td class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="checkbox-5" name="checkbox[]" value="5">
                                                    <label for="checkbox-5" class="custom-control-label"></label>
                                                </div>
                                            </td>
                                            <td class="text-center">5</td>
                                            <td>
                                                <p class="mb-0">Username: member01</p>
                                                <p class="mb-0">Fullname: Member 01</p>
                                                <p class="mb-0">Email: member01@hotmail.com</p>
                                            </td>
                                            <td class="text-center position-relative"><select name="select-group" class="custom-select custom-select-sm" style="width: unset" id="5" data-id="5">
                                                    <option value="1">Admin</option>
                                                    <option value="2">Manager</option>
                                                    <option value="3" selected="">Member</option>
                                                </select></td>
                                            <td class="text-center position-relative">
                                                <a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a>
                                            </td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 13/07/2020 17:20:36</p>
                                            </td>

                                            <td class="text-center">
                                                <a href="#" class="rounded-circle btn btn-sm btn-secondary" title="Change Password">
                                                    <i class="fas fa-key"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-info" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-danger" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr class="">
                                            <td class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="checkbox-6" name="checkbox[]" value="6">
                                                    <label for="checkbox-6" class="custom-control-label"></label>
                                                </div>
                                            </td>
                                            <td class="text-center">6</td>
                                            <td>
                                                <p class="mb-0">Username: manager02</p>
                                                <p class="mb-0">Fullname: Manager 02</p>
                                                <p class="mb-0">Email: manager02@gmail.com</p>
                                            </td>
                                            <td class="text-center position-relative">
                                                <select name="select-group" class="custom-select custom-select-sm" style="width: unset" id="6" data-id="6">
                                                    <option value="1">Admin</option>
                                                    <option value="2" selected="">Manager</option>
                                                    <option value="3">Member</option>
                                                </select>
                                            </td>
                                            <td class="text-center position-relative"><a href="#" class="my-btn-state rounded-circle btn btn-sm btn-danger"><i class="fas fa-minus"></i></a></td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 13/07/2020 17:21:17</p>
                                            </td>

                                            <td class="text-center">
                                                <a href="#" class="rounded-circle btn btn-sm btn-secondary" title="Change Password">
                                                    <i class="fas fa-key"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-info" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>

                                                <a href="#" class="rounded-circle btn btn-sm btn-danger" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>

                                        <tr class="">
                                            <td class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="checkbox-8" name="checkbox[]" value="8">
                                                    <label for="checkbox-8" class="custom-control-label"></label>
                                                </div>
                                            </td>
                                            <td class="text-center">8</td>
                                            <td>
                                                <p class="mb-0">Username: zendvn</p>
                                                <p class="mb-0">Fullname: ZendVN Admin</p>
                                                <p class="mb-0">Email: training@zend.vn</p>
                                            </td>
                                            <td class="text-center position-relative"><select name="select-group" class="custom-select custom-select-sm" style="width: unset" id="8" data-id="8">
                                                    <option value="1" selected="">Admin</option>
                                                    <option value="2">Manager</option>
                                                    <option value="3">Member</option>
                                                </select></td>
                                            <td class="text-center position-relative">
                                                <a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a>
                                            </td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 08/08/2020 16:41:43</p>
                                            </td>

                                            <td class="text-center">
                                                <a href="#" class="rounded-circle btn btn-sm btn-secondary" title="Change Password">
                                                    <i class="fas fa-key"></i>
                                                </a>

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