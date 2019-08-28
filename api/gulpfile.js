const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require('del');

gulp.task("buildProject", buildProject);
gulp.task('clean', () => del(['build']));
gulp.task("default", gulp.series("clean", "buildProject"));

function buildProject() {
    const tsProject = ts.createProject("tsconfig.json");
    return gulp.src(['src/**/*.ts'])
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"));
}