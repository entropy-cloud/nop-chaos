import { rollup, OutputOptions, InputOptions } from '@rollup/browser'

//import commonjs from 'rollup-plugin-commonjs' // commonjs模块转换插件
//import ts from 'rollup-plugin-typescript2'

// import tsconfig from './tsconfig.json'

// const extensions = [
//   '.ts',
//   '.tsx'
// ]

// // ts
// const tsPlugin = ts({
//   tsconfig,
//   extensions
// })

function normalizeArray(parts: string[], allowAboveRoot: boolean) {
    const res: string[] = [];
    for (var i = 0; i < parts.length; i++) {
        const p2 = parts[i];
        if (!p2 || p2 === ".")
            continue;
        if (p2 === "..") {
            if (res.length && res[res.length - 1] !== "..") {
                res.pop();
            } else if (allowAboveRoot) {
                res.push("..");
            }
        } else {
            res.push(p2);
        }
    }
    return res;
}

function absolutePath(path: string, basePath: string | undefined) {
    if (path.indexOf(':') > 0)
        return path

    if(!path.startsWith("./"))
        return path

    let resolvedPath = path;
    if (basePath && !resolvedPath.startsWith("/")) {
        resolvedPath = basePath + "/../" + path
    }
    resolvedPath = normalizeArray(
        resolvedPath.split("/"),
        false
    ).join("/");
    return "/" + resolvedPath
}

export async function rollupTransform(path: string, source: string) {
    if(path.endsWith(".lib"))
        path += ".js"
        
    const parts = absolutePath("./parts/", path)

    const inputOptions: InputOptions = {
        input: path,
        shimMissingExports:false,
        treeshake:false,
        external(id,importer) {
            //console.debug("external:id=" + id + ",importer=" + importer);
            id = absolutePath(id, importer)

            // 如果是parts目录下的文件，则认为是当前文件的分解，需要用rollup打包到一起
            // 否则认为是独立文件，需要动态import
			return id != path && !id.startsWith(parts)
		},

        plugins: [
            {
                name: "rollup-adapter",
                resolveId(importee, importer) {
                    console.debug("resolveId:importee=" + importee + ",importer=" + importer);
                    if(importee.endsWith(".xjs")){
                        importee = importee.substring(0,importee.length-".xjs".length) + ".js";
                    }
                    
                    if (!importee.endsWith(".js") && !importee.endsWith(".mjs")){    
                        importee += ".js"
                    }
                    return absolutePath(importee, importer as string);
                },

                load(id: string) {
                    console.debug("load:id=" + id);
                    if (id == path) {
                        return source;
                    } else {
                        return jsLibLoader(id)
                    }
                    //throw new Error("unknown js:" + id);
                },
            },
            // commonjs(),
            // tsPlugin
        ],
    }

    const outputOptions: OutputOptions = {
        format: 'system',
        minifyInternalExports: false,
        //preserveModules:true,
        generatedCode: 'es2015',
        chunkFileNames: '[name]',
        sanitizeFileName: false, // 如果为true, 'nop:utils'将被替换为/nop_utils
        manualChunks(id: string) {
            return "app"
        }
    }

    const bundle = await rollup(inputOptions);
    const generated = await bundle.generate(outputOptions)
    let { code } = generated.output[0];
    code = code.replace(/\'\.\/@nop\/utils\.js\'/g,'\'@nop/utils\'')
    return code;
}