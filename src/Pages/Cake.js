import React, { Component } from 'react';
import CakeCard from '../Components/CakeCard';
import ReactPaginate from 'react-paginate';

export default class Cake extends Component {

    state = {
        data: [],
        dataMainCakes: [],
        filterdata: [],
        isLoading: false,
        search: "",
        pageCount: 1,
        perPage: 9,
        offset: 0,
        firstElement: 0,
        lastElement: 9,
        changedDataOrNot: 0
    }

    /* Завантажити товар */
    componentDidMount() {
        fetch('data/data.json')
        .then((response) => response.json())
        .then(cakeList => {
            this.setState({ dataMainCakes: cakeList });
        });
    }

    /* Вивести товар на екран */
    renderCake = cake => {
        return (
            <div>
                <CakeCard
                    idCake={cake.idCake}
                    nameCake={cake.nameCake}
                    imgURL={cake.imgURL}
                    aboutCake={cake.aboutCake}
                    priceCake={cake.priceCake} 
                    weightCake={cake.weightCake}
                    status={cake.status}
                    dateOfCreating={cake.dateOfCreating}
                />
            </div>
        );
    }

    /* При зміні значень пошуку */
    onchange = e => {
        this.setState({ search: e.target.value });
        this.setState({ firstElement: 0 });
        this.setState({ lastElement: 9 });
    }
    
    /* Торти на сторінці - 9 */
    publicCakes (arraycake) {
        const pageSize = 9;
        const cakesLenght = arraycake.length;
        const pgCount = cakesLenght/pageSize;
        const valueSt = this.state.pageCount;       
        const visiblecake = arraycake.slice(this.state.firstElement, this.state.lastElement);

        if (valueSt !== pgCount) {
            this.setState({ pageCount: pgCount });
            this.setState({ data: arraycake });
        }
                
        return ( visiblecake.map( cake =>{ return this.renderCake(cake) }) )
    }

    /* При зміні сторінки */
    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage);

        this.setState({ offset: offset }, () => {
            this.setState({ firstElement: (((selected+1)*9)-9) });
            this.setState({ lastElement: ((selected+1)*9) });
        });
    };
    
    render () {
        const {search} = this.state;
        const uploadCakes = this.state.dataMainCakes;

        const filteredCakes = uploadCakes.filter( cake =>{
            return ((cake.nameCake.toLowerCase().indexOf( search.toLowerCase() ) !== -1) 
                || (cake.aboutCake.toLowerCase().indexOf( search.toLowerCase() ) !== -1))
        });

        return (
            <div className="wrapper">
                <div className="container-fluid all-pages">
                    <h2>Нашi тортики</h2>
                    <div className="search-and-filter">
                        <div className="cake-search" id="click-search">
                            <i id="search" className="fa fa-search search-icon-style" ></i>
                            <form id="form" className="search-form">
                            <div className="search-form">
                             <input type="text" onFocus="this.value=''" name="search" id="searchinput" placeholder="Пошук" onChange={this.onchange}
                                   className="form-control search-style"/>
                                </div>
                                <ul className="list-group " id="result"></ul>
                            </form>
                        </div>
                    </div>

                    <div className="products-all"> {this.publicCakes(filteredCakes)} </div>

                    <div className="products-pagination"> 
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </div>
        ); 
    }
}