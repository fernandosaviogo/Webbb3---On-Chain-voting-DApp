import { useEffect, useState } from "react"
import { useConfig } from "wagmi";
import { readContract, writeContract } from '@wagmi/core';
import ABI from "./ABI.json";

type Voting = {
    option1: string;
    option2: string;
    votes1: number;
    votes2: number;
    maxDate: number;
}

export default function Vote() {

    const CONTRACT_ADDRESS = "0x8cCF125F05a496DA4Bd1A71569bEd7Beda896dbd";

    // pega as configurações da conexão com a carteira
    const config = useConfig();

    const [message, setMessage] = useState<string>("");
    const [voting, setVoting] = useState<Voting>({ maxDate: 0, option1: "", option2: "", votes1: 0, votes2: 0 });
    const [showVotes, setShowVotes] = useState<number>(0);

    useEffect(() => {
        readContract(config, {
            address: CONTRACT_ADDRESS,
            abi: ABI,
            chainId: config.chains[0].id,
            functionName: "getCurrentVoting",
            args: []
        })
            .then(result => {
                console.log("Current Voting: ", result);
                const voting = result as Voting;
                setVoting(voting);
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            })
    }, [])

    function isExpired() {
        return Number(voting.maxDate) < (Date.now() / 1000);
    }

    function getMaxDate() {
        return new Date(Number(voting.maxDate) * 1000).toLocaleString("pt-BR");
    }

    function getImageUrl(name: string) {
        switch (name) {
            case "Fernando": return "https://as2.ftcdn.net/v2/jpg/04/17/47/89/1000_F_417478928_1q9ZSiux4U66v3J5dZjdvx3DFiMmBcQ3.jpg";
            case "Dani": return "https://as1.ftcdn.net/v2/jpg/02/68/15/12/1000_F_268151249_E3qoBTf5LBOHUpN7uHj5jA3YWeShlWmq.jpg";
            default: return "https://as1.ftcdn.net/v2/jpg/01/91/01/78/1000_F_191017886_YIfoLtRxVw8PIeAMtR0i4ZDwAyKutVI2.jpg"
        }
    }

    function doVote(choice: number) {
        writeContract(config, {
            address: CONTRACT_ADDRESS,
            abi: ABI,
            chainId: config.chains[0].id,
            functionName: "addVote",
            args: [choice],
        })
            .then(() => {
                setShowVotes(choice);
                setMessage("Voto computado com sucesso! Resultados parciais sujeitos a alteração minuto a minuto.");
            })
            .catch(err => {
                console.log(err);
                setMessage(err.message);
            })
    }

    function btnVote2Click() {
        setMessage("Conctando na carteira...aguarde...");
        doVote(2);
    }

    function btnVote1Click() {
        setMessage("Conctando na carteira...aguarde...");
        doVote(1);
    }

    function getVotesCount(option: number) {
        if (option === 1)
            return showVotes === option ? Number(voting.votes1) + 1 : Number(voting.votes1);
        else
            return showVotes === option ? Number(voting.votes2) + 1 : Number(voting.votes2);
    }

    return (
        <div className="bg-web3">
            <div className='container px-4 py-5 voting-screen'>
                <div className='row justify-content-center text-center header-block'>
                    <div className="col-12 col-md-8">
                        <h1 className='web3-title mb-3'>Webbb3</h1>
                        <p className='lead web3-subtitle'>Votação on-chain do BBB.</p>
                        {
                            isExpired()
                                ? <p className='lead mb-3 web3-description'>Votação encerrada. Confira abaixo os resultados.</p>
                                : <p className='lead mb-3 web3-description'>Você tem até {getMaxDate()} para deixar seu voto em um dos participantes para que ele saida do programa.</p>
                        }
                    </div>
                </div>
                <div className='row justify-content-center voting-row'>
                    <div className='col-12 col-md-5 voting-card'>
                        <h3 className='my-2 d-block mx-auto' style={{ width: 250 }}>{voting.option2}</h3>
                        <img src={getImageUrl(voting.option2)} className='d-block mx-auto img-fluid rounded' width={250} height={250} />
                        {
                            isExpired() || showVotes > 0
                                ? <button className="btn btn-result p-3 my-2 d-block mx-auto" style={{ width: 250 }} disabled={true}>{getVotesCount(2)}</button>
                                : <button className="btn btn-web3 p-3 my-2 d-block mx-auto" style={{ width: 250 }}
                                    onClick={btnVote2Click}>Quero que saia este</button>
                        }
                    </div>
                    <div className='col-12 col-md-5 voting-card'>
                        <h3 className='my-2 d-block mx-auto' style={{ width: 250 }}>{voting.option1}</h3>
                        <img src={getImageUrl(voting.option1)} className='d-block mx-auto img-fluid rounded' width={250} height={250} />
                        {
                            isExpired() || showVotes > 0
                                ? <button className="btn btn-result p-3 my-2 d-block mx-auto" style={{ width: 250 }} disabled={true}>{getVotesCount(1)}</button>
                                : <button className="btn btn-web3 p-3 my-2 d-block mx-auto" style={{ width: 250 }}
                                    onClick={btnVote1Click}>Quero que saia este</button>
                        }
                    </div>
                </div>
                <div className="row align-item-center">
                    <p className="message">{message}</p>
                </div>
            </div>
        </div>
    )
}