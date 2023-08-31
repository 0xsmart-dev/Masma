export default function openTransak(user) {
    window.open(
        `https://global-stg.transak.com?apiKey=${process.env.NEXT_PUBLIC_TRANSAK_API_KEY}&environment=STAGING&defaultCryptoCurrency=USDC&network=polygon&isDisableCrypto=true&disableWalletAddressForm=true&walletAddress=${user?.smartWalletAddress}&cryptoCurrencyCode=USDC&defaultFiatAmount=30&fiatCurrency=USD`,
        '_blank',
        'toolbar=1, scrollbars=1, resizable=1, width=' + 400 + ', height=' + 800
    )
}