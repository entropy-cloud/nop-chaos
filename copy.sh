TARGET=../nop-entropy/nop-web-amis-editor/src/main/resources/META-INF/resources/amis-editor
rm -rf $TARGET
cp -rf ./packages/nop-amis-editor/dist $TARGET
find $TARGET/ -type f -name "*.gz" | awk '{print substr($0,1,length($0)-3)}' |xargs rm

TARGET=../nop-entropy/nop-web-site/src/main/resources/META-INF/resources/
rm -rf $TARGET
cp -rf ./packages/nop-site/dist $TARGET
find $TARGET/ -type f -name "*.gz" | awk '{print substr($0,1,length($0)-3)}' |xargs rm

TARGET=../nop-entropy/nop-js/src/main/resources/_vfs/nop/js/libs/nop-server-tool.mjs
rm -rf $TARGET
cp -f ./packages/nop-server-tool/dist/nop-server-tool.mjs $TARGET

