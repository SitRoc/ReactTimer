var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  onSearch: function(e){
    e.preventDefault();

    var location = this.refs.search.value;
    var encodedLocation = encodeURIComponent(location);

    if (location.length > 0) {
      this.refs.search.value = '';
      window.location.hash = '#/?location=' + location;
    }
  },
  render: function(){
    return (
      <div className="top-bar" >
        <div className="top-bar-left" >
          <ul className="menu" >
            <li className="menu-text">React Time App</li>
            <li>
              <IndexLink to="/" activeClassName="active-link">Timer</IndexLink>
            </li>
            <li>
              <Link to="/countdown" activeClassName="active-link">Countdown</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li className="menu-text">Created by <a href="" target="_blank">Steve Cortis</a></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Nav;
