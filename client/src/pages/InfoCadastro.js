import React, { useEffect } from 'react';
import './Login.css';
import { BsFillLockFill, BsBellFill, BsPersonFill } from 'react-icons/bs';
import folhaEsquerda from '../assets/folha-esquerda.png';
import folhaDireita from '../assets/folha-direita.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import folhaSidebar from '../assets/folha-esquerda.png';


const InfoCadastro = () => {
    useEffect(() => {
        const updateNavbarPosition = () => {
            const navBar = document.querySelector('.nav-bar');
            const subNavBar = document.querySelector('.subnav-bar');
            const headerHeight = document.querySelector('.header').offsetHeight;

            if (window.scrollY > headerHeight) {
                navBar.classList.add('fixed-nav');
                navBar.style.top = '0';

                if (subNavBar) {
                    subNavBar.classList.add('fixed-subnav');
                    subNavBar.style.top = `${navBar.offsetHeight}px`;
                }
            } else {
                navBar.classList.remove('fixed-nav');
                navBar.style.top = `${headerHeight}px`;

                if (subNavBar) {
                    subNavBar.classList.remove('fixed-subnav');
                    subNavBar.style.top = '0';
                }
            }
        };

        updateNavbarPosition();
        window.addEventListener('scroll', updateNavbarPosition);
        return () => window.removeEventListener('scroll', updateNavbarPosition);
    }, []);

    return (
        <div className="pagina-login">
            <img src={folhaEsquerda} alt="Folha esquerda" className="folha folha-esquerda" />
            <img src={folhaDireita} alt="Folha direita" className="folha folha-direita" />

            <header className="header">
                <div className="header-top">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="header-right">
                        <BsBellFill className="icone-sino" />
                        <div className="avatar-container">
                            <img src={avatar} alt="Avatar do usuário" className="icone-avatar" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="nav-bar">
                <div className="nav-metade-esquerda">
                    <span className="nav-link">Início</span>
                </div>
                <div className="nav-metade-direita">
                    <span className="nav-link">Testes</span>
                </div>
            </div>

            <div className="subnav-bar">
                <span>Informações de cadastro</span>
            </div>

            <div style={{ display: 'flex' }}>
                {/* SIDEBAR INTEGRADO */}
                <div
                    className="sidebar"
                    style={{
                        backgroundImage: `url(${folhaSidebar})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right bottom',
                        backgroundSize: 'contain'
                    }}
                >
                    <div className="profile-section">
                        <BsPersonFill className="profile-icon" />
                        <p className="user-name">Nome</p>
                    </div>
                    <div className="menu-option active">Informações de cadastro</div>
                    <div className="menu-option">Suas rotinas</div>
                    <div className="menu-option">Gráficos e Conquistas</div>
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <main className="login-container" style={{ flex: 1 }}>
                    <div className="vivi">
                        <div className="login-box" style={{ justifyContent: 'center' }}>
                            <div className="login-section">
                                <h2 className="login-title">Redefinir Senha</h2>
                                <p style={{ color: '#999', marginRight: '80px', marginBottom: '5px' }}>Defina a nova senha:</p>
                                <div className="form-group">
                                    <BsFillLockFill className="icon" />
                                    <input type="password" placeholder="Senha" />
                                </div>
                                <p style={{ color: '#999', marginRight: '60px', marginBottom: '5px' }}>Confirme a nova senha:</p>
                                <div className="form-group">
                                    <BsFillLockFill className="icon" />
                                    <input type="password" placeholder="Confirmar nova senha" />
                                </div>
                                <button className="btn-enviar">Redefinir</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="footer">
                <p>© 2025 EcoBalance — Todos os direitos reservados</p>
            </footer>
        </div>
    );
};

export default InfoCadastro;
