#!/usr/bin/bash
#
# Logging system for the deployment process

LOG_HISTORY_FILE="deploy.history"
LOG_FILE="deploy.log"
touch $LOG_FILE $LOG_HISTORY_FILE
cat $LOG_FILE >> $LOG_HISTORY_FILE
cat /dev/null > $LOG_FILE

if [[ -f ./scripts/colors.sh ]]; then
	source ./scripts/colors.sh
fi

get_date() {
	printf "%b" "${PURPLE}$(date '+%a %Y-%m-%d %I:%M:%S')${NC}"
}

error() {
	printf "%b" "$(get_date) ${BRED}[ERROR]${RED} $1\n${NC}" | tee -a $LOG_FILE
}

warn() {
	printf "%b" "$(get_date) ${BYELLOW}[WARN ]${YELLOW} $1\n${NC}" | tee -a $LOG_FILE
}

info() {
	printf "%b" "$(get_date) ${BCYAN}[INFO ]${CYAN} $1\n${NC}" | tee -a $LOG_FILE
}

success() {
	printf "%b" "$(get_date) ${BGREEN}[OK   ]${GREEN} $1\n${NC}" | tee -a $LOG_FILE
}
