import React from 'react';
import ConsolidatedOrderInfo from '../../modules/ConsolidatedOrderInfo/ConsolidatedOrderInfo';

const OrdersOfConsolidatedOrder = ({ data }) => {
	return (
		<section>
			<div className='wrapper'>
				<ConsolidatedOrderInfo />
			</div>
		</section>
	);
};

export default OrdersOfConsolidatedOrder;
