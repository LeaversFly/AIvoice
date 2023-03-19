export default function dialog() {
    let support = document.querySelector('.support')
    let dialog = support.getElementsByTagName('dialog')[0]
    support.getElementsByTagName('span')[0].addEventListener('click', () => {
        dialog.showModal()
    })
}