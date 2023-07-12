const { src, dest, watch, parallel} = require("gulp"); // le requerimos a gulp que nos de las funciones de las dependencias, src;para buscar un archivo y dest para guardar/alamcenar archivos. tambien extraemos watch para estar actualizando los cambios hechos en scss/sass. son api's de gulp
const sass = require('gulp-sass')(require('sass'));//importar sass para utilizar y que compile el archivo scss/sass y que construya el nuevo archivo build/css.
const plumber= require("gulp-plumber");//para que no se detenga el codigo por algun error en con sola npm.
//es una tarea de gulp para compilar archivo de sass.

//Imagenes, convertir de jpg a webp
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const cache = require('gulp-cache');

function css(done){
    //identificamos archivo sass
    src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"));

    done();
}
function imagenes(done){
    const opciones={
        optimizationLevel:3
    }

    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    
    
    done();
}

function versionwebp(done){
    const opciones={
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))


    done();
}

function dev(done){
    watch("src/scss/**/*.scss",css)

    done();
}

//Asi se manda llamar una tarea en gulp ya que las tareas dependen de node.js para ejecutarsen; entonces va; Exports.nombrequeledas=nombrefuncion;
exports.css = css;
exports.imagenes=imagenes;
exports.versionwebp=versionwebp;
exports.dev = parallel(versionwebp,dev,imagenes);
