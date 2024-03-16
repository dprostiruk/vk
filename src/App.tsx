import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Panel, PanelHeader, Group, Div, Spinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import ProductCard from './components/ProductCard';
import Total from './components/Total';
import './App.css';
import VKLogo from './assets/VK Text Logo.svg';
import './fonts/VK Sans Medium.ttf';
import './fonts/VK Sans DemiBold.otf';

export interface Product {
    id: number;
    image: string;
    title: string;
    description: string;
    quantity: number;
    price: number;
}

const App: React.FC = () => {
    const [cart, setCart] = React.useState<Product[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Получение данных о товарах с сервера
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                const products: Product[] = response.data.map((product: Product) => ({
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    description: product.description,
                    quantity: 1,
                    price: product.price
                }));
                setCart(products);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
            setLoading(false);
    }, []);

    useEffect(() => {
        // Подсчет общей стоимости товаров в корзине
        const totalPrice = cart.reduce((acc, product) => acc + (product.quantity * product.price), 0);
        setTotal(totalPrice);
    }, [cart]);

    const handleQuantityChange = (id: number, quantity: number) => {
        const newCart = cart.map(product => {
            if (product.id === id) {
                const newQuantity = product.quantity + quantity;
                if (newQuantity >= 1 && newQuantity <= 10) {
                    return { ...product, quantity: newQuantity };
                }
            }
            return product;
        });
        setCart(newCart);
    };

    const handleDelete = (productId: number) => {
        setCart(prevCart => prevCart.filter(product => product.id !== productId));
    };

    return (
        <View activePanel="main">
            <Panel id="main">
                <PanelHeader className='header'><img src={VKLogo} alt={"logo"} width={225} height={225} /></PanelHeader>
                {loading && <Spinner size="large" style={{ marginTop: 20 }} />}
                <Div className='font-face-vs' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Group style={{ flex: 2 }}>
                        {cart.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onQuantityChange={handleQuantityChange}
                                onDelete={handleDelete}
                            />
                        ))}
                    </Group>
                    <Div className='font-face-vd' style={{ flex: 1 }}>
                        <Total total={total} />
                    </Div>
                </Div>
            </Panel>
        </View>
    );
    
};

export default App;