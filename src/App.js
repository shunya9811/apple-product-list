import React from 'react';
import './App.css'
import MacBookAir from './images/MacBookAir.jpg'
import MacBookPro13 from './images/MacBookPro13.jpg'
import MacBookPro14 from './images/MacBookPro14.jpg'
import iPhone13Pro from './images/iPhone13Pro.jpg'
import iPhone13 from './images/iPhone13.jpg'
import iPhoneSE from './images/iPhoneSE.jpg'


class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <div>
        <h2  style={{textAlign: "left", marginLeft: "2rem"}}>
          {category}
        </h2>
      </div>
    );
  }
}

class ProductRow extends React.Component {
  
  
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <a href={product.to}>
        <div className='card'>
          <img src={product.image} alt={product.name} className='card__imgframe'/>
          <div className='textbox'>
            <p style={{textAlign: "left"}}>{name}</p>
            <p style={{textAlign: "right"}}> {product.price}~</p>
          </div>
        </div>
      </a>
    );
  }
}


class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {

      if (product.name.indexOf(filterText) === -1) {
        return;
      }

      if (inStockOnly && !product.stocked) {
        return;
      }

      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <div style={{flexDirection: 'row'}}>
        {rows}
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }
  
  render() {
    return (
      <div style={{textAlign: 'right', marginRight: '2rem'}}>
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
            style={{marginRight: "3rem"}}
          />
          <p>
            <input
              type="checkbox"
              checked={this.props.inStockOnly}
              onChange={this.handleInStockChange}
            />
            {' '}
            Only show products in stock
          </p>
        </form>
      </div>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render () {
    return (
      <div>
        <h1 style={{textAlign: "center"}}>Product List</h1>
        <hr width="30%" align="center"></hr>
        <FilterableProductTable products={PRODUCTS} />
      </div>
    );
  }
}

const PRODUCTS = [
  {category: 'Mac', price: '115,280円', stocked: true, name: 'MacBook Air', image: MacBookAir, to: 'https://www.apple.com/jp/macbook-air/'},
  {category: 'Mac', price: '148,280円', stocked: true, name: 'MacBook Pro 13Inch', image: MacBookPro13, to: 'https://www.apple.com/jp/shop/buy-mac/macbook-pro/13%E3%82%A4%E3%83%B3%E3%83%81'},
  {category: 'Mac', price: '239,800円', stocked: false, name: 'MacBook Pro 14Inch', image: MacBookPro14, to:'https://www.apple.com/jp/shop/buy-mac/macbook-pro/14%E3%82%A4%E3%83%B3%E3%83%81',},
  {category: 'iPhone', price: '122,800円', stocked: true, name: 'iPhone 13Pro', image: iPhone13Pro, to:'https://www.apple.com/jp/shop/buy-iphone/iphone-13-pro'},
  {category: 'iPhone', price: '86,800円', stocked: false, name: 'iPhone 13', image: iPhone13, to:'https://www.apple.com/jp/shop/buy-iphone/iphone-13'},
  {category: 'iPhone', price: '57,800円', stocked: true, name: 'iPhone SE', image: iPhoneSE, to:'https://www.apple.com/jp/shop/buy-iphone/iphone-se'},
  {category: 'iPad', price: '57,800円', stocked: true, name: 'iPhone SE', image: iPhoneSE, to:'https://www.apple.com/jp/shop/buy-iphone/iphone-se'}
];

export default App;
