//CSS
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')(require('sass'));
const { src, dest, watch, parallel} = require("gulp")//Hace un llamado a la dependencia GULP y a las funciones src y dest
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const postcss = require("gulp-postcss")
const sourcemaps = require("gulp-sourcemaps")
//src: le dice la ubicacion del archivo scss
//Dest tiene la funcion de guardar los datos en el archivo css 
//watch esta pendiente a cambios en un archivo para realizar una funcion que se le otorge 
//IMAGENES
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const cache = require("gulp-cache");
const imgavif = require("gulp-avif")

function css(done){//done se usa en el gulp fiile para indicarle donde termina una tarea
    src("src/scss/**/*.scss")//identifica archivo SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())//evita que un error de sintaxis detenga la compilacion del archivo  ssass
        .pipe(sass())//Compila SASS
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/css"))//Lo almacena en el disco duro
    done()//Aqui es donde se termina la tarea
}
function javaScript(done){
    src("src/js/**/*.js")
        .pipe(dest("build/js"))
    done()
}
function dev(done){
    watch("src/scss/**/*.scss", css)//se coloca la ruta del archivo a observar, despus se le dice que tiene que ejecutar la funcion css(), en cuanto registre un cambio
    watch("src/js/**/*.js", javaScript)
    done()

}
function versionWebp(done){
    const opciones = {
        quality:50
    };
    src("src/img/**/*.{png,jpg}")//Los asteriscos representan que esta funcion convertira a todos los archivos de todas las carpetas que haya en la ruta src/img
        .pipe(webp(opciones))
        .pipe(dest("build/img"))
    done();
}
function imgmin(done){
    const opciones = {
        optimizationLevel:3
    }
    src("src/img/**/*.{jpg,png}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"))
    done();
}
function avif(done){
    const opciones = {
        optimizationLevel:3
    }
    src("src/img/**/*.{jpg,png}")
    .pipe(imgavif(opciones))
    .pipe(dest("build/img"))
    done();
}
exports.js = javaScript;
exports.avif = avif;
exports.imgmin = imgmin;
exports.css = css;//exportacion para agregar al package.json
exports.versionWebp = versionWebp;
exports.dev = parallel(imgmin, versionWebp, avif, dev, javaScript);//parallel permite que dos funciones se ejecuten en paralelo al mismo tiempo

