import Modal from "react-modal";
import { Container, TransactionTypeContainer, TransactionButton } from "./styles";
import closeSvg from '../../assets/close.svg';
import incomeSvg from '../../assets/income.svg';
import outcomeSvg from '../../assets/outcome.svg';
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    const { createTransaction } = useTransactions();

    const [typeTransaction, setTypeTransaction] = useState('deposit');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);

    async function handelCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            type: typeTransaction,
            amount,
            category,
            title
        });

        setTypeTransaction('deposit');
        setAmount(0);
        setCategory('');
        setTitle('');

        onRequestClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeSvg} alt="Fechar Modal"/>
            </button>

            <Container>
                <h2>Cadastrar transação</h2>

                <input type="text" placeholder="Título" value={title} onChange={event => setTitle(event.target.value)} />
                <input type="number" placeholder="Valor" value={amount} onChange={event => setAmount(Number(event.target.value))}/>
                <TransactionTypeContainer>

                    <TransactionButton type="button" onClick={ () => { setTypeTransaction('deposit'); } }  isActive={typeTransaction === "deposit"} activeColor="green">
                        <img src={incomeSvg} alt="Entrada"/>
                        <span>Entrada</span>
                    </TransactionButton>

                    <TransactionButton type="button" onClick={ () => { setTypeTransaction('withdraw'); } } isActive={typeTransaction === "withdraw"} activeColor="red">
                        <img src={outcomeSvg} alt="Saída"/>
                        <span>Saída</span>
                    </TransactionButton>

                </TransactionTypeContainer>
                <input type="text" placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>
                <button type="submit" onClick={handelCreateNewTransaction}>Cadastrar</button>
            </Container>
        </Modal>
    );
}