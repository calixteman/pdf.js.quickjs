FROM emscripten/emsdk:latest

WORKDIR /tmp

RUN git config --global user.email "you@example.com" && \
    git config --global user.name "Your Name" && \
    git clone https://github.com/bellard/quickjs.git

ENV OUTPUT /js
ENV QUICKJS /tmp/quickjs
ENV INPUT /code

ADD *.patch .

RUN cd quickjs && \
    git am ../0001-Extra-stuff-for-use-with-PDF.js.patch

CMD /code/compile.sh