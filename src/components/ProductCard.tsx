import * as React from 'react';
import { Card, Cell, Avatar, CardGrid, Group, Header, IconButton } from '@vkontakte/vkui';
import Trash from '../assets/trash.svg';

interface Product {
    id: number;
    image: string;
    title: string;
    description: string;
    quantity: number;
    price: number;
}

interface ProductCardProps {
    product: Product;
    onQuantityChange: (id: number, quantity: number) => void;
    onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuantityChange, onDelete }) => {
    return (
        <Group mode="plain" header={<Header mode="primary">{product.title}</Header>}>
            <CardGrid size="l">
                <Card mode="shadow">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Avatar size={64} src={product.image} />
                        <div style={{ flex: 1, marginLeft: '12px' }}>
                            <p>{product.description}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h2 className='font-face-vd'>{Number((product.price * product.quantity).toFixed(2))} руб.</h2>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton style={{ width: '30px', height: '30px' }} onClick={() => onQuantityChange(product.id, -1)}>-</IconButton>
                                <Cell>{product.quantity}</Cell>
                                <IconButton style={{ width: '30px', height: '30px' }} onClick={() => onQuantityChange(product.id, 1)}>+</IconButton>
                                <IconButton style={{ width: '30px', height: '30px' }} onClick={() => onDelete(product.id)}><img src={Trash} alt={'удалить'}/></IconButton>
                            </div>
                        </div>
                    </div>
                </Card>
            </CardGrid>
        </Group>
    );
};

export default ProductCard;