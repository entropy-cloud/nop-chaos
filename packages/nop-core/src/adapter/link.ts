import qs from "qs"
import { match } from 'path-to-regexp';
import { Router } from "vue-router";

export function default_jumpTo(router: Router, to: string) {
    if (to.startsWith("open://")) {
        openWindow(to.substring("open://".length))
        return
    }

    if (to == "__forward") {
        router.forward()
        return
    }

    if (to == "__back") {
        router.back()
        return
    }


    function go(to: any, replace: boolean) {

        if (replace) {
            router.push(to)
        } else {
            router.replace(to)
        }
    }

    const replace = to.startsWith('replace://')
    if (replace) {
        to = to.substring("replace://".length)
    }
    if (isPageUrl(to)) {
        const pos = to.indexOf('?')
        const query = pos > 0 ? to.substring(pos+1) : null
        const data = query ? qs.parse(query) : null
        const page = { name: 'jsonPage', params: { path: to, data} }
        go(page as any, replace)
    } else {
        go(to, replace)
    }
}

export function openWindow(url: string, opt?: { target?: string; noopener?: boolean; noreferrer?: boolean }) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
    const feature: string[] = [];

    noopener && feature.push('noopener=yes');
    noreferrer && feature.push('noreferrer=yes');

    window.open(url, target, feature.join(','));
}

export function isPageUrl(url: string) {
    let pos = url.indexOf('?')
    if (pos > 0)
        url = url.substring(0, pos)

    return url.endsWith(".page.json5") || url.endsWith(".page.yaml") || url.endsWith(".page.json")
}

function normalizeLink(to) {
    if (/^\/api\//.test(to)) {
        return to
    }
    to = to || ''
    const location = window.location
    if (to && to[0] === '#') {
        to = location.pathname + location.search + to
    } else if (to && to[0] === '?') {
        to = location.pathname + to
    }
    const idx = to.indexOf('?')
    const idx2 = to.indexOf('#')
    let pathname = ~idx
        ? to.substring(0, idx)
        : ~idx2
            ? to.substring(0, idx2)
            : to
    const search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : ''
    const hash = ~idx2 ? to.substring(idx2) : ''
    if (!pathname) {
        pathname = location.pathname
    } else if (pathname[0] != '/' && !/^https?:\/\//.test(pathname)) {
        const relativeBase = location.pathname
        const paths = relativeBase.split('/')
        paths.pop()
        let m
        while ((m = /^\.\.?\//.exec(pathname))) {
            if (m[0] === '../') {
                paths.pop()
            }
            pathname = pathname.substring(m[0].length)
        }
        pathname = paths.concat(pathname).join('/')
    }
    return pathname + search + hash
}

export function default_updateLocation(to: any, replace: boolean) {
    if (to === 'goBack') {
        return window.history.back();
    }

    if (replace && window.history.replaceState) {
        window.history.replaceState('', document.title, to);
        return;
    }

    location.href = normalizeLink(to);
}

export function default_isCurrentUrl(to: string, ctx?: any) {
    const link = normalizeLink(to);
    const location = window.location;
    let pathname = link;
    let search = '';
    const idx = link.indexOf('?');
    if (~idx) {
        pathname = link.substring(0, idx);
        search = link.substring(idx);
    }

    if (search) {
        if (pathname !== location.pathname || !location.search) {
            return false;
        }

        const query = qs.parse(search.substring(1));
        const currentQuery = qs.parse(location.search.substring(1));

        return Object.keys(query).every(
            key => query[key] === currentQuery[key]
        );
    } else if (pathname === location.pathname) {
        return true;
    } else if (!~pathname.indexOf('http') && ~pathname.indexOf(':')) {
        return match(link, {
            decode: decodeURIComponent,
            strict: ctx?.strict ?? true
        })(location.pathname);
    }

    return false;
}