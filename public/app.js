const toCurrency = price => {
    return new Intl.NumberFormat('ua-UA', {
        currency: 'uan',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})


const $cart = document.querySelector('#cart')
if ($cart) {
    $cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id


            fetch('/cart/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(cart => {
                    if (cart.courses.length) {
                        const html = cart.courses.map(c => {
                            return `
                                 <tr>
                                    <td>${c.title}</td>
                                    <td>${c.count}</td>
                                    <td>
                                        <button class="btn waves-effect waves-light black js-remove"
                                                type="submit"
                                                name="action"
                                                data-id="${c.id}">Remove
                                        </button>
                                    </td>
                                </tr>
                            `
                        }).join('')
                        $cart.querySelector('tbody').innerHTML = html
                        $cart.querySelector('.price').textContent = toCurrency(card.price);
                    } else {
                        $cart.innerHTML = '<p class="black-text">' +
                            'Cart is empty, to fill cart go to <a href="/courses">courses list.</a>' +
                            '</p>'
                    }
                })
        }
    })
}
