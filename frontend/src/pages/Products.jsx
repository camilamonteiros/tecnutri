import ActionsBar from "../components/ActionsBar";
import LinkBtnWhite from "../components/LinkBtnWhite";

function Produto(){
  return(
    <ActionsBar titulo="Produtos">
      <LinkBtnWhite linkTo="/product/linhasProdutos">Nova Linha de Produtos</LinkBtnWhite>
    </ActionsBar>
  )
}
export default Produto;