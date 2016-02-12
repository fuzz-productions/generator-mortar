var React = require('react/addons');
var NavSecondLevel = require('./NavSecondLevel');
var NavThirdLevel = require('./NavThirdLevel');
<% if (installType == "auth") {
%>var RequirePermissions = require('../../../authentication/RequirePermissions');<%
} %>

var NavButton = React.createClass({
	propTypes: {
		button: React.PropTypes.shape({
			href: React.PropTypes.string.isRequired,
			buttonName: React.PropTypes.string.isRequired
		})
	},

	children: function() {
		return this.props.button.children.map(function(button, index) {
			<% if (installType == "auth") {
			%>if (Array.isArray(button.permissions)) {
				return (
					<RequirePermissions key={index} requiredPermissions={button.permissions}>
						<NavSecondLevel key={index} button={button} />
					</RequirePermissions>
				);
			} else {
				return (
					<NavSecondLevel key={index} button={button} />
				)
			}<% } else {
				%>return (
					<NavSecondLevel key={index} button={button} />
				)<%
			}%>
		});
	},

	render: function () {
		if (this.props.button.children) {
			return (
				<li className="dropdown">
					<a href={this.props.button.href} data-target="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
						{this.props.button.buttonName}
						<b className="caret"></b>
					</a>
					<ul className="dropdown-menu">
						{this.children()}
					</ul>
				</li>
			)
		} else {
			return (
				<li>
					<a href={this.props.button.href}>
						{this.props.button.buttonName}
						<div className="ripple-wrapper"></div>
					</a>
				</li>
			)
		}
	}
});

module.exports = NavButton;
