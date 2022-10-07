# Deploy demo 1
goal app create --creator $CREATOR \
--approval-prog /data/avm/demo1.teal \
--clear-prog /data/avm/clear.teal \
--local-ints 0 --local-byteslices 0 --global-ints 0 --global-byteslices 0

# Debug demo 1
goal app call -f $CREATOR --app-id 384 \
--out=dump.dr --dryrun-dump

tealdbg debug /data/avm/demo1.teal -d dump.dr --listen 0.0.0.0

# Deploy demo 2
goal app create --creator $CREATOR \
--approval-prog /data/avm/demo2.teal \
--clear-prog /data/avm/clear.teal \
--local-ints 0 --local-byteslices 1 --global-ints 0 --global-byteslices 1

# Debug demo 2
goal app optin -f AJGICWSCL56MGMOVTQY7PW2UDYVS4AXHWW4J55R6F2MNY7T73VWXOI36BM --app-id 386

goal app call \
-f $CREATOR \
--app-id 386 \
--app-account 'AJGICWSCL56MGMOVTQY7PW2UDYVS4AXHWW4J55R6F2MNY7T73VWXOI36BM' \
--app-arg 'str:register_data' \
--app-arg 'str:test_data' \
--out=dump2.dr --dryrun-dump

tealdbg debug /data/avm/demo2.teal -d dump2.dr --listen 0.0.0.0