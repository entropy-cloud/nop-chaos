/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

/**
 * Generate proxy
 * @param list
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: false,
      ws: true,
      rewrite: (path) => {
        const full = path.replace(new RegExp(`^${prefix}`), '')
       // console.log("prefix="+prefix+",full="+full+",target="+target)
        return full
      },
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
