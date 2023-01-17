TARGET=../entropy-cloud/nop-web-amis-editor/src/main/resources/META-INF/resources/amis-editor
rm -rf $TARGET
cp -rf ./packages/nop-amis-editor/dist $TARGET

TARGET=../entropy-cloud/nop-web-site/src/main/resources/META-INF/resources/
rm -rf $TARGET
cp -rf ./packages/nop-site/dist $TARGET

TARGET=../entropy-cloud/nop-js/src/main/resources/_vfs/nop/js/libs/nop-server-tool.mjs
rm -rf $TARGET
cp -f ./packages/nop-server-tool/dist/nop-server-tool.mjs $TARGET
