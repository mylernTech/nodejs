async function handleContactForm(ev) {
    ev.preventDefault()
    const form = new FormData(ev.target)
    const req = new Request('/contact', { method: 'POST', body: form });
    const resp = await fetch(req)
    if (resp.status == 200) {
        alert('Your message was successfully sent')
        window.location.reload(true);
    } else {
        alert('failure')
    }
}