import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from "react-router-dom";

import api from './services/api';

import './App.css'

import { useForm } from "react-hook-form";



const Sacola = ({ data,data2 }) => {
  const { handleSubmit } = useForm();
 
  return (
    <div id="sacola" class="section">

      <h2>Products</h2>
      
          <ul className="produtos">

          { data.map(
          produto => <li>
           
           {produto.product.imageObjects.map(imagem => 
            <div><img src={imagem.small} alt="{produto.product.name}" /></div>
           )}
           
          <div>
          <p className="titulo_produto">{produto.product.name}</p>
          <p className="preco_produto destaque2">{produto.product.priceSpecification.price}</p>
          </div>
          

          </li>


          )}

          </ul>
       <div className="total">
            <form onSubmit={ handleSubmit(onSubmit) }>

            <table>
              <tr>
              <td className="titulo">Products</td> <td className="valor">{data2.subTotal}</td>
               <input type="hidden" name="subTotal" value="{data2.subTotal}" />
              </tr>
               <tr>
              <td className="titulo">Shipping</td> <td className="valor">{data2.shippingTotal}</td>
              <input type="hidden" name="shippingTotal" value="{data2.shippingTotal}" />
              </tr>
               <tr>
              <td className="titulo destaque1">Discount</td> <td className="valor destaque1">-{data2.discount}</td>
              <input type="hidden" name="discount" value="{data2.discount} " />
              </tr>

              <tr>
              <td className="titulo destaque2">Total</td> <td className="valor destaque2">{data2.total - data2.discount}</td>
              <input type="hidden" name="total" value="{data2.total - data2.discount}" />
              </tr>
            </table>

            <input class="btb_pagamento" type="submit" value="Proceed to payment" />

        </form>
          </div>

        

    </div>
  );

}


 const onSubmit = (data) => {
  console.log(data)
 }

function Pagamento() {
  return (
    <div>
      <h2>Payment</h2>
    </div>
  );
}

function Confirmacao() {
  return (
    <div>
      <h2>Confirmation</h2>
    </div>
  );
}

class Carrinho extends Component {


  state = {
    produtos: [],
    pedido: []
  }

  componentDidMount() {

    api.get('https://www.mocky.io/v2/5b15c4923100004a006f3c07/').then(response => {
      this.setState({
        produtos: response.data.items
       
      });
    });

    api.get('https://www.mocky.io/v2/5b15c4923100004a006f3c07/').then(response => {
      this.setState({
         pedido: response.data
       
      });
    });

  }
 
  render() {
    return (
 <div className="Carrinho"> 
 <Router>
      <div>
        <ul className="menu">
          <li>
            <Link className="destaque2" to="/">My Bag</Link>
          </li>
          <li>
            <Link className="destaque2" to="/pagamento">Payment</Link>
          </li>
          <li>
            <Link className="destaque2" to="/confirmacao">Confirmation</Link>
          </li>
        </ul>

        <hr />

       
        <Switch>
          <Route exact path="/">
            <Sacola data={ this.state.produtos} data2={this.state.pedido }/>
          </Route>
          <Route path="/pagamento">
            <Pagamento />
          </Route>
          <Route path="/confirmacao">
            <Confirmacao />
          </Route>
        </Switch>
      </div>
    </Router>


  </div>

 


);

}

}

export default Carrinho
