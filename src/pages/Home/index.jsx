import React from "react";
import { Link } from "react-router";
import { Grid, Row, Col } from "react-flexbox-grid";
import { connect } from "react-redux";
import Box from "Components/Box";
import AutoSuggestContainer from "Containers/AutoSuggest";
import CityComponent from "Components/City";
import Loading from "Components/Loading";

class Home extends React.Component {
  state = {
    cityList: this.props.cityList || [],
    currentPage: 1,
    citiesPerPage: 25
  };

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };
  componentDidMount() {
    const { id } = this.props.params;

    this.setState({ currentPage: Number(id) });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.setState({ currentPage: Number(nextProps.params.id) });
    }
  }

  render() {
    const { cityList, loading, match } = this.props;
    const { currentPage, citiesPerPage } = this.state;

    let cities = cityList;

    // Logic for displaying current todos
    const indexOfLastCity = currentPage * citiesPerPage;
    const indexOfFirstCity = indexOfLastCity - citiesPerPage;
    const currentCities =
      !loading && cities.slice(indexOfFirstCity, indexOfLastCity);

    // Logic for displaying page numbers

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cityList.length / citiesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Link
          className={number === currentPage && "active"}
          key={number}
          to={`/${number}`}
          onClick={this.handleClick}
        >
          {number}
        </Link>
      );
    });

    return (
      <div className="homeGrid Datalist">
        {loading && <Loading />}
        {!loading &&
          currentCities.length &&
          currentCities.map(city => {
            return (
              <Grid fluid>
                <Row className="Row__row">
                  <Box
                    className="Row__col Datalist__item"
                    type="row"
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                  >
                    <CityComponent cityName={city.name} cityId={city.id} />
                  </Box>
                  <Box
                    type="row"
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className="Row__col Datalist__item"
                  >
                    <AutoSuggestContainer cityName={city.name} />
                  </Box>
                </Row>
              </Grid>
            );
          })}

        <div className="pagination">{renderPageNumbers}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ data, loading }) => ({
  cityList: data,
  loading
});

export default connect(
  mapStateToProps,
  null
)(Home);
