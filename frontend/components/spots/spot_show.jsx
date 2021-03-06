import React from 'react';
import 'react-dates/initialize';
import '../../../app/assets/stylesheets/_react_dates_override.css';
import 'react-dates/lib/css/_datepicker.css';
import BookingForm from '../bookings/booking_form_container';
import BookingCalendar from '../bookings/booking_calendar';
import Reviews from '../reviews/review_index_container';
import SpotMap from './spot_map';

class SpotShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null, name: null, accommodation: null, rate: null, num_guests: null, num_beds: null,
      num_baths: null, city: null, description: null, img_url: null, lat: 0, lng: 0, ave_rating: null,
      stars: []
    };
  }

  componentDidMount() {
    this.props.fetchSpot(this.props.match.params.spotId).then(() => 
      this.setState(this.props.spot, () => this.calculateStars()));
  }

  calculateStars() {
    let ratingAve = this.state.ave_rating;
    let rateStars = [];
    let k = 0;

    for (let i = 1; i <= ratingAve; i++) {
      rateStars.push(<i key={i} className="fas fa-star"></i>);
    }

    while (rateStars.length < 5) {
      rateStars.push(<i key={k} className="far fa-star"></i>);
      k++
    }

    this.setState({stars: rateStars});
  }

  displayRatingText() {
    let rating = this.state.ave_rating;
    let ratingText;
    if (rating === 0) {
      ratingText = 'No current reviews'
    } else if (rating > 0 && rating < 3) {
      ratingText = 'Good Spot'
    } else if (rating >= 3 && rating < 5) {
      ratingText = 'Great Spot'
    } else {
      ratingText = 'Excellent Spot'
    }

    return ratingText;
  }

  render() {
    const { id, name, accommodation, rate, num_guests, num_beds, 
            num_baths, city, description, img_url, lat, lng, ave_rating, stars } = this.state;
    const spotMap = document.getElementById('spot-map');
    const insertMap = spotMap ? <SpotMap lat={lat} lng={lng}/> : null;
    const ratingText = this.displayRatingText();
    const s1 = num_guests > 1 ? 's' : '';
    const s2 = num_beds > 1 ? 's' : '';
    const s3 = num_baths > 1 ? 's' : '';
    // const userId = host_id;
    // const hostImg = { backgroundImage: `url(${user.userId.img_url})` };
    // const hostName = user.userId.fname
    return (
      <div className="show">
  
      <div className="show-imgs">
          <div className="main-img"><img src={img_url}/></div>
          <div className="sub-imgs">
            <div><img src={img_url} /></div>
            <div><img src={img_url} /></div>
            <div><img src={img_url} /></div>
            <div><img src={img_url} /></div>
          </div>
      </div>

      <div className="show-content">

        <div className="show-content-left">
          <div className="name">
              <div className="name-head">{name}</div>
          {/* <div className="host-img" style={hostImg}></div>
          <div className="host-name">{hostName}</div> */}
          {city}
          </div>

          <div className="details">
            <div className="accommodation-head"><i className="fas fa-home"></i>{'  '}{accommodation}</div>
            <div className="main-detail">
              <div>{num_guests} guest{s1}</div>
              <div>{num_beds} bedroom{s2}</div>
              <div>{num_baths} bathroom{s3}</div>
            </div>
            <div className="section-head">About this spot</div>
            <div className="detail">{description}</div>
          </div>
          
          <div className="amenities">
              <div className="section-head">Amenitites</div>
              <div className="amenity-list">
                <div className="amenity-list-item"><i className="fas fa-wifi"></i>Wifi</div>
                <div className="amenity-list-item"><i className="fas fa-tv"></i>TV</div>
                <div className="amenity-list-item"><i className="fas fa-utensils"></i>Kitchen</div>
                <div className="amenity-list-item"><i className="fas fa-mug-hot"></i>Coffee</div>
              </div>
          </div>

          <div className="availability">
              <div className="section-head">Availability</div>
              <div className="detail">Updated 2 days ago</div>
              <BookingCalendar spot={this.props.spot}/>
          </div>

            <div className="map">
              <div className="section-head">The Neighborhood</div>
              <div className="detail">Take a look around {city}</div>
              <div className="module" id="spot-map">{insertMap}</div>
              Exact location information is provided after a booking is confirmed.
            </div>

          <div className="reviews">
            <Reviews spotId={id} rating={ave_rating} stars={stars}/>
          </div>
        </div>

        <div className="show-content-right">
          <div className="booking-module">
              <div className="rate-head">
              <div className="rate-amt">
                <div className="rate"><i className="fas fa-wave-square"/>{rate}</div>
                <div>per night</div>
              </div>
              <div className="rating">
              {stars}
              <div className="num-reviews">{ratingText}</div>
              </div>
              </div>
              <BookingForm spot={this.props.spot}/>
          </div>
        </div>

      </div>

    </div>
    );
  }
}

export default SpotShow;