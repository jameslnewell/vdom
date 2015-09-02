# vdom

Goals:

- inject/pass a context object into each component
- accept any attributes and have hooks to allow implementing libs to determine how they're set on the element e.g. wrap onclick
- node, text and component types 

Component
.render() : vtree
.$afterMount()
.$beforeUnmount()