var gulp = require("gulp");
/*----plugins----*/
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var merge2 = require("merge2");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var eslint = require("gulp-eslint");
var imagemin = require('gulp-imagemin');
/*----plugins----*/

/*----Destinations Folders----*/
var JS_DISTRIBUTION_FOLDER = "./assets/js";
var CSS_DISTRIBUTION_FOLDER = "./assets/css";
var IMG_DISTRIBUTION_FOLDER = "./assets/images";

/*----Third Party CSS----*/
var THIRD_PARTY_CSS = [ ];


/*----Custom CSS----*/  
var CUSTOM_CSS = [
"node_modules/bootstrap/dist/css/bootstrap.min.css",
"node_modules/owl.carousel2/dist/assets/owl.carousel.min.css",
  "./src/css/main.scss",

];

/*----Third Party JS----*/
var THIRD_PARTY_JS = [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js",
  "node_modules/owl.carousel2/dist/owl.carousel.min.js"
];

/*----Custom JS----*/
var CUSTOM_JS = [
  "./src/js/custom.js",
];

var IMAGES_LIST = [
  "./src/images/banking.jpg",
];



/*----FOR Browser SYNC----*/
gulp.task("browser-sync", ["styles"], function() {
    browserSync.init({
        server: {
            injectChanges: true,
            baseDir: "./"
        }
    });
});

// Copy all static images
gulp.task('images', function() {
  var sequentialImages = IMAGES_LIST;
  return gulp.src(sequentialImages)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 10}))
    .pipe(gulp.dest(IMG_DISTRIBUTION_FOLDER));
});


/*----Convert SCSS into minified CSS----*/
gulp.task("styles", function() {
    var sequentialCSS = THIRD_PARTY_CSS.concat(CUSTOM_CSS);
    return gulp.src(sequentialCSS)
       .pipe(sass().on("error", sass.logError))
       .pipe(concat("style.css"))
       .pipe(autoprefixer({
           browsers: ["> 1%", "iOS 7", "ie >= 10"],
           cascade: false
       }))
       .pipe(gulp.dest(CSS_DISTRIBUTION_FOLDER))
       .pipe(rename("style.min.css"))
       .pipe(cssnano())
       .pipe(gulp.dest(CSS_DISTRIBUTION_FOLDER))
       .pipe(browserSync.reload({stream: true}))
       .pipe(notify({
           message: "style.min.css is ready!"
       }));
});

/*----Convert JS into minidied JS----*/
gulp.task("scripts", function() {
    var sequentialJS = THIRD_PARTY_JS.concat(CUSTOM_JS);
    return gulp.src(sequentialJS)
       .pipe(concat("main.js"))
       .pipe(gulp.dest(JS_DISTRIBUTION_FOLDER))
       .pipe(rename("main.min.js"))
       .pipe(uglify({
           mangle: true
       }))
       .pipe(gulp.dest(JS_DISTRIBUTION_FOLDER))
       .pipe(notify({
           message: "main.min.js is ready!"
       }));
});

/*----Watch Command for JS, CSS and HTML CHANGES----*/
gulp.task("watch", ["browser-sync"], function() {
    gulp.watch("./src/css/**/*.scss", ["styles"]).on("change", browserSync.reload);
    gulp.watch("./src/images/**/*.png", ["images"]).on("change", browserSync.reload);
    gulp.watch("./src/images/**/*.jpg", ["images"]).on("change", browserSync.reload);
    gulp.watch("./src/js/**/*.js", ["scripts"]).on("change", browserSync.reload);
    gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task("lint", function() {
    return gulp.src(CUSTOM_JS).pipe(eslint({
        "rules":{
            "quotes": [1, "single"],
            "semi": [1, "always"]
        }
    }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task("default", ["styles","scripts","watch","lint","images"]); 