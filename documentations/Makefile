TARGET = main

all:
	@echo "Building $TARGET..."
	lualatex $(TARGET).tex
	@echo "bibtexing $TARGET..."
	bibtex $(TARGET)
	lualatex $(TARGET).tex
	lualatex $(TARGET).tex
	@echo "Done."
	zathura $(TARGET).pdf

clean:
	@echo "Cleaning..."
	rm -rf $(shell find . -type f -name "*.aux")
	rm -rf $(shell find . -type f -name "*.acn")
	rm -rf $(shell find . -type f -name "*.bbl")
	rm -rf $(shell find . -type f -name "*.bcf")
	rm -rf $(shell find . -type f -name "*.blg")
	rm -rf $(shell find . -type f -name "*.glo")
	rm -rf $(shell find . -type f -name "*.ist")
	rm -rf $(shell find . -type f -name "*.lof")
	rm -rf $(shell find . -type f -name "*.log")
	rm -rf $(shell find . -type f -name "*.lol")
	rm -rf $(shell find . -type f -name "*.lot")
	rm -rf $(shell find . -type f -name "*.out")
	rm -rf $(shell find . -type f -name "*.run.xml")
	rm -rf $(shell find . -type f -name "*.toc")
	rm -rf $(shell find . -type f -name "*-blx.bib")
	@echo "Cleaning Done."

.PHONY : all clean
