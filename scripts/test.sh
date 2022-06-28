#!/usr/bin/bash

if [[ -f ./scripts/colors.sh ]]; then
	source ./scripts/colors.sh
fi

error "Oops"
warn "Be careful"
info "Hello"
success "Ok"
