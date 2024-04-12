# CursoReactNative
Aplicativo para pedidos de comida usando como identidade visual o projeto desenvolvido no NLW da RocketSeat(2024) sobre React Native.
- O projeto original do curso de 5 horas, tinha o intuito de ensinar o básico da tecnologia, com informações fixas, ensinamentos de desenvolvimento de telas, um pouco de navegação padrão, e salvar informações locais;

- Afim de explorar a tecnologia e descobrir tudo que eu podia fazer com ela, resolvi "terminar" o aplicativo e deixa-lo 100% funcional para isso. Resolvi desenvolver um fluxo de login e pedidos, menu lateral, tela modal, estilização, além de integrações com APIs do dispositivo, como localização, SecureStorage, câmera, internet, galeria e notificações. Porém, para deixar o aplicativo 100% funcional também era necessário uma API, por isso também desenvolvi uma em ASP.NET com SQLite, e pode ser acessada no link abaixo.

- O aplicativo contém um fluxo de cadastro e login. No cadastro o app pega sua localização e preenche os campos de endereço ( utilizando as APIs de localização disponibilizadas pelo Expo ), além de usar máscaras para telefone, cpf, e manter o usuario conectado após o primeiro login.

- Após o login o usuario é direcionado a tela de home, onde também irá aparecer um menu lateral ao lado do icone do carrinho ( este que somente aparece caso tenha pelo menos um item), o menu tem as opções de "Meus pedidos", "Home" e "Logout"

- Após será visualizado a tela de Home, onde o app consulta na API o menu com os produtos dísponiveis. Estes produtos tem uma pagina de detalhes no qual o usuario pode adiciona-los ao seu carrinho, sendo que a informação do carrinho é salva no dispositivo.

- Caso você tenha pelo menos um item no seu carrinho, no menu superior, irá aparecer uma sacola onde você pode visualizar seu carrinho, mostrando os produtos, preços, podendo remover itens, e podendo concluir o pedido.

- Na conclusão de pedido, todos os devidos processamentos e validações são realizados, e o pedido é enviado para uma API com as informações do usuário, produtos, preço, data, e um status de pendente.

- Os pedidos podem ser visualizados na aba " Meus pedidos ", onde aparecerão uma lista de pedidos com o status diferente de finalizados, e estes pedidos pendentes, tem uma opção de " Confirmar entrega ", onde uma tela modal aparece, dando a opção do usuario tirar uma foto ou selecionar um anexo do pedido, comprovando sua entrega.

OBS: Eu mantive a identidade visual do curso inicial pois meu foco era aprender a tecnologia e não desenvolver um produto próprio.

Link da API:
https://github.com/ThiagoFrancischini/AspNetFoodAPI.git

# Para executar
Configure o ambiente de instalação do Expo Go, e configure a API para ser executada também. Após a configuração da API, pegue a url que ela estará rodando, e altere a url do arquivo Api.ts em src/services para a sua.

# ROADMAP

Desenvolver fluxo de notificações push, que serão recebidas nas trocas de status dos pedidos.

# Para não esquecer:
Bibliotecas Utilizadas:
Axios
TailwindCss
NativeWind
Zustand
Diversas bibliotecas do Expo
