const gulp        = require('gulp');
const sass        = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');
const uglify      = require('gulp-uglify');
const concat      = require('gulp-concat');
const htmlmin     = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const fs = require('fs');

// ── Paths ────────────────────────────────────────────────
const paths = {
  html:   { src: 'src/*.html',         dest: 'dist/' },
  scss:   { src: 'src/scss/**/*.scss', dest: 'dist/css/' },
  js:     { src: 'src/js/**/*.js',     dest: 'dist/js/' },
  images: { src: 'src/images/**/*',    dest: 'dist/images/' },
};

// ── Clean ────────────────────────────────────────────────
function clean(done) {
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  done();
}

// ── HTML ─────────────────────────────────────────────────
function html() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// ── SCSS ─────────────────────────────────────────────────
function styles() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// ── JS ───────────────────────────────────────────────────
function scripts() {
  return gulp.src(paths.js.src)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// ── Images ───────────────────────────────────────────────
function images() {
  return gulp.src(paths.images.src, { encoding: false })
    .pipe(gulp.dest(paths.images.dest));
}

// ── Watch ────────────────────────────────────────────────
function watch() {
  browserSync.init({
    server: { baseDir: './dist' },
    notify: false,
    open: true,
  });
  gulp.watch(paths.html.src,   html);
  gulp.watch(paths.scss.src,   styles);
  gulp.watch(paths.js.src,     scripts);
  gulp.watch(paths.images.src, images);
}

// ── Tasks ────────────────────────────────────────────────
const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images));
const dev   = gulp.series(build, watch);

exports.clean   = clean;
exports.html    = html;
exports.styles  = styles;
exports.scripts = scripts;
exports.images  = images;
exports.build   = build;
exports.default = dev;
