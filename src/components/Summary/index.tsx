import incomeSvg from '../../assets/income.svg';
import outcomeSvg from '../../assets/outcome.svg';
import totalSvg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary(){
    const { transactions } = useTransactions();

    // const totalDeposits = transactions.reduce((accumulator, transaction) => {
    //     if (transaction.type == 'deposit'){
    //         return accumulator + transaction.amount;
    //     }

    //     return accumulator;
    // }, 0);

    const summary = transactions.reduce((accumulator, transaction) => {
        if (transaction.type == 'deposit'){
            accumulator.totalDeposits += transaction.amount;
            accumulator.total += transaction.amount;
        }else{
            accumulator.totalWithdraws += transaction.amount;
            accumulator.total -= transaction.amount;
        }

        return accumulator;
    }, {
        totalDeposits: 0,
        totalWithdraws: 0,
        total: 0
    });

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeSvg} alt="Entradas"/>
                </header>

                <strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(summary.totalDeposits)}</strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeSvg} alt="Saídas"/>
                </header>

                <strong>- {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(summary.totalWithdraws)}</strong>
            </div>

            <div className="success-background">
                <header>
                    <p>Total</p>
                    <img src={totalSvg} alt="Total"/>
                </header>

                <strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(summary.total)}</strong>
            </div>
        </Container>
    );
}