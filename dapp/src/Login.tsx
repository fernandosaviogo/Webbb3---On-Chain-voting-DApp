import { useMemo } from "react";
import {
    useAccount,
    useConnect,
    useDisconnect,
    useChainId,
    useSwitchChain,
} from "wagmi";
import { bscTestnet } from "wagmi/chains";

function shortAddress(addr?: `0x${string}`) {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
}

export default function Login() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();

    const { connectors, connect, isPending, error } = useConnect(); // Escolhe a carteira que está disponivel
    const { disconnect } = useDisconnect();
    const { switchChain, isPending: switchingNetwork } = useSwitchChain(); // Troca de rede

    // escolher o melhor conector injetado
    const connector = useMemo(() => connectors[0], [connectors]);

    const wrongNetwork = isConnected && chainId !== bscTestnet.id; // Se esta conectado na rede errada

    return (
        <div className="container px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-12 col-lg-6">
                    <img src="https://s2.glbimg.com/_wV6kctSTJxi_-cVnGK115V6tVA=/620x466/top/e.glbimg.com/og/ed/f/original/2021/05/03/bbb-simbolo.jpeg" />
                </div>
                <div className="col-12 col-lg-6">
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                        Webbb3
                    </h1>
                    <p className="lead">
                        Votação on-chain do BBB.
                    </p>
                    <p className="lead mb-3">
                        Autentique-se com qualquer carteira Web3 compatível.
                    </p>

                    {/*CARTEIRA NÃO CONECTADA */}
                    {!isConnected && (
                        <>
                            <button
                                type="button"
                                className="btn btn-primary btn-lg w-100 d-flex justify-content-center align-items-center gap-3"
                                disabled={!connector || isPending}
                                onClick={() => connector && connect({ connector })}
                            >
                                <img src='/MetaMask-icon-fox.svg' width="64" className='me-3' />
                                {isPending ? "Conectando..." : "Conectar carteira"}
                            </button>

                            {!connector && (
                                <p className="text-warning mt-3">
                                    Nenhuma carteira detectada. Instale MetaMask ou outra carteira
                                    compatível com EVM.
                                </p>
                            )}

                            {error && (
                                <p className="text-danger mt-2">
                                    {error.message.includes("rejected")
                                        ? "Você cancelou a conexão na carteira."
                                        : error.message}
                                </p>
                            )}
                        </>
                    )}

                    {/*CARTEIRA CONECTADA */}
                    {isConnected && (
                        <>
                            <div className="alert alert-success d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <strong>Conectado:</strong> {shortAddress(address)}
                                    <div className="small text-muted">Chain: {chainId}</div>
                                </div>

                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => disconnect()}
                                >
                                    Desconectar
                                </button>
                            </div>

                            {wrongNetwork && (
                                <div className="alert alert-warning mt-3">
                                    Você está na rede errada.
                                    <strong>Troque para BSC Testnet.</strong>
                                    <button
                                        className="btn btn-warning mt-2"
                                        disabled={switchingNetwork}
                                        onClick={() =>
                                            switchChain?.({ chainId: bscTestnet.id })
                                        }
                                    >
                                        {switchingNetwork ? "Trocando..." : "Trocar rede"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}