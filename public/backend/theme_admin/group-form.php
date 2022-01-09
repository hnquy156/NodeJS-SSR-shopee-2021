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
                            <h1 class="m-0 text-dark">Group Manager :: Add</h1>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <div class="alert alert-danger alert-dismissible">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i class="icon fas fa-exclamation-triangle"></i> Lỗi!</h5>
                        <ul class="list-unstyled mb-0">
                            <li class="text-white"><b>Name:</b> Giá trị này không được rỗng!</li>
                            <li class="text-white"><b>Status:</b> Vui lòng chọn khác giá trị mặc định!</li>
                            <li class="text-white"><b>Group ACP:</b> Vui lòng chọn khác giá trị mặc định!</li>
                        </ul>
                    </div>
                    <div class="card card-info card-outline">
                        <div class="card-body">
                            <form action="" method="post" class="mb-0" id="admin-form">

                                <div class="form-group row">
                                    <label for="name" class="col-sm-2 col-form-label text-sm-right required">Name</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <input type="text" id="form[name]" name="form[name]" value="" class="form-control form-control-sm">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="status" class="col-sm-2 col-form-label text-sm-right">Status</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <select id="form[status]" name="form[status]" class="custom-select custom-select-sm">
                                            <option value="default"> - Select Status - </option>
                                            <option value="inactive">Inactive</option>
                                            <option value="active">Active</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="group_acp" class="col-sm-2 col-form-label text-sm-right">Group ACP</label>
                                <div class="col-xs-12 col-sm-8">
                                        <select id="form[group_acp]" name="form[group_acp]" class="custom-select custom-select-sm">
                                            <option value="default" selected> - Select Group ACP - </option>
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <input type="hidden" id="form[token]" name="form[token]" value="1596364518">
                            </form>
                        </div>
                        <div class="card-footer">
                            <div class="col-12 col-sm-8 offset-sm-2">
                                <a href="" class="btn btn-sm btn-success mr-1"> Save</a>
                                <a href="" class="btn btn-sm btn-success mr-1"> Save & Close</a>
                                <a href="" class="btn btn-sm btn-success mr-1"> Save & New</a>
                                <a href="group-list.php" class="btn btn-sm btn-danger mr-1"> Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->
        <?php require_once 'html/footer.php'; ?>
    </div>
    <!-- ./wrapper -->

    <!-- script -->
    <?php require_once 'html/script.php'; ?>
</body>

</html>