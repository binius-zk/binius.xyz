.PHONY: all clean

all: main.pdf

main.bcf: main.tex
	pdflatex main.tex

main.bbl: bibliography.bib main.bcf
	biber main

main.pdf: main.tex main.bbl
	pdflatex main.tex

clean:
	rm main.aux main.bbl main.bcf main.blg main.log main.out main.pdf main.run.xml
