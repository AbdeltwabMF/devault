(TeX-add-style-hook
 "main"
 (lambda ()
   (TeX-add-to-alist 'LaTeX-provided-class-options
                     '(("report" "12pt")))
   (TeX-run-style-hooks
    "latex2e"
    "headers"
    "include/def_imports"
    "include/def_commands"
    "include/def_resources"
    "include/def_styles"
    "parts"
    "parts/title"
    "parts/foreword"
    "parts/foreword/letter_of_approval"
    "parts/foreword/statement"
    "parts/foreword/acknowledgements"
    "parts/foreword/abstract"
    "parts/foreword/table_of_contents"
    "parts/main"
    "parts/main/introduction"
    "parts/main/solving_p_equals_np"
    "parts/main/greatest_common_divisor"
    "parts/main/conclusion"
    "parts/afterword"
    "parts/afterword/references"
    "parts/afterword/appendix"
    "parts/afterword/table_of_figures"
    "parts/afterword/table_of_listings"
    "parts/afterword/list_of_tables"
    "parts/afterword/full_bibliography"
    "report"
    "rep12"))
 :latex)

