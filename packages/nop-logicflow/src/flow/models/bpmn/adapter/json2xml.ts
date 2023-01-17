function addIndSpace(ind: string, deep: number) {
  if (deep <= 0)
    return ''
  for (let i = 0; i < deep; i++)
    ind += '  '

  return ind
}

function toXml(v: any, name: string, ind: string, deep: number) {
  let xml = ''
  if (name === 'bpmn:extensionElements') {
    xml += extensionElements(v, name, ind, deep)
  }
  else {
    if (Array.isArray(v)) {
      for (let i = 0, n = v.length; i < n; i++)
        xml += toXml(v[i], name, ind, deep)
    }
    else if (typeof (v) === 'object') {
      let hasChild = false
      xml += `${addIndSpace(ind, deep)}<${name}`
      let i = 0
      for (const m in v) {
        if (m.charAt(0) === '-') {
          i++
          if (i > 4) {
            xml += `\n  ${addIndSpace(ind, deep)}`
            i = 1
          }
          xml += ` ${m.substring(1)}="${v[m].toString()}"`
        }
        else { hasChild = true }
      }
      xml += hasChild ? '>\n' : ' />\n'
      if (hasChild) {
        for (const m in v) {
          if (m === '#text')
            xml += v[m]
          else if (m === '#cdata')
            xml += `<![CDATA[${v[m]}]]>\n`
          else if (m.charAt(0) !== '-')
            xml += toXml(v[m], m, ind, deep + 1)
        }
        xml += `${addIndSpace(ind, deep)}</${name}>\n`
      }
      else {
        // xml += addIndSpace(ind, deep);
      }
    }
    else {
      xml += `${addIndSpace(ind, deep)}<${name}>${v.toString()}</${name}>\n`
    }
  }

  return xml
}

function extensionElements(v: any, name: string, ind: string, deep: number) {
  let xml = ''
  if (Array.isArray(v)) {
    for (let i = 0, n = v.length; i < n; i++)
      xml += toXml(v[i], name, ind, deep)
  }
  else if (typeof (v) === 'object') {
    let hasChild = false
    xml += `${addIndSpace(ind, deep)}<${name}`
    let i = 0
    for (const m in v) {
      if (m.charAt(0) === '-') {
        i++
        if (i > 4) {
          xml += `\n  ${addIndSpace(ind, deep)}`
          i = 1
        }
        xml += ` ${m.substring(1)}="${v[m].toString()}"`
      }
      else { hasChild = true }
    }
    xml += hasChild ? '>\n' : ' />\n'
    if (hasChild) {
      for (const m in v) {
        if (m === '#text') { xml += v[m] }
        else if (m === '#cdata') { xml += `<![CDATA[${v[m]}]]>\n` }
        else if (m.charAt(0) !== '-') {
          if (m === 'camunda:property')
            xml += properties(v[m], m, ind, deep + 1)
          else if (m === 'camunda:taskListener')
            xml += taskListener(v[m], m, ind, deep + 1)
          else if (m === 'camunda:executionListener')
            xml += taskListener(v[m], m, ind, deep + 1)
          else
            xml += extensionElements(v[m], m, ind, deep + 1)
        }
      }
      xml += `${addIndSpace(ind, deep)}</${name}>\n`
    }
    else {
      // xml += addIndSpace(ind, deep);
    }
  }
  else {
    xml += `${addIndSpace(ind, deep)}<${name}>${v.toString()}</${name}>\n`
  }
  return xml
}

function properties(v: any, name: string, ind: string, deep: number) {
  let xmlStr = ''
  if (Array.isArray(v)) {
    for (let i = 0, n = v.length; i < n; i++) {
      xmlStr += `${addIndSpace(ind, deep)}<${name}`
      let j = 0
      for (const m in v[i]) {
        if (m.charAt(0) === '-') {
          j++
          if (j > 4) {
            xmlStr += `\n  ${addIndSpace(ind, deep)}`
            j = 1
          }
          xmlStr += ` ${m.substring(1)}="${v[i][m].toString()}"`
        }
      }
      xmlStr += ' />\n'
    }
  }
  else if (typeof (v) === 'object') {
    const pk = Object.keys(v)
    if (pk.length > 1 && pk[0] === '0') {
      for (let i = 0, n = pk.length; i < n; i++) {
        xmlStr += `${addIndSpace(ind, deep)}<${name}`
        let j = 0
        for (const m in v[pk[i]]) {
          if (m.charAt(0) === '-') {
            j++
            if (j > 4) {
              xmlStr += `\n  ${addIndSpace(ind, deep)}`
              j = 1
            }
            xmlStr += ` ${m.substring(1)}="${v[pk[i]][m].toString()}"`
          }
        }
        xmlStr += ' />\n'
      }
    }
    else {
      xmlStr += `${addIndSpace(ind, deep)}<${name}`
      let i = 0
      for (const m in v) {
        if (m.charAt(0) === '-') {
          i++
          if (i > 4) {
            xmlStr += `\n  ${addIndSpace(ind, deep)}`

            i = 1
          }
          xmlStr += ` ${m.substring(1)}="${v[m].toString()}"`
        }
      }
      xmlStr += ' />\n'
    }
  }
  else {
    xmlStr += `${addIndSpace(ind, deep)}<${name}>${v.toString()}</${name}>\n`
  }
  return xmlStr
}

function taskListener(v: any, name: string, ind: string, deep: number) {
  let xmlStr = ''
  if (Array.isArray(v)) {
    for (let i = 0, n = v.length; i < n; i++) {
      xmlStr += `${addIndSpace(ind, deep)}<${name}`
      let j = 0
      for (const m in v[i]) {
        if (m.charAt(0) === '-') {
          j++
          if (j > 4) {
            xmlStr += `\n  ${addIndSpace(ind, deep)}`
            j = 1
          }
          xmlStr += ` ${m.substring(1)}="${v[i][m].toString()}"`
        }
      }
      xmlStr += ' />\n'
    }
  }
  else if (typeof (v) === 'object') {
    const pk = Object.keys(v)
    if (pk.length > 1 && pk[0] === '0') {
      for (let i = 0, n = pk.length; i < n; i++) {
        xmlStr += `${addIndSpace(ind, deep)}<${name}`
        let j = 0
        for (const m in v[pk[i]]) {
          if (m.charAt(0) === '-') {
            j++
            if (j > 4) {
              xmlStr += `\n  ${addIndSpace(ind, deep)}`
              j = 1
            }
            xmlStr += ` ${m.substring(1)}="${v[pk[i]][m].toString()}"`
          }
        }
        xmlStr += ' />\n'
      }
    }
    else {
      xmlStr += `${addIndSpace(ind, deep)}<${name}`
      let i = 0
      for (const m in v) {
        if (m.charAt(0) === '-') {
          i++
          if (i > 4) {
            xmlStr += `\n  ${addIndSpace(ind, deep)}`

            i = 1
          }
          xmlStr += ` ${m.substring(1)}="${v[m].toString()}"`
        }
      }
      xmlStr += ' />\n'
    }
  }
  else {
    xmlStr += `${addIndSpace(ind, deep)}<${name}>${v.toString()}</${name}>\n`
  }
  return xmlStr
}

export function lfJson2Xml(o: any) {
  let xmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n'
  for (const m in o)
    xmlStr += toXml(o[m], m, '', 0)

  return xmlStr
}
