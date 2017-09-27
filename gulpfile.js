var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');

// 新建压缩合并JS文件的任务
gulp.task('minifyJS', function () {
	return gulp.src('./src/js.js').pipe(uglify())
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./dist/js/'));
});

// 新建压缩合并CSS文件的任务
//gulp.task('minifyCss', function () {
//	return gulp.src('./src/style.css')
//	.pipe(cleanCss())
//	.pipe(concat('all.css'))
//	.pipe(gulp.dest('./dist/style/'));
//});

// 操作sass源文件
gulp.task('minifyScss', function () {
	return sass('./src/scss/*.scss', {
		style: 'compressed'
	}).pipe(gulp.dest('./dist/style/'));
});

// 新建重新加载reload任务
gulp.task('reload', ['minifyScss'], function () {
	gulp.src('./index.html').pipe(connect.reload());
});


// gulp允许创建一个默认的任务
gulp.task('default', ['minifyScss', 'minifyJS'], function () {

	// 开启服务器
	connect.server({
		livereload: true
	});
	// 监听文件变化
	/*gulp.watch('./src/style/*.css', ['minifyCss']);
	gulp.watch('./src/js/*.js', ['minifyJS']);
	gulp.watch('./main.html', ['rename']);*/


	gulp.watch(['./src/scss/*.scss'], ['reload']);
});