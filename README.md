# pdf.js.quickjs

Provide a sandbox to PDF.js.

## Build

Run:

```sh
python build.py --compile --output my_output_dir
```

it will create a Docker image with emsdk and then run it. The generated `quickjs-eval.js` will be in `my_output_dir`.
