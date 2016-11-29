import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

export default {
    entry: 'src/main.js',
    dest: 'dist/app.js',
    format: 'es',
    sourceMap: 'inline',
    plugins: [
        babel({
            presets: [
                ['es2015', { 'modules': false }]
            ],
            exclude: 'node_modules/**'
        }),
        uglify({}, minify)
    ]
};
