# Deploy Application
goal app create \
--creator $TEACHER \
--approval-prog /data/smart_contract/approval.teal \
--clear-prog /data/smart_contract/clear.teal \
--local-ints 1 --local-byteslices 1 \
--global-ints 0 --global-byteslices 1

# Optin to application
goal app optin -f $STUDENT1 --app-id 458

# Verify local and global state
goal app read --global --app-id 458 --guess-format

goal app read --local -f $STUDENT1 --app-id 458 --guess-format
goal app read --local -f $STUDENT2 --app-id 458 --guess-format

# Call Application
goal app call \
-f $TEACHER \
--app-id 458 \
--app-account $STUDENT1 \
--app-arg 'str:register_diploma' \
--app-arg 'str:Algorand Developer' \
--app-arg 'int:11'

# Debug Application
goal app call \
-f $TEACHER \
--app-id 458 \
--app-account $STUDENT1 \
--app-arg 'str:register_diploma' \
--app-arg 'str:Algorand Developer' \
--app-arg 'int:11' \
--out=dump.dr --dryrun-dump

tealdbg debug /data/smart_contract/approval.teal -d dump.dr --listen 0.0.0.0