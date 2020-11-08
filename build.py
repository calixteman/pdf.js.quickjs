# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this file,
# You can obtain one at http://mozilla.org/MPL/2.0/.

import argparse
import os
import subprocess


def create():
    subprocess.run("docker build -t qjs-sandbox .", shell=True, check=True)


def compile(path):
    path = os.path.abspath(path)
    if not os.path.exists(path):
        print(f"Invalid path: {path}")
        return
    wd = os.path.abspath(".")
    out = subprocess.run("docker images qjs-sandbox", shell=True, capture_output=True)
    output = map(lambda x: x.strip(), out.stdout.split(b"\n"))
    output = filter(lambda x: x, output)
    output = list(output)
    if len(output) == 1:
        create()

    subprocess.run(
        f"docker run -it -v {path}:/js -v {wd}:/code --rm --user $(id -u):$(id -g) qjs-sandbox",
        shell=True,
        check=True,
    )


if __name__ == "__main__":
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
