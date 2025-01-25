import React from 'react';

import "../style.css"

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="company-name">
				<h2>GyanGrove</h2>
			</div>
			<ul className="menu">
				<li className="menu-item">
					<a href="/inventory">
						<i className="fa fa-box"></i> Inventory
					</a>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;
