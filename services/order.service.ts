import { apiClient } from './api';
import { MOCK_ORDERS } from '../mock/orders';
import { Order, OrderStatus } from '../types/order';
import { CartItem, CartBill } from '../types/cart';

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    return apiClient.get('/orders', MOCK_ORDERS, 200);
  },

  getOrderById: async (id: string): Promise<Order | undefined> => {
    const order = MOCK_ORDERS.find((o) => o.id === id) || MOCK_ORDERS[0];
    return apiClient.get(`/orders/${id}`, order, 150);
  },

  createOrder: async (payload: {
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
    bill: CartBill;
    deliveryAddress: any;
    paymentMethod: string;
  }): Promise<Order> => {
    const newOrder: Order = {
      id: `#BZ-${Math.floor(10000 + Math.random() * 90000)}`,
      restaurantId: payload.restaurantId,
      restaurantName: payload.restaurantName,
      restaurantImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ8LOKRLaEOM6AxuQP7p6Q3MqDC8p5cyoiH4Zo3WO3QVVPUyqQ1UeyRCpWYLPQWFv5Yp3SqvSWToKbOvUkEf46OBsHmo4qSZqktU8d62p2t2uvop0rEtaxdDm7D3uDXp0bOJfisjGvI8ctcn2L_yQ_OJ-vzjRFlwaQk8Z93Y3ffWykSLifqj_53nUbMj2c1jWG_hBTmP09MaFyeFcoQj7KF8jFkiGVIQpnUEIW-JqxMVNyBOBY0kTU',
      restaurantAddress: '142 Bedford Ave, Williamsburg, Brooklyn',
      status: 'RESTAURANT_ACCEPTED',
      statusLabel: 'Restaurant accepted & prepping',
      estimatedDeliveryTime: '22-28 mins',
      itemCount: payload.items.reduce((acc, i) => acc + i.quantity, 0),
      items: payload.items,
      bill: payload.bill,
      deliveryAddress: payload.deliveryAddress,
      courier: {
        name: 'Alex Morgan',
        phone: '+1 (800) 555-0199',
        vehicle: 'Honda Activa 6G • NY-04-AB-3291',
        rating: 4.9,
        deliveryCount: '1,420+ safe deliveries completed',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDysWdK5DN8ZTE7U_7DIRc9p0EPDOB2dSjmr_Wi2qnYL5zeWovzYiOipA8elOSL6fJrdRvACy1C1uDuNNbIqW36VCoYIpjs32lhvDmdmUaWFxCqEFiQqo5tabHbOxIYQ9a0wrmIMTR3yZIAXx90qlEg2GgRZ8Bu1XO3HpswaMw9OkN7JEkdZhqeXg90OQo6dtutEeN34d9Ol9LVsvCqKdx-ZlLBgi47JhBvCv7QEqv0yos5Lbv3m2WC',
        lat: 40.7128,
        lng: -73.955,
        isVaccinated: true,
        temperature: '98.2°F',
      },
      courierNote: "I've picked up your order and am taking the fastest route! See you soon.",
      timeline: [
        { step: 1, title: 'Order Placed & Confirmed', description: 'Payment verified', time: 'Just now', isCompleted: true, isActive: false },
        { step: 2, title: 'Restaurant accepted & prepping', description: 'Dishes being freshly prepared', time: 'In progress', isCompleted: false, isActive: true },
        { step: 3, title: 'Food picked up by courier', description: 'Insulated hot pouch sealed', time: '~10 mins', isCompleted: false, isActive: false },
        { step: 4, title: 'On the way', description: 'Direct delivery route', time: '~20 mins', isCompleted: false, isActive: false },
        { step: 5, title: 'Delivered', description: 'Doorstep handoff', time: '~25 mins', isCompleted: false, isActive: false },
      ],
      createdAt: new Date().toISOString(),
    };
    return apiClient.post('/orders/create', payload, newOrder, 400);
  },
};
