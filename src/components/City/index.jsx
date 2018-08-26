import React from "react";

class CityComponent extends React.Component {
  render() {
    const { cityName, cityId } = this.props;

    return (
      <div className="Row__city">
        <span className="Row__name" key={cityId}>
          {cityName}
        </span>
      </div>
    );
  }
}

export default CityComponent;
