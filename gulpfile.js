"use strict";

const sass = require("gulp-sass")(require("sass"));
const gulp = require("gulp");
const gutil = require("gulp-util");
const sourcemaps = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const bs = require("browser-sync").create();
const rimraf = require("rimraf");
const comments = require("gulp-header-comment");
const jshint = require("gulp-jshint");
const sitemap = require('gulp-sitemap');
const nodemon = require('gulp-nodemon');
// imagemin = require('gulp-imagemin');
//const cssnano = require('gulp-cssnano');
// const uglify = require('gulp-uglify');

var path = {
  src: {
    html: "source/*.html",
    others: "source/*.+(php|ico|png)",
    htminc: "source/partials/**/*.htm",
    incdir: "source/partials/",
    plugins: "source/plugins/**/*.*",
    js: "source/js/*.js",
    scss: "source/scss/**/*.scss",
    images: "source/images/**/*.+(png|jpg|gif|svg)",
    fonts: "source/fonts/**/*.+(eot|ttf|woff|woff2|otf)",
  },
  build: {
    dir: "theme/",
  },
};

// HTML
gulp.task("html:build", function () {
  return gulp
    .src(path.src.html)
    .pipe(
      fileinclude({
        basepath: path.src.incdir,
      })
    )
    .pipe(
      comments(`
    WEBSITE: https://themefisher.com
    TWITTER: https://twitter.com/themefisher
    FACEBOOK: https://www.facebook.com/themefisher
    GITHUB: https://github.com/themefisher/
    `)
    )
    .pipe(gulp.dest(path.build.dir))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// gulp.task('start', function () {
//   nodemon({
//     script: 'server.js',
//     ext: 'js html',
//     env: { 'NODE_ENV': 'development' }
//   })
// });

// SCSS
gulp.task("scss:build", function () {
  return gulp
    .src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("/"))
    .pipe(
      comments(`
    WEBSITE: https://themefisher.com
    TWITTER: https://twitter.com/themefisher
    FACEBOOK: https://www.facebook.com/themefisher
    GITHUB: https://github.com/themefisher/
    `)
    )
    .pipe(gulp.dest(path.build.dir + "css/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// SCSS
// gulp.task("scss:build", function () {
//   return gulp
//     .src(path.src.scss)
//     .pipe(sourcemaps.init())
//     .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
//     .pipe(autoprefixer())
//     .pipe(cssnano())
//     .pipe(sourcemaps.write("/"))
//     .pipe(gulp.dest(path.build.dir + "css/"))
//     .pipe(bs.reload({ stream: true }));
// });

// Javascript
// gulp.task("js:build", function () {
//   return gulp
//     .src(path.src.js)
//     .pipe(jshint("./.jshintrc"))
//     .pipe(jshint.reporter("jshint-stylish"))
//     .pipe(uglify())
//     .pipe(gulp.dest(path.build.dir + "js/"))
//     .pipe(bs.reload({ stream: true }));
// });


// Javascript
gulp.task("js:build", function () {
  return gulp
    .src(path.src.js)
    .pipe(jshint("./.jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"))
    .on("error", gutil.log)
    .pipe(
      comments(`
  WEBSITE: https://themefisher.com
  TWITTER: https://twitter.com/themefisher
  FACEBOOK: https://www.facebook.com/themefisher
  GITHUB: https://github.com/themefisher/
  `)
    )
    .pipe(gulp.dest(path.build.dir + "js/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Images
gulp.task("images:build", function () {
  return gulp
    .src(path.src.images)
    .pipe(gulp.dest(path.build.dir + "images/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});


// Images
// gulp.task("images:build", function () {
//   return gulp
//     .src(path.src.images)
//     .pipe(imagemin([
//       imagemin.mozjpeg({ quality: 75, progressive: true }),
//       imagemin.optipng({ optimizationLevel: 5 }),
//       imagemin.svgo({
//         plugins: [
//           { removeViewBox: true },
//           { cleanupIDs: false }
//         ]
//       })
//     ]))
//     .pipe(gulp.dest(path.build.dir + "images/"))
//     .pipe(bs.reload({ stream: true }));
// });


// fonts
gulp.task("fonts:build", function () {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.build.dir + "fonts/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Plugins
gulp.task("plugins:build", function () {
  return gulp
    .src(path.src.plugins)
    .pipe(gulp.dest(path.build.dir + "plugins/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Sitemap Task
gulp.task('generate-sitemap', function () {
  return gulp.src(path.src.html)
    .pipe(sitemap({
        siteUrl: 'https://www.ouieqare.com'
    }))
    .pipe(gulp.dest(path.build.dir));
});




// Other files like favicon, php, sourcele-icon on root directory
gulp.task("others:build", function () {
  return gulp.src(path.src.others).pipe(gulp.dest(path.build.dir));
});

// Clean Build Folder
gulp.task("clean", function (cb) {
  rimraf("./theme", cb);
});

// Watch Task
gulp.task("watch:build", function () {
  gulp.watch(path.src.html, gulp.series("html:build"));
  gulp.watch(path.src.htminc, gulp.series("html:build"));
  gulp.watch(path.src.scss, gulp.series("scss:build"));
  gulp.watch(path.src.js, gulp.series("js:build"));
  gulp.watch(path.src.images, gulp.series("images:build"));
  gulp.watch(path.src.fonts, gulp.series("fonts:build"));
  gulp.watch(path.src.plugins, gulp.series("plugins:build"));
});

// Dev Task
gulp.task(
  "default",
  gulp.series(
    "clean",
    "html:build",
    "js:build",
    "scss:build",
    "images:build",
    "fonts:build",
    "plugins:build",
    "others:build",
    "generate-sitemap",
    gulp.parallel("watch:build", function () {
      bs.init({
        server: {
          baseDir: path.build.dir,
        },
      });
    })
  )
);

// Build Task
gulp.task(
  "build",
  gulp.series(
    "html:build",
    "js:build",
    "scss:build",
    "images:build",
    "fonts:build",
    "plugins:build",
    "generate-sitemap"
  )
);