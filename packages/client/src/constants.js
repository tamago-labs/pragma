import { InjectedConnector } from "@web3-react/injected-connector"

export const injected = new InjectedConnector()

export const SUPPORT_CHAINS = [3141]

export const Connectors = [
    {
        name: "MetaMask",
        connector: injected
    }
]

export const API_HOST = "https://pragma-hackathon-api.tamago.finance"