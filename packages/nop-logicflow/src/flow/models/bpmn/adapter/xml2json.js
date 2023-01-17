/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable vars-on-top */
// @ts-nocheck
const XML = function () { }

//  constructor
XML.ObjTree = function () {
  return this
}

//  class variables
XML.ObjTree.VERSION = '0.23'

//  object prototype
XML.ObjTree.prototype.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n'
XML.ObjTree.prototype.attr_prefix = '-'

//  method: parseXML( xmlsource )
XML.ObjTree.prototype.parseXML = function (xml) {
  let root
  if (window.DOMParser) {
    var xmldom = new DOMParser()
    //      xmldom.async = false;           // DOMParser is always sync-mode
    const dom = xmldom.parseFromString(xml, 'application/xml')
    if (!dom)
      return
    root = dom.documentElement
  }
  else if (window.ActiveXObject) {
    const xmldom = new ActiveXObject('Microsoft.XMLDOM')
    xmldom.async = false
    xmldom.loadXML(xml)
    root = xmldom.documentElement
  }
  if (!root)
    return
  return this.parseDOM(root)
}

//  method: parseDOM( documentroot )

XML.ObjTree.prototype.parseDOM = function (root) {
  if (!root)
    return

  this.__force_array = {}
  if (this.force_array) {
    for (let i = 0; i < this.force_array.length; i++)
      this.__force_array[this.force_array[i]] = 1
  }

  let json = this.parseElement(root) // parse root node
  if (this.__force_array[root.nodeName])
    json = [json]

  if (root.nodeType !== 11) { // DOCUMENT_FRAGMENT_NODE
    const tmp = {}
    tmp[root.nodeName] = json // root nodeName
    json = tmp
  }
  return json
}

//  method: parseElement( element )

XML.ObjTree.prototype.parseElement = function (elem) {
  //  COMMENT_NODE
  if (elem.nodeType === 7)
    return

  //  TEXT_NODE CDATA_SECTION_NODE
  if (elem.nodeType === 3 || elem.nodeType === 4) {
    // eslint-disable-next-line no-control-regex
    const bool = elem.nodeValue.match(/[^\x00-\x20]/)
    if (bool == null)
      return // ignore white spaces
    return elem.nodeValue
  }

  let retval
  const cnt = {}

  //  parse attributes
  if (elem.attributes && elem.attributes.length) {
    retval = {}
    for (let i = 0; i < elem.attributes.length; i++) {
      let key = elem.attributes[i].nodeName
      if (typeof (key) != 'string')
        continue
      const val = elem.attributes[i].nodeValue
      if (!val)
        continue
      key = this.attr_prefix + key
      if (typeof (cnt[key]) == 'undefined')
        cnt[key] = 0
      cnt[key]++
      this.addNode(retval, key, cnt[key], val)
    }
  }

  //  parse child nodes (recursive)
  if (elem.childNodes && elem.childNodes.length) {
    let textonly = true
    if (retval)
      textonly = false // some attributes exists
    for (let i = 0; i < elem.childNodes.length && textonly; i++) {
      const ntype = elem.childNodes[i].nodeType
      if (ntype === 3 || ntype === 4)
        continue
      textonly = false
    }
    if (textonly) {
      if (!retval)
        retval = ''
      for (let i = 0; i < elem.childNodes.length; i++)
        retval += elem.childNodes[i].nodeValue
    }
    else {
      if (!retval)
        retval = {}
      for (let i = 0; i < elem.childNodes.length; i++) {
        var key = elem.childNodes[i].nodeName
        if (typeof (key) != 'string')
          continue
        var val = this.parseElement(elem.childNodes[i])
        if (!val)
          continue
        if (typeof (cnt[key]) == 'undefined')
          cnt[key] = 0
        cnt[key]++
        this.addNode(retval, key, cnt[key], val)
      }
    }
  }
  return retval
}

//  method: addNode( hash, key, count, value )

XML.ObjTree.prototype.addNode = function (hash, key, cnts, val) {
  if (this.__force_array[key]) {
    if (cnts === 1)
      hash[key] = []
    hash[key][hash[key].length] = val // push
  }
  else if (cnts === 1) { // 1st sibling
    hash[key] = val
  }
  else if (cnts === 2) { // 2nd sibling
    hash[key] = [hash[key], val]
  }
  else { // 3rd sibling and more
    hash[key][hash[key].length] = val
  }
}

//  method: writeXML( tree )

XML.ObjTree.prototype.writeXML = function (tree) {
  const xml = this.hash_to_xml(null, tree)
  return this.xmlDecl + xml
}

//  method: hash_to_xml( tagName, tree )

XML.ObjTree.prototype.hash_to_xml = function (name, tree) {
  const elem = []
  const attr = []
  for (const key in tree) {
    if (!Object.prototype.hasOwnProperty.call(tree, key))
      continue
    const val = tree[key]
    if (key.charAt(0) !== this.attr_prefix) {
      if (typeof (val) == 'undefined' || val == null)
        elem[elem.length] = `<${key} />`

      else if (typeof (val) == 'object' && val.constructor === Array)
        elem[elem.length] = this.array_to_xml(key, val)

      else if (typeof (val) == 'object')
        elem[elem.length] = this.hash_to_xml(key, val)

      else
        elem[elem.length] = this.scalar_to_xml(key, val)
    }
    else {
      attr[attr.length] = ` ${key.substring(1)}="${this.xml_escape(val)}"`
    }
  }
  const jattr = attr.join('')
  let jelem = elem.join('')
  if (typeof (name) == 'undefined' || name == null) {
    // no tag
  }
  else if (elem.length > 0) {
    if (jelem.match(/\n/))
      jelem = `<${name}${jattr}>\n${jelem}</${name}>\n`

    else
      jelem = `<${name}${jattr}>${jelem}</${name}>\n`
  }
  else {
    jelem = `<${name}${jattr} />\n`
  }
  return jelem
}

//  method: array_to_xml( tagName, array )

XML.ObjTree.prototype.array_to_xml = function (name, array) {
  const out = []
  for (let i = 0; i < array.length; i++) {
    const val = array[i]
    if (typeof (val) == 'undefined' || val == null)
      out[out.length] = `<${name} />`

    else if (typeof (val) == 'object' && val.constructor === Array)
      out[out.length] = this.array_to_xml(name, val)

    else if (typeof (val) == 'object')
      out[out.length] = this.hash_to_xml(name, val)

    else
      out[out.length] = this.scalar_to_xml(name, val)
  }
  return out.join('')
}

//  method: scalar_to_xml( tagName, text )

XML.ObjTree.prototype.scalar_to_xml = function (name, text) {
  if (name === '#text')
    return this.xml_escape(text)

  else
    return `<${name}>${this.xml_escape(text)}</${name}>\n`
}

//  method: xml_escape( text )

XML.ObjTree.prototype.xml_escape = function (text) {
  return text.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"')
}

export const lfXml2Json = (xmlData) => {
  return new XML.ObjTree().parseXML(xmlData)
}
