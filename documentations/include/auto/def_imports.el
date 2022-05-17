(TeX-add-style-hook
 "def_imports"
 (lambda ()
   (TeX-add-to-alist 'LaTeX-provided-package-options
                     '(("adjustbox" "export") ("glossaries" "automake" "acronym" "nonumberlist" "nopostdot" "toc" "section=section") ("biblatex" "backend=bibtex" "style=ieee" "sorting=ynt")))
   (add-to-list 'LaTeX-verbatim-environments-local "lstlisting")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "href")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "hyperref")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "hyperimage")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "hyperbaseurl")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "nolinkurl")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "url")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "path")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "lstinline")
   (add-to-list 'LaTeX-verbatim-macros-with-delims-local "path")
   (add-to-list 'LaTeX-verbatim-macros-with-delims-local "lstinline")
   (TeX-run-style-hooks
    "adjustbox"
    "geometry"
    "lipsum"
    "background"
    "listings"
    "glossaries"
    "xcolor"
    "hyperref"
    "enumitem"
    "amsmath"
    "amssymb"
    "multicol"
    "textcomp"
    "graphicx"
    "emoji"
    "babel"
    "titlesec"
    "biblatex"
    "tikz"))
 :latex)

