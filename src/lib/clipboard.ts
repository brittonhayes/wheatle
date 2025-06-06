export async function copyTextToClipboard(text: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (navigator.clipboard !== undefined && window.isSecureContext === true) {
    return navigator.clipboard.writeText(text)
  }

  // Fallback for older browsers
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}
