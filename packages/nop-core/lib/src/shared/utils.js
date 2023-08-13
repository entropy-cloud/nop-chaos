function normalizeArray(parts, allowAboveRoot) {
    const res = [];
    for (var i = 0; i < parts.length; i++) {
        const p2 = parts[i];
        if (!p2 || p2 === ".")
            continue;
        if (p2 === "..") {
            if (res.length && res[res.length - 1] !== "..") {
                res.pop();
            }
            else if (allowAboveRoot) {
                res.push("..");
            }
        }
        else {
            res.push(p2);
        }
    }
    return res;
}
export function absolutePath(path, basePath) {
    if (path.indexOf(':') > 0)
        return path;
    let resolvedPath = path;
    if (basePath && !resolvedPath.startsWith("/")) {
        resolvedPath = basePath + "/../" + path;
    }
    resolvedPath = normalizeArray(resolvedPath.split("/"), false).join("/");
    return "/" + resolvedPath;
}
export function format(msg, placeholderStart, placeholdeEnd, resolver) {
    let pos = msg.indexOf(placeholderStart);
    if (pos < 0)
        return msg;
    let ret = msg.substring(0, pos);
    do {
        pos += placeholderStart.length;
        let pos2 = msg.indexOf(placeholdeEnd, pos);
        if (pos2 < 0) {
            ret += msg.substring(pos);
            break;
        }
        else {
            const name = msg.substring(pos, pos2).trim();
            const value = resolver(name);
            if (value != null) {
                ret += String(value);
            }
            pos2 += placeholdeEnd.length;
            pos = msg.indexOf(placeholderStart, pos2);
            if (pos < 0) {
                ret += msg.substring(pos2);
            }
            else {
                ret += msg.substring(pos2, pos);
            }
        }
    } while (pos > 0);
    return ret;
}
/**
 * 从后台的TreeBean转换为前台Condition
 * @param node
 */
export function treeToCondition(node) {
    if (node.$type === 'and' || node.$type == 'or' || node.$type == 'not') {
        return { condjunction: node.$type, children: (node.$body || []).map(treeToCondition) };
    }
    else {
        return {
            'op': node.$type,
            left: {
                type: 'field',
                field: node.name,
            },
            right: node.value
        };
    }
}
export function conditionToTree(cond) {
    if (cond.conjuction) {
        return {
            $type: cond.conjuction,
            $body: (cond.children || []).map(conditionToTree)
        };
    }
    else {
        return {
            $type: cond.op,
            name: cond.left.field,
            value: cond.right
        };
    }
}
import { shallowRef, toRaw } from 'vue';
export function refHolder() {
    const value = shallowRef();
    return {
        getRaw() {
            return toRaw(value).value;
        },
        get() {
            return value.value;
        },
        set(t) {
            value.value = t;
        }
    };
}
