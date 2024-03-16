import { Button, Card } from '@vkontakte/vkui';
import * as React from 'react';
import '../App.css';

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = ({ total }) => {
    return (
        <Card mode="shadow">
            <div className="total" >
                <h2 style={{ paddingRight: '12px' }}>Итого: {Number((total).toFixed(2))} руб.</h2>
                <Button className='font-face-vs' size="m" mode="primary" style={{ width: '50%' }}>
                    <h2>Оформить заказ</h2>
                </Button>
            </div>
        </Card>
    );
};

export default Total;