<!DOCTYPE html>
<html>

<head>
    <?php require_once 'html/head.php'; ?>
</head>

<body class="login-page">
    <div class="login-box">
        <div class="login-logo">
            <a href=""><b>Admin</b></a>
        </div>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Đăng nhập trang quản trị</p>

                <form action="" method="post" id="form-login">
                    <!-- USERNAME -->
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Tên đăng nhập" name="form[username]">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <!-- PASSWORD -->
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" placeholder="Mật khẩu" name="form[password]">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <!-- TOKEN -->
                    <input type="hidden" name="form[token]" value="1597565605">
                    <button type="submit" class="btn btn-info btn-block">Đăng nhập</button>
                    <!-- /.col -->
                </form>
            </div>

        </div>
        <!-- /.login-card-body -->
    </div>
    <!-- script -->
    <?php require_once 'html/script.php'; ?>
</body>

</html>