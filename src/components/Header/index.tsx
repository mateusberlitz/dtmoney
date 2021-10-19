import logoSvg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
    onClickTransactionModal: () => void;
}

export function Header({ onClickTransactionModal }: HeaderProps){
    return(
        <Container>
            <Content>
                <img src={logoSvg} alt="DevGate Money"/>
                <button type="button" onClick={onClickTransactionModal}>
                    Nova Transação
                </button>
            </Content>
        </Container>
    );
}