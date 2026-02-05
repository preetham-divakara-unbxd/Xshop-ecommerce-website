import React from 'react';
import { Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';
import Button from '../components/Button';

const Orders = () => {
  const { orders } = useAppContext();

  if (orders.length === 0) {
    return (
      <section className="orders-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'left' }}>My Orders</h2>
          <div className="empty-state" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '500px' }}>
            <div className="empty-state-icon">📦</div>
            <div className="empty-state-title">No Orders Yet</div>
            <div className="empty-state-message">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </div>
            <Link to="/">
              <Button text="Continue Shopping" className="btn-primary" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-section">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'left' }}>My Orders</h2>
        <div id="orders-container">
          {orders.map(order => {
            const orderDate = new Date(order.createdAt || order.orderDate);
            const formattedDate = orderDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            const status = order.status || 'pending';
            const total = order.total || 0;

            return (
              <div key={order.orderId} className="order-card">
                <div className="order-header">
                  <div>
                    <div className="order-id">{order.orderId}</div>
                    <div className="order-date">Ordered on {formattedDate}</div>
                  </div>
                  <div className={`order-status ${status}`}>{status}</div>
                </div>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="order-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="order-item-details">
                        <div className="order-item-name">{item.name}</div>
                        <div className="order-item-brand">{item.brand}</div>
                        <div className="order-item-quantity">Quantity: {item.quantity}</div>
                      </div>
                      <div className="order-item-price">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-summary">
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '4px' }}>
                      Total Amount
                    </div>
                    <div className="order-total">{formatPrice(total)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Orders;
