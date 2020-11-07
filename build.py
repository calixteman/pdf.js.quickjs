import argparse
import os
import subprocess


def create():
    subprocess.run("docker build -t qjs-sandbox .", shell=True, check=True)


def compile(path):
    path = os.path.abspath(path)
    out = subprocess.run("docker images qjs-sandbox", shell=True, capture_output=True)
    output = map(lambda x: x.strip(), out.stdout.split(b"\n"))
    output = filter(lambda x: x, output)
    output = list(output)
    if len(output) == 1:
        create()

    subprocess.run(
        f"docker run -it -v {path}:/js --user $(id -u):$(id -g) qjs-sandbox",
        shell=True,
        check=True,
    )


parser = argparse.ArgumentParser(description="Build sandbox")
parser.add_argument(
    "-C",
    "--create-image",
    dest="create",
    action="store_true",
    help="Create the docker image",
)
parser.add_argument(
    "-c",
    "--compile",
    dest="compile",
    action="store_true",
    help="Compile the sandbox and output a js file",
)
parser.add_argument(
    "-o", "--output", dest="output", default=".", help="Output directory"
)

args = parser.parse_args()
if args.create:
    create()
if args.compile:
    compile(args.output)
