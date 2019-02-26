export const removeAccentuation = (text: string) => {       
    return text.toLowerCase()            
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        .replace(/[&\/\\#,+()$~%.'":¨*?<>{}\=\-@]/g,'')
}