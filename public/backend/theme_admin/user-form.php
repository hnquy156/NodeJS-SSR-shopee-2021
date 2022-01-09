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
                            <h1 class="m-0 text-dark">User Manager :: Add</h1>
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
                            <li class="text-white"><b>Username:</b> Giá trị này không được rỗng!</li>
                            <li class="text-white"><b>Email:</b> Email không hợp lệ!</li>
                            <li class="text-white"><b>Group id:</b> Vui lòng chọn giá trị!</li>
                            <li class="text-white"><b>Password:</b> Giá trị này không được rỗng!</li>
                        </ul>
                    </div>
                    <div class="card card-info card-outline">
                        <div class="card-body">
                            <form action="" method="post" class="mb-0" id="admin-form">

                                <div class="form-group row">
                                    <label for="form[username]" class="col-sm-2 col-form-label text-sm-right required">Username</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <input type="text" id="form[username]" name="form[username]" value="" class="form-control form-control-sm">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[password]" class="col-sm-2 col-form-label text-sm-right required">Password</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <input type="text" id="form[password]" name="form[password]" value="" class="form-control form-control-sm">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[email]" class="col-sm-2 col-form-label text-sm-right required">Email</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <input type="text" id="form[email]" name="form[email]" value="" class="form-control form-control-sm">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[fullname]" class="col-sm-2 col-form-label text-sm-right">Fullname</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <input type="text" id="form[fullname]" name="form[fullname]" value="" class="form-control form-control-sm">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="status" class="col-sm-2 col-form-label text-sm-right required">Status</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <select id="form[status]" name="form[status]" class="custom-select custom-select-sm">
                                            <option value="default" selected=""> - Select Status - </option>
                                            <option value="inactive">Inactive</option>
                                            <option value="active">Active</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="group_id" class="col-sm-2 col-form-label text-sm-right required">Group</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <select id="form[group_id]" name="form[group_id]" class="custom-select custom-select-sm">
                                            <option value="default">- Select Group -</option>
                                            <option value="1">Admin</option>
                                            <option value="2">Manager</option>
                                            <option value="3">Member</option>
                                        </select>
                                    </div>
                                </div>
                                <input type="hidden" id="form[token]" name="form[token]" value="1597568129">
                            </form>
                        </div>
                        <div class="card-footer">
                            <div class="col-12 col-sm-8 offset-sm-2">
                                <a href="" class="btn btn-sm btn-success mr-1"> Save</a>
                                <a href="" class="btn btn-sm btn-success mr-1"> Save & Close</a>
                                <a href="" class="btn btn-sm btn-success mr-1"> Save & New</a>
                                <a href="user-list.php" class="btn btn-sm btn-danger mr-1"> Cancel</a>
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