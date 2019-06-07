
export default (text = MESSAGE) => {
  const element = document.createElement('div')
  element.className = 'pure-button'
  element.textContent = text
  element.onclick = () => {
    import('./lazy')
      .then(lazy => {
        element.textContent = lazy.default
      })
      .catch(err => {
        console.log(err)
      })
  }
  return element
}
