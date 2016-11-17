var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');

gulp.task('copy',function(){
     return gulp.src(['app/css/*.css','app/js/*.js','app/*.html'],{base:'app'}).pipe(gulp.dest('dist'))
				  .pipe(connect.reload());//通知浏览器重启
});
gulp.task('less',function(){
    return gulp.src('app/less/*.less').pipe(less()).pipe(gulp.dest('dist/css')).pipe(connect.reload());//通知浏览器重启
});
gulp.task('watch',function(){
    gulp.watch('app/*.html',['copy']);//当index.html文件变化时执行copy任务
	gulp.watch(['app/css/*.css','app/js/*.js'],['copy']);
	gulp.watch(['app/css/*.less'],['less']);
});

gulp.task('server',function(){
    connect.server({
        root:'dist',//服务器的根目录
        port:8888, //服务器的地址，没有此配置项默认也是 8080
        livereload:true//启用实时刷新的功能
    });
});
gulp.task('default',['copy','less','server','watch']);//运行此任务的时候会在8888上启动服务器，