import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

// import domtastic from 'domtastic';

export default {
    entry: 'src/main.js',
    dest: 'dist/app.js',
    format: 'es',
    sourceMap: 'inline',
    // TODO(rendfall): ReferenceError: Element is not defined (https://github.com/webpro/DOMtastic/issues/39)
    // globals: {
    //     $: domtastic
    // },
    plugins: [
        babel({
            presets: [
                ['es2015', { 'modules': false }]
            ],
            exclude: 'node_modules/**'
        }),
        uglify()
    ]
};
