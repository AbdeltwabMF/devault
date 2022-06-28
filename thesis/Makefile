TARGET = main

# ANSI colors for shell output
BLACK := \033[0;30m
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
PURPLE := \033[0;35m
CYAN := \033[0;36m
WHITE := \033[0;37m
NC := \033[0m # No Color

# ANSI colors for shell output (bold)
BBLACK := \033[1;30m
BRED := \033[1;31m
BGREEN := \033[1;32m
BYELLOW := \033[1;33m
BBLUE := \033[1;34m
BPURPLE := \033[1;35m
BCYAN := \033[1;36m
BWHITE := \033[1;37m

all:
	@printf "%b" "$(BYELLOW)Building $(TARGET)...\n$(NC)"
	lualatex $(TARGET).tex
	@printf "%b" "$(BBLUE)Compiling the bibliography...\n$(NC)"
	bibtex $(TARGET)
	@printf "%b" "$(BPURPLE)Compiling the glossaries...\n$(NC)"
	makeglossaries $(TARGET)
	@printf "%b" "$(BCYAN)Refreshing the target file...\n$(NC)"
	lualatex $(TARGET).tex
	@printf "%b" "$(BGREEN)Done.\n$(NC)"
	# zathura $(TARGET).pdf

clean:
	@printf "%b" "$(WHITE)Cleaning...\n$(NC)"
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
	rm -rf $(shell find . -type f -name "*.acr")
	rm -rf $(shell find . -type f -name "*.alg")
	rm -rf $(shell find . -type f -name "*.glg")
	rm -rf $(shell find . -type f -name "*.gls")
	rm -rf $(shell find . -type f -name "*#*")
	@printf "%b" "$(PURPLE)Cleaning Done.$(NC)\n"

.PHONY : all clean
