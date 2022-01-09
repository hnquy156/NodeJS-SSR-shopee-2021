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
                            <h1 class="m-0 text-dark">Book Manager :: Add</h1>
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
                        </ul>
                    </div>
                    <div class="card card-info card-outline">
                        <div class="card-body">
                            <form action="" method="post" class="mb-0" id="admin-form" enctype="multipart/form-data">

                                <div class="form-group row">
                                    <label for="form[name]" class="col-sm-2 col-form-label text-sm-right required">Name</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <input type="text" id="form[name]" name="form[name]" value="" class="form-control form-control-sm">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[short_description]" class="col-sm-2 col-form-label text-sm-right">Short Description</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <textarea id="form[short_description]" name="form[short_description]" class="form-control form-control-sm" rows="3"></textarea>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[description]" class="col-sm-2 col-form-label text-sm-right">Description</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <textarea name="form[description]" class="form-control form-control-sm" id="editor" rows="10"></textarea>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[price]" class="col-sm-2 col-form-label text-sm-right">Price</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <input type="number" id="form[price]" name="form[price]" value="" class="form-control form-control-sm">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[sale_off]" class="col-sm-2 col-form-label text-sm-right">Sale Off</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <input type="number" id="form[sale_off]" name="form[sale_off]" value="" class="form-control form-control-sm">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[category_id]" class="col-sm-2 col-form-label text-sm-right required">Category</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <select id="form[category_id]" name="form[category_id]" class="custom-select custom-select-sm">
                                            <option value="default"> - Select category - </option>
                                            <option value="1">Bà mẹ - Em bé</option>
                                            <option value="2">Chính Trị - Pháp Lý</option>
                                            <option value="3">Công Nghệ Thông Tin</option>
                                            <option value="4">Giáo Khoa - Giáo Trình</option>
                                            <option value="5">Học Ngoại Ngữ</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[status]" class="col-sm-2 col-form-label text-sm-right required">Status</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <select id="form[status]" name="form[status]" class="custom-select custom-select-sm">
                                            <option value="default"> - Select status - </option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form[special]" class="col-sm-2 col-form-label text-sm-right required">Special</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <select id="form[special]" name="form[special]" class="custom-select custom-select-sm">
                                            <option value="default" selected=""> - Select Special - </option>
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="picture" class="col-sm-2 col-form-label text-sm-right">Picture</label>
                                    <div class="col-xs-12 col-sm-8">
                                        <input type="file" name="picture" class="form-control-file" id="admin-file-upload">
                                    </div>
                                </div>
                                <div class="col-12 col-sm-8 offset-sm-2">
                                    <img src="public/files/book/default.jpg" alt="preview image" id="admin-preview-image" style="display: none;width: 100%; max-width: 400px">
                                </div>
                                <input type="hidden" id="form[token]" name="form[token]" value="1597570986">
                            </form>
                        </div>
                        <div class="card-footer">
                            <div class="col-12 col-sm-8 offset-sm-2">
                                <a href="" class="btn btn-sm btn-success mr-1"> Save</a>
                                <a href="" class="btn btn-sm btn-success mr-1"> Save & Close</a>
                                <a href="" class="btn btn-sm btn-success mr-1"> Save & New</a>
                                <a href="book-list.php" class="btn btn-sm btn-danger mr-1"> Cancel</a>
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