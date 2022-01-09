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
                            <h1 class="m-0 text-dark">Book Manager :: List</h1>
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
                                    <select id="filter_special" name="filter_special" class="custom-select custom-select-sm mr-1" style="width: unset">
                                        <option value="default" selected="">- Select Special -</option>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select><select id="filter_category" name="filter_category" class="custom-select custom-select-sm mr-1" style="width: unset">
                                        <option value="default" selected="">- Select Category -</option>
                                        <option value="1">Bà mẹ - Em bé</option>
                                        <option value="2">Chính Trị - Pháp Lý</option>
                                        <option value="3">Công Nghệ Thông Tin</option>
                                        <option value="4">Giáo Khoa - Giáo Trình</option>
                                        <option value="5">Học Ngoại Ngữ</option>
                                        <option value="6">Khoa Học - Kỹ Thuật</option>
                                        <option value="7">Kiến Thức Tổng Hợp</option>
                                        <option value="8">Lịch Sử</option>
                                        <option value="9">Nông - Lâm - Ngư Nghiệp</option>
                                        <option value="10">Tham Khảo</option>
                                        <option value="11">Thường Thức - Gia Đình</option>
                                        <option value="12">Tâm Lý - Giới Tính</option>
                                        <option value="13">Tôn Giáo - Tâm Linh</option>
                                        <option value="14">Văn Hóa - Địa Lý - Du Lịch</option>
                                        <option value="15">Y Học</option>
                                        <option value="16">Kinh Tế</option>
                                        <option value="17">Kỹ Năng Sống</option>
                                        <option value="18">Thiếu Nhi</option>
                                        <option value="19">Truyện Tranh - Manga - Comic</option>
                                        <option value="20">Tạp chí - Catalogue</option>
                                        <option value="21">Từ Điển</option>
                                        <option value="22">Điện Ảnh - Nhạc - Họa</option>
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
                                            <th class="">Name</th>
                                            <th class="text-center">Picture</th>
                                            <th class="text-center">Price</th>
                                            <th class="text-center">Sale Off</th>
                                            <th class="text-center">Category</th>
                                            <th class="text-center">Status</th>
                                            <th class="text-center">Special</th>
                                            <th class="text-center">Ordering</th>
                                            <th class="text-center">Created</th>
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
                                            <td class="text-wrap" style="min-width: 180px">Nuôi Con Không Phải Là Cuộc Chiến 2 (Trọn Bộ 3 Tập)</td>
                                            <td style="width: 100px; padding: 5px"><img class="item-image w-100" src="images/category1.jpg"></td>
                                            <td class="text-center">319,000 đ</td>
                                            <td class="text-center">34%</td>
                                            <td class="text-center position-relative">
                                                <select name="select-category" class="custom-select custom-select-sm" style="width: unset" id="1" data-id="1">
                                                    <option value="1" selected="">Bà mẹ - Em bé</option>
                                                    <option value="2">Chính Trị - Pháp Lý</option>
                                                    <option value="3">Công Nghệ Thông Tin</option>
                                                    <option value="4">Giáo Khoa - Giáo Trình</option>
                                                    <option value="5">Học Ngoại Ngữ</option>
                                                </select>
                                            </td>
                                            <td class="text-center position-relative">
                                                <a href="i" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a>
                                            </td>
                                            <td class="text-center position-relative">
                                                <a href="i" class="my-btn-state rounded-circle btn btn-sm btn-danger"><i class="fas fa-minus"></i></a>
                                            </td>
                                            <td class="text-center position-relative"><input type="number" name="chkOrdering[1]" value="1" class="chkOrdering form-control form-control-sm m-auto text-center" style="width: 65px" id="chkOrdering[1]" data-id="1" min="1"></td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 15/07/2020 10:36:48</p>
                                            </td>
                                            <td class="text-center">
                                                <a href="#" class="rounded-circle btn btn-sm btn-info" title="Edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>

                                                <a href="" class="rounded-circle btn btn-sm btn-danger" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="checkbox-5" name="checkbox[]" value="5">
                                                    <label for="checkbox-5" class="custom-control-label"></label>
                                                </div>
                                            </td>
                                            <td class="text-center">5</td>
                                            <td class="text-wrap" style="min-width: 180px">Nuôi Con Không Phải Là Cuộc Chiến (Tái Bản 2020)</td>
                                            <td style="width: 100px; padding: 5px"><a data-toggle="modal" data-target="#modal-image"><img class="item-image w-100" src="images/category2.jpg"></a></td>
                                            <td class="text-center">99,000 đ</td>
                                            <td class="text-center">37%</td>
                                            <td class="text-center position-relative">
                                                <select name="select-category" class="custom-select custom-select-sm" style="width: unset" id="5" data-id="5">
                                                    <option value="1">Bà mẹ - Em bé</option>
                                                    <option value="2" selected>Chính Trị - Pháp Lý</option>
                                                    <option value="3">Công Nghệ Thông Tin</option>
                                                    <option value="4">Giáo Khoa - Giáo Trình</option>
                                                    <option value="5">Học Ngoại Ngữ</option>
                                                </select>
                                            </td>
                                            <td class="text-center position-relative">
                                                <a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a>
                                            </td>
                                            <td class="text-center position-relative">
                                                <a href="#" class="my-btn-state rounded-circle btn btn-sm btn-success"><i class="fas fa-check"></i></a>
                                            </td>
                                            <td class="text-center position-relative"><input type="number" name="chkOrdering[5]" value="1" class="chkOrdering form-control form-control-sm m-auto text-center" style="width: 65px" id="chkOrdering[5]" data-id="5" min="1"></td>
                                            <td class="text-center">
                                                <p class="mb-0 history-by"><i class="far fa-user"></i> admin</p>
                                                <p class="mb-0 history-time"><i class="far fa-clock"></i> 15/07/2020 10:39:24</p>
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