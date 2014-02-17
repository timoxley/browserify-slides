"use strict"

function makeSections(root) {
  var sections = []
  var currentSection = undefined
  ;[].slice.call(root.children).forEach(function(el) {
    if (el.tagName === 'H1' || el.tagName === 'H2') {
      if (currentSection) sections.push(currentSection)
      currentSection = new Section(el)
    } else {
      if (currentSection) currentSection.children.push(el)
    }
  })
  if (sections.indexOf(currentSection) === -1) sections.push(currentSection)
  return sections
}

function Section(head) {
  this.head = head
  this.children = []
}

Section.prototype.wrap = function(wrapper) {
  wrapper = wrapper.cloneNode(true)
  var parent = this.head.parentElement
  var sibling = this.children.length && this.children[this.children.length - 1].nextSibling 
  var self = this
  var head = this.head
  ;[head].concat(this.children).forEach(function(el) {
    parent.removeChild(el)
    wrapper.appendChild(el)
  })
  if (sibling) {
    parent.insertBefore(wrapper, sibling);
  } else {
    parent.appendChild(wrapper);
  }
}

module.exports = function(root) {
  var sections = makeSections(root)
  var wrapper = document.createElement('div')
  wrapper.className = 'slide'
  sections.forEach(function(section) {
    section.wrap(wrapper)
  })

  document.title = document.querySelector('h1, h2').innerText
}

