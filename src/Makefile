all:
	emcc -o quickjs-eval.js eval.c ../quickjs/quickjs.c ../quickjs/cutils.c ../quickjs/libregexp.c ../quickjs/libbf.c ../quickjs/libunicode.c -DCONFIG_VERSION="\"1.0.0\"" -s WASM=1 -s SINGLE_FILE -s MODULARIZE=1 -s EXPORT_ES6=1 -s USE_ES6_IMPORT_META=0 -s ENVIRONMENT='web' -lm -Oz -s EXPORTED_FUNCTIONS='["_eval"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' --llvm-lto 3 -s AGGRESSIVE_VARIABLE_ELIMINATION=1 --closure 1 --js-library myjs.js

patch:
	cd ../quickjs && git am ../src/0001-Extra-stuff-for-use-with-PDF.js.patch

clean:
	cd ../quickjs && git reset --hard HEAD~1
	rm quickjs-eval.js
