let timer;
export function changeBrowserTitle(title, delay) {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    if (delay) {
        timer = setTimeout(() => {
            document.title = title || '';
        }, 100);
    }
    else {
        document.title = title || '';
    }
}
