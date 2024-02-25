class CurrencyTable extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Exchange Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>USD</td>
                        <td>3.20</td>
                    </tr>
                    <tr>
                        <td>EUR</td>
                        <td>3.80</td>
                    </tr>
                    <tr>
                        <td>GBP</td>
                        <td>4.40</td>
                    </tr>
                    <tr>
                        <td>JPY</td>
                        <td>0.029</td>
                    </tr>
                    <tr>
                        <td>AUD</td>
                        <td>2.30</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}

customElements.define('currency-table', CurrencyTable);