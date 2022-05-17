(TeX-add-style-hook
 "title"
 (lambda ()
   (TeX-run-style-hooks
    "parts/title/header"
    "parts/title/title"
    "parts/title/award"
    "parts/title/name"
    "parts/title/supervisors"
    "parts/title/date"))
 :latex)

