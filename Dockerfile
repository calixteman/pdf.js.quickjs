FROM emscripten/emsdk

WORKDIR /tmp
ADD 0001-Extra-stuff-for-use-with-PDF.js.patch .
ADD *.c ./
ADD myjs.js .
ADD compile.sh .

ENV OUTPUT /js

RUN chmod ugo+x compile.sh && \
    git config --global user.email "you@example.com" && \
    git config --global user.name "Your Name" && \
    git clone https://github.com/bellard/quickjs.git && \
    cd quickjs && \
    git am ../0001-Extra-stuff-for-use-with-PDF.js.patch && \
    cd ..

CMD ./compile.sh