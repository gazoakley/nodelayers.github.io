LAYER_NAME=$1
LAYER_TMP=build/$LAYER_NAME

mkdir -p $LAYER_TMP
pushd $LAYER_TMP

mkdir -p nodejs/node_modules
pushd nodejs/node_modules
npm install -save false --global-style $LAYER_NAME
popd
zip -r layer.zip nodejs

popd