let timer:any

export function changeBrowserTitle(title:string,delay?:boolean){
    if(timer){
        clearTimeout(timer)
        timer = null
    }

    if(delay){
        timer = setTimeout(()=>{
            document.title = title || ''
        },100)
    }else{
        document.title = title || ''
    }
}