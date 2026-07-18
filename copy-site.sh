TARGET=../nop-entropy/nop-frontend-support/nop-web-site-legacy/src/main/resources/META-INF/resources/
rm -rf $TARGET
cp -rf ./packages/nop-site/dist $TARGET
find $TARGET/ -type f -name "*.gz" | awk '{print substr($0,1,length($0)-3)}' |xargs rm

